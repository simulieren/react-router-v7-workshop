import type { User } from "better-auth";
import { useMatches } from "react-router";

export function useRootData() {
  const data = useMatches();

	const rootData = data.find((route) => route.id === "root");

  return rootData?.data as {user: User};
}
