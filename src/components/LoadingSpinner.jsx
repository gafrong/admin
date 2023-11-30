import React from 'react';
import { ClipLoader } from 'react-spinners';

const override = {
    display: 'block',
    margin: '0 auto',
};

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#000" loading css={override} size={50} />
    </div>
);

export default LoadingSpinner;
