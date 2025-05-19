import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
	layout("layout/DefaultLayout.tsx", [
		index("routes/home.tsx"),
		route('loader-example', "routes/loader-example.tsx"),
		route('loader-example/:id', "routes/loader-example-with-param.tsx"),
		route('client-loader-example', "routes/client-loader-example.tsx"),
		route('action-example', "routes/action/action-example.tsx"),
		route('loader-example-streaming', "routes/loader-example-streaming.tsx"),

		// BIZ Examples
		route('biz-api-example', "routes/action/biz-api-example.tsx"),
	]),

	// User Profile Layout
	layout("layout/UserProfileLayout.tsx", [
		route('user-profile', "routes/user-profile/user-profile.tsx"),
		route('user-profile/settings', "routes/user-profile/settings.tsx"),
		route('user-profile/notifications', "routes/user-profile/notifications.tsx"),
		// ...
	]),

	// Prerendered Route Examples
	layout("layout/PrerenderLayout.tsx", [
		route('prerendered/static-loader-example', "routes/prerendered/static-loader-example.tsx"),
	]),

	// Language Examples
	layout("layout/LanguageLayout.tsx", [
		route(":lang?/categories", "routes/language/categories.tsx"),
	]),

	// Sign Up
	route('sign-up', "routes/auth/sign-up.tsx"),
	route('sign-up-action', "routes/auth/sign-up-action.tsx"),
	route('sign-in', "routes/auth/sign-in.tsx"),
	route('sign-in-action', "routes/auth/sign-in-action.tsx"),
	route('sign-out', "routes/auth/sign-out.tsx"),
	route('sign-out-action', "routes/auth/sign-out-action.tsx"),

	// Protected Routes
	route('protected-loader-example', "routes/protected/protected-loader-example.tsx"),
	
	// API Routes
	route('api/auth/*', "routes/api/auth.tsx"),
] satisfies RouteConfig;
