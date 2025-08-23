'use client';

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const SignInOut = dynamic(() => import("./auth/SignInOut"), { ssr: false });

const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/">
            <Image 
              src="/logo.svg" 
              alt="Eventry" 
              width={135} 
              height={135}
              style={{ width: 'auto', height: 'auto' }}
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