import { auth } from "~/.server/auth";
import type { Route } from "./+types/sign-up-action";
import { Form, redirect } from "react-router";

export async function loader({request}: Route.LoaderArgs) {
  const user = await auth.api.getSession(request);

  if (user?.user?.email) {
    return redirect("/");
  }

  return {};
}

export async function action({request}: Route.ActionArgs) {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const fullName = data.get('fullName');

  if (!email || !password || !fullName) {
    return {error: "All fields are required", status: 400}
  }

  const response = await auth.api.signUpEmail({
    body: {
      email: email as string,
      password: password as string,
      name: fullName as string
    },
    asResponse: true
  });

  try {
    return response;
  } catch (error) {
    console.error(error)
    return {error: "Failed to create account", status: 400, message: (error as Error)?.message}
  }
}

export default function SignUpAction({}: Route.ComponentProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <Form method="post" className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
