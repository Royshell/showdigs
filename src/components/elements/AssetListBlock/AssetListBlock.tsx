import React, { useEffect, useState } from 'react';
import { Property } from '../../../App';
import './styles.scss';

const AssetListBlock = ({image, description, cost, address}: Property): JSX.Element => {

    return (
        <div className='sd-asset-list-block'>
           <img src={image} alt="propery image" className='sd-asset-list-block-image' />
           <div className='sd-asset-list-block-content'>
                <div className='sd-asset-list-block-content-address'>{address}</div>
                <div className='sd-asset-list-block-content-cost'>{cost}</div>
                <div className='sd-asset-list-block-content-description'>{description}</div>
           </div>
        </div>
    )
};
  
export default AssetListBlock;