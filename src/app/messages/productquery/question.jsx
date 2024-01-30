'use client';

import React from 'react';
import awsURL from '@/assets/common/awsUrl';

const Question = ({ question }) => {
    const originalDateString = question.dateCreated;
    const originalDate = new Date(originalDateString);
    const year = originalDate.getFullYear();
    const month = originalDate.getMonth() + 1;
    const day = originalDate.getDate();
    const formattedDate = `${year}.${month}.${day}`;

    return (
        <div className="question-container flex row w-full mb-4">
            <div className="mr-4 mt-2">
                <img src={awsURL + question.productId?.image} alt="제품" className='w-12'/>
            </div>
            <div className="mt-1 w-48">
                <p>{question.title}</p>
            </div>
            <div className="mt-1 w-48">
                <p>{question.detail}</p>
            </div>
            <div className="w-56 flex row mt-1">
                <img src={awsURL + question.userId?.image} alt="User" className='w-8 h-8 rounded-full'/>
                <div className='ml-4'>
                    <p className='mr-4'>{question.userId?.name}</p>
                    <p>{question.userId?.username}</p>
                </div>
            </div>
            <div>
                <p>{formattedDate}</p>
            </div>
        </div>
    );
};

export default Question;
