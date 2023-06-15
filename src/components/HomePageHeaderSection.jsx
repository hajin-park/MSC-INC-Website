import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export default function HomePageHeaderSection() {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [error, setError] = useState(null);

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
                setError(error.message);
            });
    }, []);

    const handlePrev = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentImage((currentImage + 1) % images.length);
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center h-1/2 bg-gray-200 text-gray-900">
            <div className="lg:w-1/2 p-10 text-center">
                <h1 className="text-6xl font-bold">Welcome to Merced Senior Citizens Inc. & Merced Senior Community Center!</h1>
                <p className="mt-4 text-3xl">Our mission is to provide seniors 50+ with meeting facilities and services specially designed to meet the physical, social and psychological needs and to promote the health, security, happiness, usefulness and longer life of the local senior community.</p>
            </div>
            <div className="lg:w-1/2 h-full flex items-center justify-center relative bg-white shadow-inner">
                {error ? (
                    <div className="bg-red-100 w-full h-full flex items-center justify-center">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : images.length > 0 ? (
                    <>
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
                    </>
                ) : (
                    <div className="bg-red-300 w-full h-full"></div>
                )}
            </div>
        </div>
    );
}
