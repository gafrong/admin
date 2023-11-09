"use client";

import React, {useState} from "react";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

const Onboardingtrack = () => {
    const [brand, setBrand] = useState('');
    const step1Content = 
        <div className="mt-20">
            <div className="flex flex-row">
                <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900 m-3.5"
                >
                    브랜드 / 상점 이름
                </label>
                <div className="mt-2">
                    <input
                        onChange={(e) => setBrand(e.target.value)}
                        id="brand"
                        name="text"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                    />
                </div>
            </div>
            <div className="flex flex-row">
                <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900 m-3.5"
                >
                    브랜드 / 상점 이름
                </label>
                <div className="mt-2">
                    <input
                        onChange={(e) => setBrand(e.target.value)}
                        id="brand"
                        name="text"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                    />
                </div>
            </div>
        </div>;
    const step2Content = <h1 className="mt-20">Step 2 content</h1>;
    const step3Content = <h1 className="mt-20">Step 3 content</h1>;

    const step1Validator = () => {
        if( 2 > 0) {
            return true
        } else {
            return false
        }
    }

    const onFormSubmit = () => {
        console.log('testing!!')
    }
    return (
        <main className="mr-[140px]">
            <h1>Onboarding Track</h1>
            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                nextBtnName="다음"
                previousBtnName="이전"
                steps={[
                    {
                        label: 'Shop Info',
                        subtitle: "10%",
                        name: 'step 1',
                        content: step1Content,
                        validator: step1Validator
                    },
                    {
                        label: 'Bank Info',
                        subtitle: "10%",
                        name: 'step 1',
                        content: step2Content
                    },
                    {
                        label: 'Company Info',
                        subtitle: "10%",
                        name: 'step 1',
                        content: step3Content
                    }
                ]}
            />

        </main>
    );
}

export default Onboardingtrack;