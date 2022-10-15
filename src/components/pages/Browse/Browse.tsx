import React, { useEffect, useState } from 'react';
import Loader from '../../elements/Loader/Loader';
import PropertyBlock from '../../elements/PropertyBlock/PropertyBlock';
import './styles.scss';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import _ from 'lodash';
import { Property } from '../../../App';

const API_URL = 'https://organic-ursinia.glitch.me/';
const API_REQUESTS_COUNT = 5;

const BrowsePage = (): JSX.Element => {

    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [properties, setProperties] =  useState<Property[]>([]);
    const [swiperInstance, setSwiperInstance] = useState<any>({});

    useEffect(() => {
     
        const fetchData = async () => {
            const propertiesToAdd = await getProperties(API_REQUESTS_COUNT);
            setProperties(propertiesToAdd);
          }
        fetchData();  
    },[]);



    const getProperties = async(amount: number): Promise<Property[]> => {
        setIsLoading(true);
        const propertiesToAdd: Property[] = [];
        for(let i = 0; i < amount; i++) {
            const property = await getProperty();
            if (!_.some(properties, property)){
                propertiesToAdd.push(property);
            }
        }
        setIsLoading(false);
        return propertiesToAdd;
    }

    const handleSwipe = (currentIndex: number) => {
        setCurrentIndex(currentIndex);
        if (currentIndex === properties.length - 1) {
            fetchMoreProperties(currentIndex);
        }
    }

    const fetchMoreProperties = async (currentIndex: number) => {
        const propertiesToAdd: Property[]  = await getProperties(API_REQUESTS_COUNT);
        const currentProperties: Property[] = [...properties];
        setProperties([...currentProperties, ...propertiesToAdd]);
    }

    const getProperty = async (): Promise<Property> => {
        const response = await fetch(API_URL);
        const property = await response.json();
        return property;
    }

    const getIsActiveButton = (): boolean => {
        const savedAssets =  JSON.parse(localStorage.getItem('assets') || '[]');
        const currentAsset = properties[currentIndex];
        return _.some(savedAssets, currentAsset);
    }

    const saveProperty = (): void => {
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
                initialSlide={properties.length - 1 - API_REQUESTS_COUNT}
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
                    <button onClick={saveProperty} disabled={getIsActiveButton()}> Yay!</button>
                </div>
            </> 
            :
            <Loader />

            
        }
        </>
    )
};
  
export default BrowsePage;