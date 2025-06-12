"use client";

import React from "react";
import Link from "next/link";
import { IoBug } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { SignOut } from "./components/Sign-out";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];
const Navbar = () => {
  const currentPath = usePathname();
  return (
    <nav className="flex items-center justify-between p-4 bg-violet-200 text-white mb-4 fixed top-0 left-0 right-0 z-50">
      <Link href={"/"}>
        <IoBug color="black" />
      </Link>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${
                currentPath === link.href
                  ? "bg-violet-700 border-violet-700 text-violet-200 p-1.5 rounded-md transition-all duration-300"
                  : "text-violet-700"
              } hover:text-gray-500 hover:scale-110 transition-all duration-300`}
            >
              {/* 
                We can also use the classname available with next.js as mentioned below:
                className = {classname({
                    "bg-gray-200 border-gray-400 text-gray-900 p-1.5 rounded-md transition-all duration-300" : currentPath === link.href,
                    "text-white" : currentPath !== link.href,
                    "hover:text-gray-500 hover:scale-110 transition-all duration-300": true,
                })}
              */}
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <SignOut />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
