import type { Route } from "./+types/loader-example-infinite-scroll";
import { Link, useFetcher } from "react-router";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 20;

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const offset = (page - 1) * PAGE_SIZE;

  // Simulate network delay
  // await new Promise(resolve => setTimeout(resolve, 500));

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Response("Failed to fetch Pokemon", { status: response.status });
  }

  const data = (await response.json()) as {
    results: { name: string; url: string }[];
    count: number;
    next: string | null;
  };

  return {
    pokemon: data.results,
    nextPageUrl: data.next, // Pass the next URL to the component
    currentPage: page,
    totalPokemon: data.count,
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "Pokemon Infinite Scroll" },
    { name: "description", content: "Infinite Scroll Pokemon API Example" },
  ];
}

export default function LoaderExampleInfiniteScroll({
  loaderData,
}: Route.ComponentProps) {
  const initialLoaderData = loaderData;
  const fetcher = useFetcher();
  const [pokemonList, setPokemonList] = useState(initialLoaderData.pokemon);
  const [nextPageUrl, setNextPageUrl] = useState(initialLoaderData.nextPageUrl);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Update state when fetcher loads new data
  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      setPokemonList((prev) => [...prev, ...fetcher.data.pokemon]);
      setNextPageUrl(fetcher.data.nextPageUrl);
    }
  }, [fetcher.data, fetcher.state]);

  // Implement intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageUrl && fetcher.state === "idle") {
          // Construct the URL for the fetcher to load next page data.
          // The loader expects a 'page' search param.
          const url = new URL(nextPageUrl);
          const nextPage = url.searchParams.get("offset") 
            ? (parseInt(url.searchParams.get("offset")!) / PAGE_SIZE) + 1
            : 2; // Default to page 2 if offset is not present (e.g. first load from next)
          fetcher.load(`/loader-example-infinite-scroll?page=${nextPage}`);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [nextPageUrl, fetcher, loadMoreRef]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Pokemon List (Infinite Scroll)
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Loaded {pokemonList.length} of {initialLoaderData.totalPokemon} Pokémon
      </p>
      <ul className="space-y-4 mb-8">
        {pokemonList.map((p) => {
          const id = p.url.split("/").slice(-2)[0];
          return (
            <li
              key={p.name}
              className="p-4 border rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
            >
              <Link
                to={`/loader-example/${id}`}
                className="block"
                prefetch="intent"
              >
                <p className="text-lg capitalize font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  {p.name}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>

      <div ref={loadMoreRef} className="h-10">
        {fetcher.state === "loading" && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading more Pokémon...
          </p>
        )}
        {!nextPageUrl && pokemonList.length > 0 && (
           <p className="text-center text-green-500 dark:text-green-400">
            All Pokémon loaded!
          </p>
        )}
      </div>
    </div>
  );
} 