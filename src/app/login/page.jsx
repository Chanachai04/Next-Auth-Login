"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    
    const { data: session } = useSession();
    if (session) router.replace("welcome");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (res.error) {
                setError("Invalid credentials");
                return;
            }
            router.replace("welcome");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-5">
                <h3>Login Page</h3>
                <hr className="my-3" />
                <form onSubmit={handleSubmit}>
                    {error && <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">{error}</div>}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="block border border-black rounded-md mt-2 p-1 text-lg"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="block border border-black rounded-md my-2 p-1 text-lg"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <button type="submit" className="bg-green-500 p-3 rounded-md text-white">
                        Sing in
                    </button>
                </form>
                <hr className="my-3" />
                <p>
                    Do you not have account? go to
                    <Link className="text-red-500 hover:underline" href="/register">
                        Register.
                    </Link>
                </p>
            </div>
        </div>
    );
}
