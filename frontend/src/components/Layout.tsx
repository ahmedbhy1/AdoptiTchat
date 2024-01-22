import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  return(
    <>
        <Navbar />
        <div className="p-16 flex justify-center">
          <Outlet/>
        </div>
    </>
  )
}