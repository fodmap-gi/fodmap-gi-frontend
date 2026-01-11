import { Link } from "react-router-dom";

export default function Index() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Main Menu</h1>
      
      

      <Link
        to="/checking"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Checking Mode
      </Link>

      <Link
        to="/collection"
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Go to Collection Mode
      </Link>

      <Link
        to="/register"
        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-green-600"
      >
        Go to RegisterPage
      </Link>

      <Link
        to="/profile"
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-green-600"
      >
        Go to ProfilePage
      </Link>
    </div>
  );
}
