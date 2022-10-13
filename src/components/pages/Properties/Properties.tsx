import React, { useEffect, useState } from 'react';
import AssetListBlock from '../../elements/AssetListBlock/AssetListBlock';
import './styles.scss';

const PropertiesPage = (): JSX.Element => {

    const [allAssets, setAllAssets] = useState([]);

    useEffect(() => {
        setAllAssets(getAllAssets());
    },[allAssets]);

    const getEmptyMessage = (): JSX.Element => (
        <div>Your properties will appear here</div>
    );


    const getAllAssets = () => {
        return JSON.parse(localStorage.getItem('assets') || '[]');
    };

    return (
        <>
            <h1>My Properties</h1>
            <div className='sd-page-container'>
                {
                !!allAssets.length ? allAssets.map(({address, cost, description, image}, index) => 
                    (<AssetListBlock 
                        address={address} 
                        cost={cost} 
                        description={description} 
                        image={image} 
                        key={index}
                    />
                ))
                : 
                getEmptyMessage()
                }
            </div>
        </>
    )
};
  
export default PropertiesPage;