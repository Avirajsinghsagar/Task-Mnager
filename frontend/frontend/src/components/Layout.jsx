import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>

      <nav className="bg-black text-white p-4 flex gap-6">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/tasks">
          Tasks
        </Link>

      </nav>

      <div>
        {children}
      </div>

    </div>
  );
}

export default Layout;