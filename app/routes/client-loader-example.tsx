import type { Route } from "./+types/client-loader-example";
import { Link } from "react-router";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await response.json() as { results: { name: string, url: string }[] };

  // Fake wait for 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    pokemon: data.results
  } as const;
}
clientLoader.hydrate = true as const;

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "Pokemon Example" },
    { name: "description", content: "Pokemon API Example with React Router!" },
  ];
}

export function HydrateFallback() {
  return (
    <div className="p-8">
      <div className="max-w-lg mx-auto p-6 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full" />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Loading Pokemon... <br />
            (Fake wait for 1 second)
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoaderExample({loaderData}: Route.ComponentProps) {
  const { pokemon } = loaderData;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Pokemon List</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">This is a client loader example. It is not cached and will be re-fetched on every navigation. And has a fake wait of 1 second.</p>
      <ul className="space-y-4">
        {pokemon.map((p: {name: string, url: string}) => {
          const id = p.url.split('/').slice(-2)[0];
          return (
            <li key={p.name} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
              <Link to={`/loader-example/${id}`} className="block" prefetch="intent">
                <p className="text-lg capitalize">{p.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
