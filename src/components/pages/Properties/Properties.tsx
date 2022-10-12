import React, { useEffect, useState } from 'react';
import AssetListBlock from '../../elements/AssetListBlock/AssetListBlock';

const PropertiesPage = (): JSX.Element => {
    const [allAssets, setAllAssets] = useState([]);

    useEffect(() => {
  
        setAllAssets(getAllAssets());
    },[allAssets]);

    const getAllAssets = () => {
        return JSON.parse(localStorage.getItem('assets') || '[]');
    };
    return (
        <>
            <h1>My Properties</h1>
            <div className='sd-page-container'>
             {
             allAssets.map(({address, cost, description, image}, index) => 
                (<AssetListBlock 
                    address={address} 
                    cost={cost} 
                    description={description} 
                    image={image} 
                    key={index}
                />
             ))}
            </div>
        </>
    )
};
  
export default PropertiesPage;