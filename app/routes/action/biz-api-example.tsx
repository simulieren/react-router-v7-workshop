import type { Route } from "./+types/biz-api-example";
import { Form, Link } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search")?.toLowerCase() || "";

  const response = await fetch("https://staging.admin.berufswahlportal.ch/wp-json/biz/v1/apprenticeship-professions?per_page=999", {
    "headers": {
      "accept": "application/json, */*;q=0.1",
      "accept-language": "en-US,en;q=0.9",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Not.A/Brand\";v=\"99\", \"Chromium\";v=\"136\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "Referer": "https://staging.berufswahlportal.ch/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "method": "GET"
  });

  const data = await response.json() as Array<{
    id: number;
    name: string;
    slug: string;
    number: string;
    professionUrl: string;
    countApprenticeships: number;
    countApprenticeshipEntries: number;
    countApprenticeshipsPerYear: {
      [year: string]: number;
    };
    countTrialApprenticeships: number;
    countTrialApprenticeshipsEntries: number;
    countTrialApprenticeshipsSlots: number;
  }>;

  // Filter the data by the search term
  const filteredProfessions = searchTerm 
    ? data.filter((profession) => profession.name.toLowerCase().includes(searchTerm))
    : data;
  
  return {
    professions: filteredProfessions,
    searchTerm: searchTerm as string
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const search = formData.get("search");
  return { search };
}

export function meta({ data }: Route.MetaArgs) {
  const { searchTerm } = data as { searchTerm: string, professions: any };

  return [
    { title: searchTerm ? `Professions Search: ${searchTerm}` : "Professions Search" },
    { name: "description", content: "Search apprenticeship professions!" },
  ];
}

export default function BizApiExample({loaderData}: Route.ComponentProps) {
  const { professions, searchTerm } = loaderData

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Apprenticeship Professions Search</h1>
      
      <Form 
        method="get"
        className="mb-8"
      >
        <div className="flex gap-4">
          <input
            data-testid="search-input"
            id="search"
            type="search"
            name="search"
            placeholder="Search professions..."
            defaultValue={searchTerm}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Search</button>
        </div>
      </Form>

      <div className="space-y-4">
        {professions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No professions found matching your search.</p>
        ) : (
          <ul className="space-y-4">
            {professions.map((profession) => (
              <li key={profession.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                <Link to={`/profession/${profession.slug}`} className="block" prefetch="intent">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium">{profession.name}</p>
                      <p className="text-sm text-gray-500">Number: {profession.number}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Available Apprenticeships:</p>
                      <p className="font-medium">{profession.countApprenticeships}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
