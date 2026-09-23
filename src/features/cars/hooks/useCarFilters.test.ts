import { act, renderHook } from "@testing-library/react";
import { useCarFilters } from "./useCarFilters";
import type { Car } from "../types";

const cars: Car[] = [
  { id: "1", make: "Audi", model: "Q5", year: 2023, color: "White", mobile: "", tablet: "", desktop: "" },
  { id: "2", make: "Audi", model: "A3", year: 2021, color: "Red", mobile: "", tablet: "", desktop: "" },
  { id: "3", make: "Audi", model: "Q3", year: 2024, color: "Black", mobile: "", tablet: "", desktop: "" },
];

describe("useCarFilters", () => {
  it("filters by model and year", () => {
    const { result } = renderHook(() => useCarFilters(cars));
    act(() => {
      result.current.setSearch("q");
      result.current.setYear("2023");
    });
    expect(result.current.visibleCars.map((car) => car.model)).toEqual(["Q5"]);
  });

  it("changes the sort order without changing the source list", () => {
    const { result } = renderHook(() => useCarFilters(cars));
    act(() => result.current.setSort("model-asc"));
    expect(result.current.visibleCars.map((car) => car.model)).toEqual(["A3", "Q3", "Q5"]);
    expect(cars.map((car) => car.model)).toEqual(["Q5", "A3", "Q3"]);
  });
});
