import { Suspense } from "react";
import type { Route } from "./+types/loader-example-parallel";
import { Await, Link, useLoaderData } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
	// Get initial pokemon list and items in parallel
  // @ts-ignore - This is a workaround to avoid type errors
	const [data, pokemonItems]: [
		{ results: { name: string; url: string }[] },
		{ results: { name: string; url: string }[] }
	] = await Promise.all([
		fetch("https://pokeapi.co/api/v2/pokemon?limit=10").then((response) =>
			response.json()
		),
		fetch("https://pokeapi.co/api/v2/item?limit=10").then((response) =>
			response.json()
		),
	]);

	return {
		pokemon: data.results,
		pokemonItems: pokemonItems.results, // This will be streamed in
	};
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

export default function LoaderExampleParallel() {
	const { pokemon, pokemonItems } = useLoaderData<typeof loader>();

	return (
		<div className='p-8'>
			<h1 className='text-3xl font-bold mb-6'>Pokemon List</h1>
			<ul className='space-y-4'>
				{pokemon.map((p: { name: string; url: string }) => {
					const id = p.url.split("/").slice(-2)[0];
					return (
						<li
							key={p.name}
							className='p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900'>
							<Link to={`/loader-example/${id}`} className='block' prefetch='intent'>
								<p className='text-lg capitalize'>{p.name}</p>
							</Link>
						</li>
					);
				})}
			</ul>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold my-4">Additional Pokemon Items</h2>

			<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{pokemonItems.map((item) => (
					<li
						key={item.name}
						className='p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out'>
						<p className='text-lg capitalize font-medium text-gray-800 dark:text-gray-200'>
							{item.name}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}
