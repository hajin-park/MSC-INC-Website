import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export default function HomePageHeaderSection() {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const listRef = ref(storage, 'homePage');

        // Fetch all the images from the 'homePage' folder
        listAll(listRef)
            .then((res) => {
                return Promise.all(res.items.map((item) => getDownloadURL(item)));
            })
            .then((urls) => {
                setImages(urls);
            })
            .catch((error) => {
                console.log(error.message)
            });
    }, []);

    const handlePrev = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentImage((currentImage + 1) % images.length);
    };

    return (
        <div className="w-full h-144 flex flex-col lg:flex-row items-center justify-center  bg-gray-100 text-gray-900">
            <div className="w-full lg:w-1/2 h-1/2 gap-4 lg:h-full p-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl lg:text-4xl font-bold">Welcome to Merced Senior Citizens Inc. & Merced Senior Community Center!</h1>
                <p className="text-xl lg:text-2xl">Our mission is to provide seniors 50+ with meeting facilities and services specially designed to meet the physical, social and psychological needs and to promote the health, security, happiness, usefulness and longer life of the local senior community.</p>
            </div>
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center relative shadow-inner">
                <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                    <ChevronLeftIcon className="h-12 w-12 text-gray-500" />
                </button>
                <img src={images[currentImage]} alt="" className="object-cover w-full h-full" />
                <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                    <ChevronRightIcon className="h-12 w-12 text-gray-500" />
                </button>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-4 p-4">
                    {images.map((_, index) => (
                        <span key={index} className={`h-3 w-3 rounded-full ${index === currentImage ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                    ))}
                </div>
            </div>
        </div>
    );
}
