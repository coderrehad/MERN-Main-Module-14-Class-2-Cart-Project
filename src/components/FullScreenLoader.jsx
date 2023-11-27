import React from 'react';
import loader from '../assets/img/loader.svg';
const FullScreenLoader = (props) => {
    return (
        // eslint-disable-next-line react/prop-types
        <div className= {props.visibility}>
            <div className='ProcessingDiv'>
                <div className='center-screen'>
                    <img className='loader-size' src={loader}/>
                </div>
            </div>
        </div>
    );
};

export default FullScreenLoader;