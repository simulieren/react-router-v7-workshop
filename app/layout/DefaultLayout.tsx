import { Link, NavLink, Outlet, useNavigation } from "react-router";
import { authClient } from "~/.client/auth-client";
import { useRootData } from "~/hooks/useRootData";

const Links = [
	{
		to: "/",
		label: "Home",
	},
];

export default function DefaultLayout() {
	const {user} = useRootData();
	console.log("🛑 ~ DefaultLayout ~ user:", user)
	// NOTE: Client side version with better-auth
	// const user = authClient?.useSession();

	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<nav className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
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

				{/* User Info */}
				{user ? (
					<div className="flex items-center gap-2 p-4">
						<span className="text-sm capitalize">{user.name}</span>
						<button className="text-sm text-blue-500 hover:text-blue-600" onClick={() => authClient.signOut()}>Sign Out</button>
					</div>
				) : (
					<div className="flex items-center gap-2 p-4">
						<Link to="/sign-in">Sign In</Link>
						<Link to="/sign-up">Sign Up</Link>
					</div>
				)}
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
