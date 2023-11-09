"use client";
import Link from "next/link";
import Onboardingtrack from '@/components/Onboadingtrack';

export default function Page() {
    return (
        <div className="pl-5 pt-5">
            <Onboardingtrack />
            <Link href="/onboarding/shopname">name</Link>
        </div>
    );
}
