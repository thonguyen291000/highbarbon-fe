import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import {
  BookPage,
  BranchesPage,
  HomePage,
  TablesPage,
  RestaurantsPage,
} from "./pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="branches">
        <Route index element={<BranchesPage />} />
        <Route path=":branchId">
          <Route index element={<RestaurantsPage />} />
          <Route path=":restaurantId">
            <Route index element={<TablesPage />} />
            <Route path=":tableId" element={<BookPage />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
