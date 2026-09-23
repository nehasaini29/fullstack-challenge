import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CAR, GET_CARS } from "../api/carOperations";
import type { Car, CreateCarInput } from "../types";

type CarsData = { cars: Car[] };
type CreateCarData = { createCar: Car };
type CreateCarVariables = { input: CreateCarInput };

export function useCars() {
  const query = useQuery<CarsData>(GET_CARS);
  const [createCarMutation, mutation] = useMutation<
    CreateCarData,
    CreateCarVariables
  >(CREATE_CAR, {
    update(cache, { data }) {
      if (!data?.createCar) return;

      const existing = cache.readQuery<CarsData>({ query: GET_CARS });
      if (!existing) return;

      cache.writeQuery<CarsData>({
        query: GET_CARS,
        data: { cars: [...existing.cars, data.createCar] },
      });
    },
  });

  return {
    cars: query.data?.cars ?? [],
    loading: query.loading,
    error: query.error,
    refetch: query.refetch,
    createCar: (input: CreateCarInput) =>
      createCarMutation({ variables: { input } }).then(
        ({ data }) => data?.createCar
      ),
    creating: mutation.loading,
    createError: mutation.error,
  };
}
