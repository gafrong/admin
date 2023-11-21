"use client";

import React, {useState, useEffect} from "react";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FiCamera } from "react-icons/fi";

const Onboardingtrack = () => {
    var brandCheck;
    var usernameCheck;
    var phoneCheck;
    var emailCheck;
    var banknameCheck;
    var bankaccountCheck;

    // validators
    const step1Validator = () => 
        ( brandCheck?.length && usernameCheck?.length && phoneCheck?.length && emailCheck?.length)

    const step2Validator = () => 
        ( banknameCheck?.length && bankaccountCheck?.length) 
    

// step 1 contents
    const srcDefaultImage = "https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/profile.png";
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const regex = { imageMimeType };

    const [file, setFile] = useState(null);
    const isValidImage = (file) => file.type.match(regex.imageMimeType);
    const [stepProgressBarKey, setStepProgressBarKey] = useState(Date.now());
    const [profileImage, setProfileImage] = useState(srcDefaultImage);

    const [ startStep, setStartStep ] = useState(0);
    const [brand, setBrand] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleProfileImageChange = (e) => {
        const fileTarget = e.target.files[0];
        if (!isValidImage(fileTarget)) {
            alert("Not an image");
            return;
        }
        setFile(fileTarget);
    }

    useEffect(() => {
        let fileReader,
          isCancel = false;
        const isLoading = 1;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setProfileImage(result);
                    setStepProgressBarKey(Date.now());
                }
            };
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader?.readyState === isLoading) {
                fileReader.abort();
            }
        };
    }, [file]);

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

    const Step1Content = ({handleProfileImageChange, handleBrandChange, handleUsernameChange, handleEmailChange, handlePhoneChange}) => (
        <div className="mt-20 ml-10 mr-10 bg-slate-50 p-10">
            <h1 className="mt-0 font-bold mb-5">상점 정보 입력</h1>
            <div className="flex flex-row mb-5">
                <div className="ml-3.5 text-sm font-medium">상점 대표 이미지: </div>

                <img src={profileImage} alt="Profile" style={{ width: '140px', height: '140px',borderRadius: '50%' }} />

                <label htmlFor="upload" className="cursor-pointer bg-slate-800 text-white py-2 px-2 width-[33px] rounded-full self-end absolute ml-[210px]">
                    <FiCamera />
                    <input id="upload" type="file" className="hidden" accept="image/*, .png, .jpg, .jpeg" onChange={handleProfileImageChange} />
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
        </div>
    );

// step 2 contents
    const [bankName, setBankName] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [bankUserName, setBankUserName] = useState('');

    const handleBankChange = (e) => {
        console.log('check', e.target.value)
        banknameCheck = e.target.value;
        setBankName(e.target.value);
    }

    const handleBankAccountChange = (e) => {
        bankaccountCheck = e.target.value;
        setBankAccount(e.target.value);
    }

    const Step2Content = ({ handleBankChange, handleBankAccountChange }) => (
        <div className="mt-20 ml-10 mr-10 bg-slate-50 p-10">
            <h1 className="mt-0 font-bold mb-5">은행 정보 입력</h1>
            <div className="flex flex-row mb-5">

            </div>
            <div className="flex flex-row">
                <label
                    htmlFor="bank"
                    className="block text-sm font-medium leading-6 text-gray-900 m-3.5"
                >
                    은행명:
                </label>
                <div className="mt-2">
                    <input
                        onChange={handleBankChange}
                        id="bank"
                        name="bank"
                        type="text"
                        placeholder="예) 하나은행"
                        required
                        className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                    />
                </div>
                <div className="ml-5 mt-5 text-xs text-slate-400">(은행명을 입력하세요)</div>
            </div>

            <div className="flex flex-row">
                <label
                    htmlFor="bankaccount"
                    className="block text-sm font-medium leading-6 text-gray-900 m-3.5"
                >
                    계좌번호:
                </label>
                <div className="mt-2">
                    <input
                        onChange={handleBankAccountChange}
                        id="bankaccount"
                        name="bankaccount"
                        type="number"
                        placeholder="1980428761235"
                        required
                        className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-3"
                    />
                </div>
                <div className="ml-5 mt-5 text-xs text-slate-400">(은행 계좌번호를 번호만 입력하세요)</div>
            </div>         
        </div>
    );

// step 3 contents
    const [ businessDocument, setBusinessDocument] = useState('https://voutiq-app.s3.ap-northeast-2.amazonaws.com/000SiteImages/docs.jpg');
    const [ document, setDocument ] = useState('');
    const [ stepKey, setStepKey] = useState(0);
    const [ isSelected, setIsSelected ] = useState(false);

    const handleDocumentUpload = (e) => {
        const fileDocument = e.target.files[0];
        if (!isValidImage(fileDocument)) {
            alert("Not an image");
            return;
        }
        setDocument(fileDocument);

    }

    useEffect(() => {
        let fileReader,
          isCancel = false;
        const isLoading = 1;
        if (document) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setBusinessDocument(result);
                    setIsSelected(true)
                    console.log('hello')
                    setStartStep(2);
                    setStepProgressBarKey(Date.now());
                }
            };
            fileReader.readAsDataURL(document);
        }
        return () => {
            isCancel = true;
            if (fileReader?.readyState === isLoading) {
                fileReader.abort();
            }
        };
    }, [document]);    

    const Step3Content = () => {
        return (
            <div className="mt-20 ml-10 mr-10 bg-slate-50 p-10">
                <h1 className="mt-0 font-bold mb-5">사업자 등록증 업로드</h1>
                <div className="flex flex-row mb-5">
                    <div className="ml-3.5 text-sm font-medium">사업자 등록증: </div>

                    <img src={businessDocument} alt="사업자등록증" style={{ width: '140px', height: '140px', borderRadius: '10px', marginLeft: '20px', marginTop: '10px', marginRight: '20px'}} />

                    <label htmlFor="document" className="cursor-pointer bg-slate-800 text-white py-2 px-2 width-[33px] rounded-full self-end absolute ml-[240px] mb-[-15px]">
                        <FiCamera />
                        <input id="document" type="file" className="hidden" accept="image/*, .png, .jpg, .jpeg" onChange={handleDocumentUpload} />
                    </label>
                    {isSelected ? (
                            <div className="mt-5">
                            </div>
                        ) : (
                            <p className="mt-5 text-xs">(파일은 .png, .jpg, .jpeg로 업로드해주세요.)</p>
                        )}
                </div>
            </div>
        )
    };

// step 4 content    
    const Step4Content = () => {
        return (
            <div className="mt-20 ml-10 mr-10 bg-slate-50 p-10">
                <h1 className="mt-0 font-bold mb-5">입력 내용 확인</h1>
                <div className="flex flex-row mb-5">
                    <div className="ml-6 text-sm font-medium">상점 대표 이미지: </div>
                    <img src={profileImage} alt="Profile" style={{ width: '140px', height: '140px',borderRadius: '50%' }}/>
                </div>
                <div className="ml-6 mb-10">
                    <p className="text-sm font-medium">브랜드 정보: </p>
                    <div className="ml-20 flex flex-row">
                        <p className="text-sm font-medium">브랜드 / 사업자명: </p>
                        <p className="text-sm font-medium ml-2">{brand}</p>
                    </div>
                    <div className="ml-20 flex flex-row">
                        <p className="text-sm font-medium">사용자명: </p>
                        <p className="text-sm font-medium ml-2">{username}</p>
                    </div>
                    <div className="ml-20 flex flex-row">
                        <p className="text-sm font-medium">이메일: </p>
                        <p className="text-sm font-medium ml-2">{email}</p>
                    </div>
                    <div className="ml-20 flex flex-row">
                        <p className="text-sm font-medium">연락처: </p>
                        <p className="text-sm font-medium ml-2">{phone}</p>
                    </div>
                </div>
                <div className="ml-6 mb-10">
                    <p className="text-sm font-medium">은행 정보: </p>
                    <div className="ml-20 flex flex-row">
                        <p className="text-sm font-medium">은행: </p>
                        <p className="text-sm font-medium ml-2">{bankName}</p>
                    </div>
                    <div className="ml-20 flex flex-row">
                        <p className="text-sm font-medium">계좌: </p>
                        <p className="text-sm font-medium ml-2">{bankAccount}</p>
                    </div>
                </div>
                <div className="flex flex-row mb-5 ml-6">
                    <div className="text-sm font-medium">사업자 등록증: </div>
                    <img src={businessDocument} alt="사업자등록증" style={{ width: '140px', height: '140px', borderRadius: '10px', marginLeft: '20px', marginTop: '10px', marginRight: '20px'}} />
                </div>
            </div>
        )
    };


    const onFormSubmit = () => {
        console.log('testing!!')
    }
    return (
        <main className="mr-[140px]">
            <h1 className="font-bold text-xl">회원가입 진행</h1>
            <StepProgressBar
                key={stepProgressBarKey} 
                startingStep={startStep}
                onSubmit={onFormSubmit}
                nextBtnName="다음"
                previousBtnName="이전"
                steps={[
                    {
                        label: '브랜드 정보',
                        subtitle: "",
                        name: 'step 1',
                        content: <Step1Content
                            handleProfileImageChange={handleProfileImageChange} 
                            handleBrandChange={handleBrandChange} 
                            handleUsernameChange={handleUsernameChange} 
                            handleEmailChange={handleEmailChange} 
                            handlePhoneChange={handlePhoneChange}
                        />,
                        validator: step1Validator,
                    },
                    {
                        label: '은행 정보',
                        subtitle: "",
                        name: 'step 2',
                        content: <Step2Content
                            handleBankChange={handleBankChange}
                            handleBankAccountChange={handleBankAccountChange}
                        />,
                        validator: step2Validator,
                    },
                    {
                        label: '사업자 정보',
                        subtitle: "",
                        name: 'step 3',
                        content: <Step3Content
                            businessDocument={businessDocument}
                            isSelected={isSelected}
                        />
                    },
                    {
                        label: '확인',
                        subtitle: "",
                        name: 'step 4',
                        content: <Step4Content/>
                    }
                ]}
            />

        </main>
    );
}

export default Onboardingtrack;