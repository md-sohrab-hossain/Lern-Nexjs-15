import Image from "next/image";
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
            <Image
              src="/logo.svg"
              alt="Eventry"
              width={135}
              height={135}
              style={{ width: "auto", height: "auto" }}
              priority
            />
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
