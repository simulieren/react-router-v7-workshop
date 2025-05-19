import { auth } from "~/.server/auth";
import type { Route } from "./+types/sign-out-action";
import { Form, redirect } from "react-router";

export async function loader({request}: Route.LoaderArgs) {
  // @ts-ignore - type is off
  const response = await auth.api.signOut(request);

  if (response.success) {
    return redirect("/", {
      headers: request.headers
    });
  }
}