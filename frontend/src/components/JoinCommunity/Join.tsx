import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
// import PhoneImage from '../../../public/Phone.svg';
import CirclesImage from '../../../public/10Circles.svg';
import Image from "next/image";
import { Sign } from 'crypto';
import SignButton from '../ui/SignButton';
import Update from '../Latestupdate/Update';

function Join() {
  return (
    <>
    <div className="flex overflow-x-hidden flex-row relative -mb-40 h-full w-full justify-center items-center">
      <Image
            src={CirclesImage}
            alt="Circle Background"
            width={893}
            height={938}
            className='absolute right-0 -top-24 object-contain'
            />
      <div className="w-1/2 h-full p-4 flex flex-col justify-center items-center">
      
        <h1 className="text-4xl font-bold mb-4 text-center">Join our community!</h1>
        <p className="text-[20px] font-semibold text-center max-w-[480px] mb-4">
          Click the icons to follow our accounts and never miss updates on upcoming events, contributions, and more!
        </p>
        <SignButton color="black" text="Join" tcol="white"/>
      </div>

      <div className="w-1/2 mt-10 relative"> 
        <div className='relative '>
        <Image
            src="/Phone2.png"
            alt="Phone Image"
            width={563}
            height={707}
            className=' object-contain scale-105' />
            <div className='absolute left-[72px] rounded-[78px] z-30 w-[505px] h-[707px] inset-1'>
      <div className='flex flex-col justify-center items-center gap-10 pt-40'>
        <div className='flex flex-row justify-center items-center gap-8'>
          <Link href="https://www.instagram.com" passHref>
            <Image
              src="/icons/insta.svg"
              alt='Instagram'
              width={79.63}
              height={101}
              className='transition transform hover:scale-110'
            />
          </Link>

          <Link href="https://www.twitter.com" passHref>
            <Image
              src="/icons/twitter.svg"
              alt='Twitter'
              width={79.63}
              height={101}
              className='transition transform hover:scale-110'
            />
          </Link>

          <Link href="https://www.youtube.com" passHref>
            <Image
              src="/icons/youtube.svg"
              alt='YouTube'
              width={79.63}
              height={101}
              className='transition transform hover:scale-110'
            />
          </Link>

          <Link href="https://www.discord.com" passHref>
            <Image
              src="/icons/discord.svg"
              alt='Discord'
              width={79.63}
              height={101}
              className='transition transform hover:scale-110'
            />
          </Link>
        </div>
        <div className='flex flex-row justify-center items-center gap-8'>
          <Link href="https://www.github.com" passHref>
            <Image
              src="/icons/git.svg"
              alt='GitHub'
              width={79.63}
              height={101}
              className='transition transform hover:scale-110'
            />
          </Link>

          <Link href="https://www.reddit.com" passHref>
            <Image
              src="/icons/reddit.svg"
              alt='Reddit'
              width={79.63}
              height={101}
              className='transition transform hover:scale-110'
            />
          </Link>

          <Link href="https://www.linkedin.com" passHref>
            <Image
              src="/icons/linkedin.svg"
              alt='LinkedIn'
              width={79.63}
              height={101}
              className='transition transform hover:scale-110'
            />
          </Link>

          <Link href="https://www.whatsapp.com" passHref>
            <Image
              src="/icons/whatsapp.svg"
              alt='WhatsApp'
              width={79.63}
              height={101}
              className='transition transform hover:scale-110'
            />
          </Link>
        </div>
      </div>
    </div>
        </div>
        
          
      </div>
      
    </div>
    
    
    </>
  );
}

export default Join;
