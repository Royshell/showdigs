import React, { useEffect, useState } from 'react';
import Loader from '../../elements/Loader/Loader';
import PropertyBlock from '../../elements/PropertyBlock/PropertyBlock';
import './styles.scss';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useSwiper } from 'swiper/react';
import { Property } from '../../../App';

const API_URL = 'https://organic-ursinia.glitch.me/';

const BrowsePage = (): JSX.Element => {

    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [properties, setProperties] =  useState<Property[]>([]);
    const [swiperInstance, setSwiperInstance] = useState({});

    useEffect(() => {
     
        const fetchData = async () => {
            const properties = await getProperties(5);
            setProperties(properties);
          }
        fetchData();  
    },[]);



    const getProperties = async(amount: number): Promise<Property[]> => {
        setIsLoading(true);
        const properties: Property[] = [];
        for(let i = 0; i < amount; i++) {
            const property = await getProperty();
            properties.push(property);
        }
        setIsLoading(false);
        return properties;
    }

    const handleSwipe = (currentIndex: number) => {
        setCurrentIndex(currentIndex);
        if (currentIndex === properties.length - 2) {
            fetchMoreProperties();
        }
    }

    const fetchMoreProperties = async () => {
        const propertiesToAdd: Property[]  = await getProperties(5);
        const currentProperties: Property[] = [...properties];
        setProperties([...currentProperties, ...propertiesToAdd]);
      }

    const getProperty = async (): Promise<Property> => {
        const response = await fetch(API_URL);
        const property = await response.json();
        return property;
    }

    const saveProperty = (): void => {
        console.log('sliding next');
        //@ts-ignore;
        swiperInstance.slideNext();
        const savedAssets =  JSON.parse(localStorage.getItem('assets') || '[]');
        const currentAsset = properties[currentIndex];
        savedAssets.push(currentAsset);
        localStorage.setItem('assets', JSON.stringify(savedAssets));
    }

    return (
        <>
            <h1>Browse</h1>
            { !isLoading ? <>
            <Swiper
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                navigation
                modules={[Navigation]}
                onSlideChange={({activeIndex}) => handleSwipe(activeIndex)}
          >  
            {
                properties.map(({image, address, cost, description}, index) => (
                    <SwiperSlide key={index}>
                    <PropertyBlock 
                        image={image}
                        address={address} 
                        cost={cost}
                        description={description}
                    />
                </SwiperSlide> 
                )) 
            }

          </Swiper>
                <div className="sd-buttons-block">
                    <button onClick={saveProperty}> Yay!</button>
                </div>
            </> 
            :
            <Loader />

            
        }
        </>
    )
};
  
export default BrowsePage;