import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg text-center space-y-8 border">
        
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Main Menu
        </h1>

        <p className="text-slate-500">
          Choose a mode to continue
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            to="/checking"
            className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold
                       hover:bg-blue-600 transition-all duration-200 hover:scale-[1.02]"
          >
            🔍 Checking Mode
          </Link>

          <Link
            to="/collection"
            className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold
                       hover:bg-green-600 transition-all duration-200 hover:scale-[1.02]"
          >
            📦 Collection Mode
          </Link>

          <Link
            to="/profile"
            className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold
                       hover:bg-red-600 transition-all duration-200 hover:scale-[1.02]"
          >
            👤 Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
