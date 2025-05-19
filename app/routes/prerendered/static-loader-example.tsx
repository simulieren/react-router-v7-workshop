import type { Route } from "./+types/static-loader-example";
import { Link } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await response.json() as { results: { name: string, url: string }[] };
  return {
    pokemon: data.results
  } as const;
}

export function headers() {
  return {
    "Cache-Control": "max-age=300, s-maxage=3600", // Cache the response for 5 minutes
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "Pokemon Example" },
    { name: "description", content: "Pokemon API Example with React Router!" },
  ];
}

export default function LoaderExample({loaderData}: Route.ComponentProps) {
  const { pokemon } = loaderData;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Pokemon List</h1>
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
