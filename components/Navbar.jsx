import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic import to avoid hydration issues and improve performance
const SignInOut = dynamic(() => import("./auth/SignInOut"), {
  ssr: false, // Disable server-side rendering for this component
  loading: () => <span className="text-[#9C9C9C]">Loading...</span>
});

const Navbar = () => {
  return (
    <nav>
      <div className="container flex items-center justify-between py-4">
        <div className="nav-brand">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                E
              </div>
              <span className="text-2xl font-bold text-white">
                ventry
              </span>
            </div>
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li>
            <SignInOut />
          </li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
