import React, { useEffect, useState } from 'react';
import './styles.scss';

interface CountProps {
    count: number;
}

const Counter = ({count}: CountProps ): JSX.Element => {

    return (
        <div className='sd-counter'>
            {count}
        </div>
    )
};
  
export default Counter;