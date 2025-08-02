import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Project Title and Description */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-700">
            Next.js 15 Parallel Routes Demo
          </h1>
          <p className="text-lg text-gray-700">
            Understanding parallel routes and intercepting routes in Next.js 15
          </p>
        </div>

        {/* Project Structure Explanation */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Project Structure</h2>
          <pre className="p-4 overflow-x-auto text-sm text-gray-700 rounded-lg bg-gray-50">
            {`app/
└── parallel-dashboard/           # Main Dashboard Folder
    ├── layout.js                 # Handles all parallel routes
    ├── page.js                   # Main dashboard content
    │
    ├── @assignments/            # Parallel route for assignments
    │   ├── page.js             # Assignments content
    │   └── (hack)/            # Intercepting route group
    │       ├── loading.js     # Loading state
    │       └── page.js        # Intercepted view
    │
    ├── @notifications/        # Parallel route for notifications
    │   ├── page.js           # Notifications content
    │   ├── loading.js        # Loading state
    │   └── error.js          # Error handling
    │
    └── @quiz/                # Parallel route for quiz
        ├── page.js           # Quiz content
        └── loading.js        # Loading state`}
          </pre>
        </div>

        {/* How It Works */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">How Parallel Routes Work</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                1. Folder Structure
              </h3>
              <p className="text-gray-800">
                Folders starting with @ create parallel routes. Each can have
                its own loading, error, and page components.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                2. Layout Component
              </h3>
              <p className="text-gray-800">
                The layout.js receives each parallel route as a prop:
                assignments, notifications, and quiz.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                3. Independent Loading
              </h3>
              <p className="text-gray-800">
                Each parallel route can load independently. If one section is
                loading, others remain interactive.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">4. Error Handling</h3>
              <p className="text-gray-800">
                Error boundaries are isolated. An error in one route does not
                affect others.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                5. Intercepting Routes
              </h3>
              <p className="text-gray-800">
                Using (.) or (..) syntax, we can intercept and modify the
                default routing behavior
              </p>
            </div>
          </div>
        </div>

        {/* Demo Link */}
        <div className="text-center">
          <Link
            href="/parallel-dashboard"
            className="group relative inline-flex items-center gap-1.5 px-8 py-4 bg-blue-600 text-white text-2xl font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out hover:shadow-lg active:scale-95"
          >
            <span>View Demo Dashboard</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 transition-transform duration-200 transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
