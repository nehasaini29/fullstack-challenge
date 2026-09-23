import { render, screen } from "@testing-library/react";
import { CarCard } from "./CarCard";
import type { Car } from "../types";

const car: Car = {
  id: "1", make: "Audi", model: "R8", year: 2024, color: "Nardo Grey",
  mobile: "/r8-mobile.svg", tablet: "/r8-tablet.svg", desktop: "/r8-desktop.svg",
};

describe("CarCard", () => {
  it("provides an image for each breakpoint", () => {
    const { container } = render(<CarCard car={car} />);
    expect(screen.getByRole("img", { name: /2024 audi r8/i })).toHaveAttribute("src", car.mobile);
    const sources = container.querySelectorAll("source");
    expect(sources[0]).toHaveAttribute("media", "(min-width: 1024px)");
    expect(sources[0]).toHaveAttribute("srcset", car.desktop);
    expect(sources[1]).toHaveAttribute("media", "(min-width: 640px)");
    expect(sources[1]).toHaveAttribute("srcset", car.tablet);
  });
});
