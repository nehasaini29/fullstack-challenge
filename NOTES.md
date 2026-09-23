# Notes

## What I completed

- Car list backed by the mock `GetCars` API, including loading, error and empty states.
- Responsive images using a native `picture` element and the API's three image sizes.
- Search by model, year filtering and three useful sort orders.
- Create-car form with client validation and API error feedback.
- Tests for the filter hook, responsive card markup and the main create/filter flows.

## What I left out, and why

- I left out the detail route and debounce. The inventory is only six local records, so
  debounce would add delay without saving meaningful work, and the detail route was less
  important than making the core states and form reliable.
- New cars use the app's fallback artwork. A production form would upload images or use
  an asset picker instead of asking someone to paste three breakpoint URLs.

## Decisions and trade-offs

- Everything specific to inventory lives under `features/cars`; the Apollo client and app
  shell remain shared concerns.
- `useCars` owns GraphQL and writes a successful mutation into Apollo's cached list. This
  avoids an unnecessary refetch and keeps network state out of the page component.
- Filtering and sorting are local because the dataset has already been fetched and is
  deliberately small. `useCarFilters` keeps that derived state separate and testable.
- No packages were added. The existing MUI and Apollo dependencies cover the UI and data
  needs without another abstraction.

## If I had another day

1. Add image upload/storage and replace the fallback artwork for new cars.
2. Add a detail route and edit/delete operations if the API grows to support them.
3. Add visual regression coverage for the three responsive layouts.

## Anything you should know to run it

No deviations. Use Node 20 or newer, then `npm install && npm run dev`.
