import { FaSearch } from "react-icons/fa";

export function Header() {
  return(
    <header className="bg-gray-900 border-b">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 
          className="text-2xl font-bold text-white cursor-pointer"
        >
          LevelByte
        </h1>
        <nav className="flex items-center gap-3">
          <button className="text-gray-300 hover:text-white hover:bg-gray-600 px-3 py-2 rounded transition">
            Home
          </button>
          <button className="text-gray-300 hover:text-white hover:bg-gray-600 px-3 py-2 rounded transition">
            Articles
          </button>
          <button className="text-gray-300 hover:text-white hover:bg-gray-600 px-3 py-2 rounded transition">
            About
          </button>
          <button className="text-gray-300 hover:text-white hover:bg-gray-600 px-3 py-2 rounded transition">
            Contact
          </button>         
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition">
              <FaSearch size={20} className="text-white" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
  )
}