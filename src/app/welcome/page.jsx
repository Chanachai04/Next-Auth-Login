"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function WelcomePage() {
    const { data: session } = useSession();
    console.log(session);
    if (!session) redirect("/login");
    return (
        <div>
            <Navbar session={session} />
            <div className="container mx-auto">
                <h3>Welcome {session?.user?.name}</h3>
                <hr className="my-3" />
            </div>
        </div>
    );
}
