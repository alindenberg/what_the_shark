import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import SharkType from "@/types/SharkType";


export default function SharkCarousel(shark: SharkType) {
    const [imgIndex, setImgIndex] = useState(0);
    let imgNames = ['index.jpg', 'carousel_1.jpg', 'carousel_2.jpg', 'carousel_3.jpg', 'carousel_4.jpg', 'carousel_5.jpg']

    // useEffect(() => {
    //     // Preload images
    //     // imgNames.forEach((imgName) => {
    //     //     const img = new Image();
    //     //     img.src = `/sharks/${shark.name.toLowerCase().replace(' ', '_')}/${imgName}`;
    //     // });
    // }, [shark.name, imgNames]);

    const handleLeftClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setImgIndex(imgIndex > 0 ? imgIndex - 1 : imgNames.length - 1);
    };

    const handleRightClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setImgIndex(imgIndex < imgNames.length - 1 ? imgIndex + 1 : 0);
    };

    return (
        <div>
            <div className="flex justify-center items-center m-4">
                <FontAwesomeIcon
                    size="2x"
                    icon={faAngleLeft}
                    className='cursor-pointer w-4 p-2'
                    onClick={handleLeftClick}
                />
                <Image
                    src={`/sharks/${shark.name.toLowerCase().replace(' ', '_')}/${imgNames[imgIndex]}`}
                    alt={shark.name}
                    width={500}
                    height={400}
                    style={{ borderRadius: '50%' }}
                    rel={imgIndex !== 0 ? 'preload' : undefined}
                    loading={imgIndex === 0 ? 'eager' : 'lazy'}
                />
                <FontAwesomeIcon
                    size="2x"
                    icon={faAngleRight}
                    className='cursor-pointer w-4 p-2'
                    onClick={handleRightClick}
                />
            </div >
        </div>
    );
}