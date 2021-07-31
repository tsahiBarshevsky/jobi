import React from 'react';
import { css } from "@emotion/react";
import PropagateLoader from 'react-spinners/PropagateLoader';
import './LoadingAnimation.sass';

const override = css`
    display: block;
    margin: 0 auto;
`;

const LoadingAnimation = () => 
{
    return (
        <div className="loading-animation-container">
            <PropagateLoader color="#1d5692" css={override} size={15} />
        </div>
    )
}

export default LoadingAnimation;
