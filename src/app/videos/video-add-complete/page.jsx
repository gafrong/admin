'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FaCircleCheck } from "react-icons/fa6";

export default function Page() {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/videos/videomanage');
    };

    return (
        <div className="pl-5 pt-5 flex flex-col items-center justify-center h-screen">
            <div className='flex flex-row'>
                <FaCircleCheck style={{fontSize: '6rem', color: '#34d129'}}/>
                <h1 className='mt-10 ml-2'>영상이 업로드 되었습니다.</h1>
            </div>
            <p className="mt-8">업로드된 영상을 확인하시려면 '확인하기' 버튼을 클릭하세요. </p>
            <Button className="mt-6" onClick={handleButtonClick}>확인하기</Button>
        </div>
    )
}
  