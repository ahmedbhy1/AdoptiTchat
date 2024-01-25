import { Navigate, Route, Routes } from "react-router-dom";
import GuestOnly from "./hoc/GuestOnly";
import CatsPage from "./pages/CatsPage";
import { Layout } from "./components/Layout";
import { RequireAuthentication } from "./hoc/RequireAuthentication";
import { LoginPage } from "./pages/LoginPage";
import CatPage from "./pages/CatPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Navigate to={"/cats"} />} />
        <Route
          path="/login"
          element={
            <GuestOnly>
              <LoginPage />
            </GuestOnly>
          }
        />
        <Route
          path="/cats"
          element={
            <RequireAuthentication>
              <CatsPage favourites={false} />
            </RequireAuthentication>
          }
        />
        <Route
          path="/favorites"
          element={
            <RequireAuthentication>
              <CatsPage favourites={true} />
            </RequireAuthentication>
          }
        />
        <Route
          path="/cat"
          element={
            <RequireAuthentication>
              <CatPage />
            </RequireAuthentication>
          }
        />
      </Route>
    </Routes>
  );
}
