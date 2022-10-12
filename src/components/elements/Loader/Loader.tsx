import React from 'react';
import './styles.scss';

const Loader = (): JSX.Element => {

    return (
        <div className='sd-loader'>
            <div className='sd-loader-title'>Loading next property</div>
            <div className='sd-loader-spinner'></div>
        </div>
    )
};
  
export default Loader;