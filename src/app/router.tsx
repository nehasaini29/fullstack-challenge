import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarInventoryPage } from "@/features/cars/pages/CarInventoryPage";
import { Brief } from "@/pages/Brief";

/**
 * Add routes for your own pages here. `/` is the brief; you are free to move
 * it to `/brief` and put your work on `/`.
 */
export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CarInventoryPage />} />
      <Route path="/brief" element={<Brief />} />
    </Routes>
  </BrowserRouter>
);
