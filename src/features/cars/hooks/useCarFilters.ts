import { useMemo, useState } from "react";
import type { Car, CarSort } from "../types";

export function useCarFilters(cars: Car[]) {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState<string>("all");
  const [sort, setSort] = useState<CarSort>("year-desc");

  const visibleCars = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = cars.filter(
      (car) =>
        (!term || car.model.toLowerCase().includes(term)) &&
        (year === "all" || car.year === Number(year))
    );

    return [...filtered].sort((a, b) => {
      if (sort === "model-asc") return a.model.localeCompare(b.model);
      if (sort === "year-asc") return a.year - b.year;
      return b.year - a.year;
    });
  }, [cars, search, sort, year]);

  const years = useMemo(
    () => [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a),
    [cars]
  );

  return {
    search,
    setSearch,
    year,
    setYear,
    sort,
    setSort,
    years,
    visibleCars,
    clear: () => {
      setSearch("");
      setYear("all");
    },
  };
}
