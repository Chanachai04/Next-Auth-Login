"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confrimPassword, setConfrimPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { data: session } = useSession();
    if (session) redirect("/welcome");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password != confrimPassword) {
            setError("Password do not match!");
            return;
        }
        if (!name || !email || !password || !confrimPassword) {
            setError("Please complete all inputs! ");
            return;
        }
        try {
            const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resCheckUser.json();
            if (user) {
                setError("User already exists");
                return;
            }

            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("User registration successfully");
                form.reset();
            } else {
                console.log("User registration failed");
            }
        } catch (error) {
            console.log("Error during registration : ", error);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-5">
                <h3>Register Page</h3>
                <hr className="my-3" />
                <form onSubmit={handleSubmit}>
                    {error && <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">{error}</div>}
                    {success && <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">{success}</div>}
                    <input
                        onChange={(e) => setName(e.target.value)}
                        className="block border border-black rounded-md mt-2 p-1 text-lg"
                        type="text"
                        placeholder="Enter your name"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="block border border-black rounded-md mt-2 p-1 text-lg"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="block border border-black rounded-md mt-2 p-1 text-lg"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <input
                        onChange={(e) => setConfrimPassword(e.target.value)}
                        className="block border border-black rounded-md my-2 p-1 text-lg"
                        type="password"
                        placeholder="Confrim your password"
                    />
                    <button type="submit" className="bg-green-500 p-3 rounded-md text-white">
                        Sing in
                    </button>
                </form>
                <hr className="my-3" />
                <p>
                    Do you have account? go to
                    <Link className="text-red-500 hover:underline" href="/login">
                        Login.
                    </Link>
                </p>
            </div>
        </div>
    );
}
