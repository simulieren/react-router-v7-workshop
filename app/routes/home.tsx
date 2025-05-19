import type { Route } from "./+types/home";
import { Link, useLoaderData } from "react-router";

export function loader({ request }: Route.LoaderArgs) {
  return {
    message: "Hello, world!",
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export default function Home() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold my-4">Loader Examples:</h2>
      <ul className="space-y-2">
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/loader-example">/loader-example (Pokemon List)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/loader-example/1">/loader-example/1 (Pokemon Details)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/client-loader-example">/client-loader-example (Client Loader Example)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/action-example">/action-example (Action Example)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/loader-example-streaming">/loader-example-streaming (Loader Example Streaming)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/loader-example-parallel">/loader-example-parallel (Loader Example Parallel)</Link>
        </li>
      </ul>

      <h2 className="text-2xl font-bold my-4">Layouts: User Profile</h2>
      <ul className="space-y-2">
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/user-profile">/user-profile (User Profile)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/user-profile/settings">/user-profile/settings (User Profile Settings)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/user-profile/notifications">/user-profile/notifications (User Profile Notifications)</Link>
        </li>
      </ul>

      <h2 className="text-2xl font-bold my-4">Prerendered Route Examples (Static Site Generation - SSG)</h2>
      <ul className="space-y-2">
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/prerendered/static-loader-example">/prerendered/static-loader-example (Static Loader Example)</Link>
        </li>
      </ul>

      {/* Language Examples */}
      <h2 className="text-2xl font-bold my-4">Language Examples (Internationalization - i18n)</h2>
      <ul className="space-y-2">
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/categories">/categories (Default English Categories)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/fr/categories">/fr/categories (French Categories)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/es/categories">/es/categories (Spanish Categories)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/de/categories">/de/categories (German Categories)</Link>
        </li>
      </ul>

      {/* BIZ API Examples */}
      <h2 className="text-2xl font-bold my-4">BIZ API Examples</h2>
      <ul className="space-y-2">
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/biz-api-example">/biz-api-example (Biz API Example)</Link>
        </li>
      </ul>

      {/* Auth Examples */}
      <h2 className="text-2xl font-bold my-4">Auth Examples</h2>
      <ul className="space-y-2">
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/sign-up">/sign-up (Sign Up)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/sign-up-action">/sign-up-action (Sign Up Action)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/sign-in">/sign-in (Sign In)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/sign-in-action">/sign-in-action (Sign In Action)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/sign-out">/sign-out (Sign Out)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/sign-out-action">/sign-out-action (Sign Out Action)</Link>
        </li>
        <li className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Link prefetch="intent" to="/protected-loader-example">/protected-loader-example (Protected Loader Example)</Link>
        </li>
      </ul>
    </div>
  );
}
