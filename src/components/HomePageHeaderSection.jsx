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
            <div className="relative w-full 2xl:h-screen xl:h-screen lg:h-192 md:h-176 sm:screen h-screen p-16 lg:p-40 flex flex-col items-center justify-center  bg-gradient-to-b from-black/90 to-black/40 text-white">
                <img src={`${images[currentImage]}`} alt="Homepage Gallery Image" className="absolute w-full h-full object-cover object-center mix-blend-overlay"/>
                <h1 className="2xl:text-8xl 2xl:text-left xl:text-7xl xl:text-left lg:text-6xl lg:text-left md:text-5xl sm:text-4xl text-3xl text-center font-rubik tracking-tight">Welcome to Merced Senior Citizens Inc. & Merced Senior Community Center!</h1>
                <p className="pt-4 2xl:text-4xl 2xl:text-left xl:text-3xl xl:text-left lg:text-2xl lg:text-left md:text-1xl sm:text-lg text-md text-center">Our mission is to provide seniors 50+ with meeting facilities and services specially designed to meet the physical, social and psychological needs and to promote the health, security, happiness, usefulness and longer life of the local senior community.</p>
                <button onClick={handlePrev} className="transition-opacity duration-400 opacity-0 hover:opacity-100 absolute flex justify-start items-center w-1/3 h-full left-0 top-1/2 transform -translate-y-1/2 z-10 hover:bg-gradient-to-r from-black/50 to-black/0">
                    <ChevronLeftIcon className="h-12 w-12 text-white" />
                </button>
                <button onClick={handleNext} className="transition-opacity duration-400 opacity-0 hover:opacity-100 absolute flex justify-end items-center w-1/3 h-full right-0 top-1/2 transform -translate-y-1/2 z-10 hover:bg-gradient-to-l from-black/50 to-black/0 ">
                    <ChevronRightIcon className="h-12 w-12 text-white" />
                </button>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-4 p-4">
                    {images.map((_, index) => (
                        <span key={index} className={`h-3 w-3 rounded-full ${index === currentImage ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                    ))}
                </div>
            </div>
    );
}
