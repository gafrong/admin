"use client";

import React from "react";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

const Onboardingtrack = () => {
    const step1Content = <h1 className="mt-20">Step 1 content Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias optio, sit eaque unde dolorem ullam omnis vero. Corrupti, nesciunt quisquam aut placeat, modi reiciendis cumque, veniam sit est vero fugit?</h1>;
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