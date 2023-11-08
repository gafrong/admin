"use client";
import Link from "next/link";

export default function Page() {
    return (
        <div className="pl-5 pt-5">
            <h1>Onboarding Page</h1>
            <Link href="/onboarding/shopname">name</Link>
        </div>
    );
}
