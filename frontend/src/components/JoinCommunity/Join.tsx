import React from 'react';
import { Button } from '../ui/button';
import PhoneImage from '../../../public/Phone.svg';
import CirclesImage from '../../../public/10Circles.svg';
import Image from "next/image";

function Join() {
  return (
    <div className="flex mb-100">
      <div className="w-1/2 p-4 flex flex-col justify-center items-center lg:px-48">
        <h1 className="text-3xl font-bold mb-4 text-center">Join our community</h1>
        <p className="text-lg text-center mb-4">
          Click the icons to follow our accounts and never miss updates on upcoming events, contributions, and more!
        </p>
        <Button variant="outline" className='bg-blue-700 hover:bg-blue-800 text-white hover:text-white'>Follow Now</Button>
      </div>

      <div className="w-1/2 relative">
        <div className="absolute inset-0">
          <Image
            src={CirclesImage}
            alt="Circle Background"
            width={400}
            height={400}
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain"
            }} />
        </div>
        
        <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
          <Image
            src={PhoneImage}
            alt="Phone Image"
            width={250}
            height={250}
            className='shadow-xl'
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain"
            }} />
        </div>
      </div>
    </div>
  );
}

export default Join;
