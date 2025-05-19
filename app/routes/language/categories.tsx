import type { Route } from "./+types/categories";
import { useParams, useLoaderData, Link } from "react-router";

const translations = {
  en: {
    title: "Categories",
    description: "This is a demo of language routing in React Router",
    currentLanguage: "Current Language",
    availableLanguages: "Available Languages"
  },
  fr: {
    title: "Catégories",
    description: "Ceci est une démonstration du routage linguistique dans React Router",
    currentLanguage: "Langue Actuelle", 
    availableLanguages: "Langues Disponibles"
  },
  es: {
    title: "Categorías",
    description: "Esta es una demostración de enrutamiento de idiomas en React Router",
    currentLanguage: "Idioma Actual",
    availableLanguages: "Idiomas Disponibles"
  },
  de: {
    title: "Kategorien", 
    description: "Dies ist eine Demo des Sprach-Routings in React Router",
    currentLanguage: "Aktuelle Sprache",
    availableLanguages: "Verfügbare Sprachen"
  }
};

const languageNames: Record<string, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
};

export function loader({ params }: Route.LoaderArgs) {
  const lang = params.lang || "en";
  return {
    lang,
    translations: translations[lang as keyof typeof translations] || translations.en
  };
}

export default function Categories() {
  const { lang, translations } = useLoaderData<typeof loader>();
  const params = useParams();

  // Use the top-level language codes
  const languageCodes = Object.keys(languageNames);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{translations.title}</h1>
      <p className="text-lg mb-8">{translations.description}</p>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">{translations.currentLanguage}</h2>
        <p className="text-2xl font-bold uppercase">
          {languageNames[lang] || lang}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{translations.availableLanguages}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {languageCodes.map((code) => (
            <Link
              key={code}
              to={code === 'en' ? '/categories' : `/${code}/categories`}
              className={`p-4 text-center rounded-lg transition-colors ${
                lang === code
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
							prefetch="intent"
            >
              {languageNames[code]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
