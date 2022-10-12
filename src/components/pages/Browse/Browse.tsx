import React, { useEffect, useState } from 'react';
import Loader from '../../elements/Loader/Loader';
import PropertyBlock from '../../elements/PropertyBlock/PropertyBlock';
import './styles.scss';

const API_URL = 'https://organic-ursinia.glitch.me/';

const BrowsePage = (): JSX.Element => {

    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        getAsset();
    },[]);


    const getAsset = (): void => {
        setIsLoading(true);
        fetch(API_URL)
        .then(res => res.json())
        .then(({image, cost, address, description}) => {
          setIsLoading(false);
          setAddress(address);
          setCost(cost);
          setImage(image);
          setDescription(description);
      })
        .catch(err => console.error(err));
    }  

    const saveAsset = (): void => {
        const savedAssets =  JSON.parse(localStorage.getItem('assets') || '[]');
        const currentAsset = {address,cost,image,description};
        savedAssets.push(currentAsset);
        localStorage.setItem('assets', JSON.stringify(savedAssets));
        getAsset();
    }

    return (
        <>
            <h1>Browse</h1>
            { !isLoading ? <div className='sd-browse-content-block'>
                <PropertyBlock 
                    image={image}
                    address={address} 
                    cost={cost}
                    description={description}
                />
                <div className="sd-buttons-block">
                    <button onClick={getAsset}>Nope </button>
                    <button onClick={saveAsset}> Yay!</button>
                </div>
            </div> 
            :
            <Loader />
            }
        </>
    )
};
  
export default BrowsePage;