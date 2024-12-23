
// import React from 'react';
// import {  Link } from 'react-router-dom';

// function App() {
//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       <nav>
//         <ul>
//           <li><Link to="/signup">Signup</Link></li>
//           <li><Link to="/signin">Login</Link></li>
//         </ul>
//       </nav>
//     </div>
//   );
// }


// export default App;



import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">PayTM Clone</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Signup
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-yellow-400">PayTM</span>
          </h1>
          <p className="text-lg mb-6">
            Simplify your payments and enjoy seamless transactions.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="bg-white hover:bg-gray-200 text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md"
            >
              Login
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-4 shadow-md">
        <p className="text-sm text-blue-600">
          &copy; {new Date().getFullYear()} PayTM Clone. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
