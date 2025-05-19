import { useState } from "react";
import type { Route } from "./+types/sign-in";
import { Form, useNavigate } from "react-router";
import { authClient } from "~/.client/auth-client";
import type { ErrorContext } from "better-auth/react";

export default function SignIn({}: Route.ComponentProps) {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<ErrorContext | null>(null);

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		await authClient.signIn.email({
			email,
			password,
			fetchOptions: {
				onSuccess: () => {
					navigate("/");
				},
				onError: (error) => {
					setError(error);
				},
				onSettled: () => {
					setIsLoading(false);
				}
			}
		});
	}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form method="post" className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <div className="rounded-md shadow-sm -space-y-px">
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

					{error && (
            <div className="text-red-500 text-sm text-center">
              {error.error.message}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
