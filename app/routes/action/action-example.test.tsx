import { createRoutesStub } from "react-router";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActionExample, {loader, action} from "./action-example";
import { test, expect } from "vitest";

test("ActionExample renders pokemon list and search results", async () => {
  const Stub = createRoutesStub([
    {
      path: "/action-example",
      // @ts-expect-error - TODO: fix this
      Component: ActionExample,
      loader: loader,
      action: action,
    },
  ]);

  // render the app stub at "/action-example"
  const result = render(<Stub initialEntries={["/action-example"]} />);
  console.log("result", result.debug());

  // simulate interactions
  const user = userEvent.setup();
  await waitFor(() => result.getByText("Pokemon Search"));

  await waitFor(() => result.getByText("bulbasaur"));

  const input = screen.getByTestId("search-input");

  await waitFor(() => user.type(input, "pikachu"));

  // @ts-expect-error - TODO: fix this
  expect(input.value).toBe("pikachu");

  await waitFor(() => user.click(screen.getByText("Search")));
  // Expect some pokemon to be rendered
  await waitFor(() => screen.findByText("pikachu"));
});
