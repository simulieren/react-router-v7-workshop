import { Suspense } from "react";
import type { Route } from "./+types/loader-example";
import { Await, Link, useLoaderData } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  // Get initial pokemon list
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await response.json();

  // Create a deferred promise for additional pokemon data from another API
  const pokemonItems = new Promise(async (resolve) => {
    // Using the PokeAPI items endpoint
    const additionalResponse = await fetch("https://pokeapi.co/api/v2/item?limit=10");
    const additionalItems = await additionalResponse.json();

    // Fake wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    resolve(additionalItems.results);
  });

  // Return both immediate and deferred data

  return {
    pokemon: data.results,
    pokemonItems: pokemonItems // This will be streamed in
  }
}

export function headers() {
  return {
    // "Cache-Control": "max-age=300, s-maxage=3600", // Cache the response for 5 minutes
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "Pokemon Example" },
    { name: "description", content: "Pokemon API Example with React Router!" },
  ];
}

export default function LoaderExample() {
  const { pokemon, pokemonItems } = useLoaderData<typeof loader>();

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

      <Suspense fallback={
        <div className="mt-8 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      }>
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Additional Pokemon Items</h2>
          <Await resolve={pokemonItems}>
            {(pokemonItems) => {
              const items = pokemonItems as unknown as { name: string; url: string }[];
              return (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <li key={item.name} className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
                      <p className="text-lg capitalize font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
                    </li>
                  ))}
                </ul>
              );
            }}
          </Await>
        </div>
      </Suspense>
    </div>
  );
}
