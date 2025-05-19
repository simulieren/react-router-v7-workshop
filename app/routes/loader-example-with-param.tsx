import type { Route } from "./+types/loader-example-with-param";
import { isRouteErrorResponse, useRouteError } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const pokemon = await response.json() as unknown as {
    name: string;
    sprites: { front_default: string };
    stats: { base_stat: number; stat: { name: string } }[];
  };
  return { pokemon };
}

export function headers() {
  return {
    "Cache-Control": "max-age=300, s-maxage=3600", // Cache the response for 5 minutes
  };
}

export function meta({ data }: Route.MetaArgs) {
  const pokemon = data?.pokemon;
  if (!pokemon) {
    return [];
  }

  return [
    { title: `Pokemon: ${pokemon?.name}` },
    { name: "description", content: `Details for Pokemon ${pokemon.name}` },
    {
      rel: "preload",
      href: pokemon.sprites.front_default, // Preload the image
      as: "image",
    },
  ];
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-8">
        <div className="max-w-lg mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <h1 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">
            {error.status} {error.statusText}
          </h1>
          <p className="text-red-600 dark:text-red-300">{error.data}</p>
          <a 
            href="/loader-example"
            className="mt-4 inline-block px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
          >
            ← Back to Pokemon List
          </a>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="p-8">
        <div className="max-w-lg mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <h1 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Error</h1>
          <p className="text-red-600 dark:text-red-300 mb-4">{error.message}</p>
          <details className="mt-4">
            <summary className="text-red-600 dark:text-red-300 cursor-pointer">View Stack Trace</summary>
            <pre className="mt-2 p-4 bg-red-100 dark:bg-red-900/40 rounded text-red-800 dark:text-red-200 overflow-auto text-sm">
              {error.stack}
            </pre>
          </details>
          <a 
            href="/loader-example"
            className="mt-4 inline-block px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
          >
            ← Back to Pokemon List
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-8">
        <div className="max-w-lg mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <h1 className="text-2xl font-bold text-red-700 dark:text-red-400">Unknown Error</h1>
          <a 
            href="/loader-example"
            className="mt-4 inline-block px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
          >
            ← Back to Pokemon List
          </a>
        </div>
      </div>
    );
  }
}

export default function LoaderExample({loaderData}: Route.ComponentProps) {
  const { pokemon } = loaderData;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{pokemon.name}</h1>
      <div className="space-y-4">
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="mx-auto h-64 w-64"
            style={{
              imageRendering: "pixelated",
            }}
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Stats</h2>
            <ul className="space-y-2">
              {pokemon.stats.map((stat: {base_stat: number, stat: {name: string}}) => (
                <li key={stat.stat.name} className="flex justify-between">
                  <span className="capitalize">{stat.stat.name}:</span>
                  <span>{stat.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
