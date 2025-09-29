import { Outlet } from "react-router";

function Main() {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
}

export default Main;
