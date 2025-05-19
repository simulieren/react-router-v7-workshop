import { NavLink, Outlet, useNavigation } from "react-router";

const Links = [
	{
		to: "/",
		label: "Home",
	},
	{
		to: "/loader-example",
		label: "Loader Example",
	},
	{
		to: "/client-loader-example",
		label: "Client Loader Example",
	},
	{
		to: "/action-example",
		label: "Action Example",
	},
];

export default function DefaultLayout() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<nav className="border-b border-gray-200 dark:border-gray-800">
				<ul className="container mx-auto px-4 py-4 flex items-center gap-6 text-sm">
					{Links.map((link) => (
						<li key={link.to}>
							<NavLink 
								to={link.to}
								className={({ isActive }) => 
									`text-lg hover:text-blue-500 transition-colors ${isActive ? "text-blue-600 font-medium whitespace-nowrap truncate" : "text-gray-600 dark:text-gray-300 whitespace-nowrap truncate"}`
								}
								prefetch="intent"
							>
								{link.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			{isNavigating && (
				<div className="fixed top-0 left-0 h-1 bg-blue-500 animate-[progress_500ms_ease-in-out] w-full z-50" />
			)}
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
