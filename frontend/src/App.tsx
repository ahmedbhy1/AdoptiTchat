import {
  Route,
  Routes,
} from "react-router-dom";
import GuestOnly from "./hoc/GuestOnly";
import CatsPage from "./pages/CatsPage";
import { Layout } from "./components/Layout";
import { RequireAuthentication } from "./hoc/RequireAuthentication";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout />
        }
      >
        <Route path='' element={<PublicPage />} />
        <Route
          path='/login'
          element={
            <GuestOnly>
              <LoginPage />
            </GuestOnly>
          }
        />
        <Route
          path='/cats'
          element={
            <RequireAuthentication>
              <CatsPage />
            </RequireAuthentication>
          }
        />
      </Route>
    </Routes>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}