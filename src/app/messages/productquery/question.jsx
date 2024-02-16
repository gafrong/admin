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
    console.log('img', question)
    return (
        <table className="w-full mb-4 mt-4">
            <tbody>
                <tr>
                    <td className="mr-4 mt-2 w-36">
                        <img src={question.productId
                            ? awsURL + question.productId.image
                            : "https://voutiq-app.s3.ap-northeast-2.amazonaws.com/website/product.jpg"}
                            alt="제품" className="w-12"
                        />
                    </td>
                    <td className="mt-1 w-40">
                        <p>{question.title.substring(0, 15)}</p>
                    </td>
                    <td className="mt-1 w-48">
                        <p>{question.detail.substring(0, 10)}..</p>
                    </td>
                    <td className="w-12 flex row">
                        <img
                            src={awsURL + question.userId?.image}
                            alt="User"
                            className="w-8 h-8 rounded-full mt-2"
                        />
                        <div className="ml-4">
                            <p className="mr-4">{question.userId?.name}</p>
                            <p className="text-xs mt-1">{question.userId?.username}</p>
                        </div>
                    </td>
                    <td>
                        <p className="text-xs">{formattedDate}</p>
                    </td>
                </tr>
            </tbody>
        </table>

    );
};

export default Question;
