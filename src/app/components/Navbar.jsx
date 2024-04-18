"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar({ session }) {
    return (
        <nav className="bg-[#333] text-white p-5">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <Link href="/">Next Auth</Link>
                    </div>
                    <ul className="flex">
                        {!session ? (
                            <>
                                <li className="mx-3">
                                    <Link href="/login">Sing In</Link>
                                </li>
                                <li className="mx-3">
                                    <Link href="/register">Sing Up</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="mx-3">
                                    <a onClick={() => signOut()} className="bg-red-500 text-white border p-2 rounded-md text-lg my-2">
                                        Logout
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
