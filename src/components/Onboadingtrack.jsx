"use client";

import React, {useState} from "react";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FiCamera } from "react-icons/fi";


const Onboardingtrack = () => {
    var brandCheck;
    var usernameCheck;
    var phoneCheck;
    var emailCheck;

    const [profileImage, setProfileImage] = useState("https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/profile.png")
    const [brand, setBrand] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const step1Validator = () => {
        if( brandCheck?.length > 0 && usernameCheck?.length > 0 && phoneCheck?.length > 0 && emailCheck?.length > 0){
            return true
        } else {
            return false
        }
    }

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if(reader.result){
                    console.log('IMG', reader.result)
                    setProfileImage(reader.result);
                } else {
                    console.log('Error reading file. ')
                }
            };

            reader.readAsDataURL(file);
        }
    }

    const handleBrandChange = (e) => {
        brandCheck = e.target.value;
        setBrand(e.target.value);
    }

    const handleUsernameChange = (e) => {
        usernameCheck = e.target.value;
        setUsername(e.target.value);
    }

    const handlePhoneChange = (e) => {
        phoneCheck = e.target.value;
        setPhone(e.target.value);
    }

    const handleEmailChange = (e) => {
        emailCheck = e.target.value;
        setEmail(e.target.value);
    }

    const step1Content = 
        <div className="mt-20 ml-10 mr-10 bg-slate-50 p-10">
            <h1 className="mt-0 font-bold mb-5">상점 정보 입력</h1>
            <div className="flex flex-row mb-5">
                <div className="ml-3.5 text-sm font-medium">상점 대표 이미지: </div>

                <img key={profileImage} src={profileImage} alt="Profile" style={{ width: '140px', height: '140px',borderRadius: '50%' }} />

                <label htmlFor="upload" className="cursor-pointer bg-slate-800 text-white py-2 px-2 width-[33px] rounded-full self-end absolute ml-[210px]">
                    <FiCamera />
                    <input id="upload" type="file" className="hidden" accept="image/*" onChange={handleProfileImageChange} />
                </label>
            </div>
            <div className="flex flex-row">
                <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900 m-3.5"
                >
                    브랜드 / 상점 이름:
                </label>
                <div className="mt-2">
                    <input
                        onChange={handleBrandChange}
                        id="brand"
                        name="text"
                        type="text"
                        placeholder="예) Banana Republic"
                        required
                        className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                    />
                </div>
                <div className="ml-5 mt-5 text-xs text-slate-400">(상점 또는 브랜드의 이름을 작성하세요)</div>
            </div>
            <div className="flex flex-row">
                <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900 m-3.5 ml-[50px]"
                >
                    사용자 이름:
                </label>
                <div className="mt-2">
                    <input
                        onChange={handleUsernameChange}
                        id="username"
                        name="text"
                        type="text"
                        placeholder="예) banana_repulic"
                        required
                        className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                    />
                </div>
                <div className="ml-5 mt-5 text-xs text-slate-400">(띄어쓰기 없이 영문 또는 숫자 조합으로 작성하세요.)</div>
            </div>
            <div className="flex flex-row">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 m-3.5 ml-[79px]"
                >
                    이메일:
                </label>
                <div className="mt-2">
                    <input
                        onChange={handleEmailChange}
                        id="email"
                        name="email"
                        placeholder="예) contact@mymail.com"
                        type="text"
                        required
                        className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                    />
                </div>
                <div className="ml-5 mt-5 text-xs text-slate-400">(고객분들과 소통하고 싶은 이메일을 작성하세요.)</div>
            </div>
            <div className="flex flex-row">
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900 m-3.5 ml-[79px]"
                >
                    연락처:
                </label>
                <div className="mt-2">
                    <input
                        onChange={handlePhoneChange}
                        id="phone"
                        name="phone"
                        type="number"
                        placeholder="예) 027121234"
                        required
                        className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                    />
                </div>
                <div className="ml-5 mt-5 text-xs text-slate-400">(띄어쓰기 없이 숫자만 적으세요.)</div>
            </div>
        </div>;
    const step2Content = <h1 className="mt-20">Step 2 content</h1>;
    const step3Content = <h1 className="mt-20">Step 3 content</h1>;
    const step4Content = <h1 className="mt-20">Step 4 content</h1>;

    


    const onFormSubmit = () => {
        console.log('testing!!')
    }
    return (
        <main className="mr-[140px]">
            <h1 className="font-bold text-xl">회원가입 진행</h1>
            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                nextBtnName="다음"
                previousBtnName="이전"
                steps={[
                    {
                        label: '브랜드 정보',
                        subtitle: "10%",
                        name: 'step 1',
                        content: step1Content,
                        validator: step1Validator,
                    },
                    {
                        label: '은행 정보',
                        subtitle: "10%",
                        name: 'step 1',
                        content: step2Content
                    },
                    {
                        label: '사업자 정보',
                        subtitle: "10%",
                        name: 'step 1',
                        content: step3Content
                    },
                    {
                        label: '확인',
                        subtitle: "10%",
                        name: 'step 1',
                        content: step4Content
                    }
                ]}
            />

        </main>
    );
}

export default Onboardingtrack;