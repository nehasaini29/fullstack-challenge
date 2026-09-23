import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { renderWithProviders } from "@/test/renderWithProviders";
import { server } from "@/mocks/server";
import { db } from "@/mocks/db";
import { apolloClient } from "@/lib/apollo";
import { CarInventoryPage } from "./CarInventoryPage";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(async () => {
  server.resetHandlers();
  db.reset();
  await apolloClient.clearStore();
});
afterAll(() => server.close());

describe("CarInventoryPage", () => {
  it("shows the inventory and filters it by model", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CarInventoryPage />);

    expect(screen.getByText("Loading the collection…")).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "R8" })).toBeInTheDocument();
    expect(screen.getByText("6 vehicles")).toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: /search by model/i }), "not-a-car");
    expect(screen.getByRole("heading", { name: /no cars found/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /clear filters/i }));
    expect(screen.getByRole("heading", { name: "R8" })).toBeInTheDocument();
  });

  it("shows a useful message when the inventory request fails", async () => {
    server.use(
      graphql.query("GetCars", () =>
        HttpResponse.json({ errors: [{ message: "boom" }] })
      )
    );

    renderWithProviders(<CarInventoryPage />);

    expect(
      await screen.findByText("We couldn’t load the cars. Please try again.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("validates and creates a car", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CarInventoryPage />);
    await screen.findByText("6 vehicles");

    await user.click(screen.getByRole("button", { name: /add a car/i }));
    await user.click(screen.getByRole("button", { name: /^add car$/i }));
    expect(screen.getByText("Make is required")).toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: /make/i }), "Tesla");
    await user.type(screen.getByRole("textbox", { name: /model/i }), "Roadster");
    await user.type(screen.getByRole("spinbutton", { name: /year/i }), "2026");
    await user.type(screen.getByRole("textbox", { name: /color/i }), "Red");
    await user.click(screen.getByRole("button", { name: /^add car$/i }));

    await waitFor(() => expect(screen.getByRole("heading", { name: "Roadster" })).toBeInTheDocument());
    expect(screen.getByText("7 vehicles")).toBeInTheDocument();
  });
});
