import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <nav className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-700">
            User Manager
          </Link>
          <div className="space-x-6">
            <Link
              to="/users"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Users
            </Link>
            <Link
              to="/users/add"
              className=" inline-block px-4 py-2 bg-gray-700 text-white font-medium rounded-md shadow-sm hover:bg-gray-800 
              hover:shadow-md transition-all "
            >
              Add User
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </div>
  );
}
