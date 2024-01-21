import {
  Link,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { RequireAuthentication } from "./hoc/RequireAuthentication";
import { useAuth } from "./hooks/useAuth";
import { useState } from "react";
import GuestOnly from "./hoc/GuestOnly";

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
          path='/protected'
          element={
            <RequireAuthentication>
              <ProtectedPage />
            </RequireAuthentication>
          }
        />
      </Route>
    </Routes>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  const onSubmit = async () => {
    await login({ email, password });
  };

  return (<div>
    <label htmlFor="email">
      <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>
    <label htmlFor="password">
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>
    <button onClick={() => onSubmit()} disabled={isLoading}>Submit</button>
  </div>);
}

function Layout() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}


function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
