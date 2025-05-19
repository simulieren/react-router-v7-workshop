import type { Route } from "./+types/action-progressive-example";
import { Form, Link, useSearchParams, useSubmit } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search")?.toLowerCase() || "";

  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  
  const filteredPokemon = searchTerm 
    ? data.results.filter((p: {name: string}) => p.name.toLowerCase().includes(searchTerm))
    : data.results;

  return {
    pokemon: filteredPokemon as {name: string, url: string}[],
    searchTerm: searchTerm as string
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const search = formData.get("search");
  return { search };
}

export function meta({ data }: Route.MetaArgs) {
  const { searchTerm } = data as { searchTerm: string, pokemon: any };

  return [
    { title: searchTerm ? `Pokemon Search: ${searchTerm}` : "Pokemon Search" },
    { name: "description", content: "Search Pokemon by name!" },
  ];
}

export default function ActionExample({loaderData}: Route.ComponentProps) {
  const { pokemon, searchTerm } = loaderData as { pokemon: {name: string, url: string}[], searchTerm: string };
  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const isFirstSearch = searchParams.get("search") === null;
    const searchValue = e.currentTarget.search.value;
    submit(e.currentTarget, {
      replace: !isFirstSearch
    });
    setSearchParams(searchValue ? { search: searchValue } : {});
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Pokemon Search</h1>
      
      <Form 
        method="get"
        className="mb-8"
        onChange={handleChange}
        navigate={false}
        fetcherKey="action-progressive-example"
      >
        <div className="flex gap-4">
          <input
            data-testid="search-input"
            id="search"
            type="search"
            name="search"
            placeholder="Search Pokemon..."
            defaultValue={searchTerm}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Search</button>
        </div>
      </Form>

      <div className="space-y-4">
        {pokemon.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No Pokemon found matching your search.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}
