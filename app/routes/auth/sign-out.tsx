import type { Route } from "./+types/sign-out";
import { useEffect } from "react";
import { authClient } from "~/.client/auth-client";
import { useNavigate } from "react-router";

export default function SignOut({}: Route.ComponentProps) {
  const navigate = useNavigate();

  useEffect(() => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
        }
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Signing out...
          </h2>
        </div>
      </div>
    </div>
  );
}
