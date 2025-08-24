'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/store';

const SignInOut = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push("/login");
    } catch (error) {
      router.push("/login");
    }
  };

  return (
    <div>
      {isAuthenticated && user ? (
        <>
          <span className="mx-2">Hello, {user?.name}</span>
          <span className="mx-1">|</span>
          <a className="cursor-pointer hover:text-indigo-600" onClick={handleLogout}>
            Logout
          </a>
        </>
      ) : (
        <Link href="/login" className="hover:text-indigo-600">Login</Link>
      )}
    </div>
  );
};

export default SignInOut;