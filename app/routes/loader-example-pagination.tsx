import type { Route } from "./+types/loader-example-pagination";
import { Link, useSearchParams } from "react-router";

const PAGE_SIZE = 10;

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const offset = (page - 1) * PAGE_SIZE;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );
  const data = (await response.json()) as {
    results: { name: string; url: string }[];
    count: number;
  };

  const totalPages = Math.ceil(data.count / PAGE_SIZE);

  return {
    pokemon: data.results,
    currentPage: page,
    totalPages: totalPages,
    totalPokemon: data.count,
  } as const;
}

export function headers() {
  return {
    "Cache-Control": "max-age=60, s-maxage=300", // Cache for 1 min client, 5 min server
  };
}

export function meta({ data }: Route.MetaArgs) {
  const { currentPage, totalPokemon } = data as { currentPage: number, totalPokemon: number };
  return [
    { title: `Pokemon Page ${currentPage} | Total: ${totalPokemon}` },
    { name: "description", content: "Paginated Pokemon API Example" },
  ];
}

export default function LoaderExamplePagination({
  loaderData,
}: Route.ComponentProps) {
  const { pokemon, currentPage, totalPages, totalPokemon } = loaderData;
  const [searchParams] = useSearchParams();

  const getPageLink = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    return `?${newSearchParams.toString()}`;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Pokemon List (Paginated)</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Showing page {currentPage} of {totalPages} ({totalPokemon} total Pokémon)
      </p>
      <ul className="space-y-4 mb-8">
        {pokemon.map((p: { name: string; url: string }) => {
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

      <div className="flex justify-between items-center">
        <Link
          to={getPageLink(currentPage - 1)}
          className={`px-4 py-2 rounded-lg text-white ${
            currentPage <= 1
              ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          }`}
          aria-disabled={currentPage <= 1}
          onClick={(e) => currentPage <=1 && e.preventDefault()}
        >
          Previous
        </Link>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <Link
          to={getPageLink(currentPage + 1)}
          className={`px-4 py-2 rounded-lg text-white ${
            currentPage >= totalPages
              ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          }`}
          aria-disabled={currentPage >= totalPages}
          onClick={(e) => currentPage >= totalPages && e.preventDefault()}
        >
          Next
        </Link>
      </div>
    </div>
  );
} 