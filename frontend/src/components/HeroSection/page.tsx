"use client"
import Image from 'next/image';
import { Archivo_Black } from "next/font/google";
import SignButton from '../ui/SignButton';

const HeroSection = () => {
    return ( 
        <>
        <section className="h-full w-full relative bg-[#f9f4ee]">
            <div className="h-screen w-full flex justify-around items-center">
            
                    <Image src='/HeroRight.png' width={600} height={600} alt="hero" className="object-contain absolute right-0 -top-20" />
                    <Image src='/HeroLeft.png' width={200} height={200} alt="hero" className="object-contain absolute left-0 top-40" />
                    <Image src='/DJANGO.svg' width={816} height={164} alt="logo" className="absolute left-40 top-32"/>
                    <Image src='/INDIA.svg' width={532} height={159} alt="logo" className="absolute right-60 top-80"/>
                    <div className='absolute flex justify-center gap-6 flex-col items-end right-60 bottom-32'>
                        <div className='flex flex-col items-end'>
                        <div className='font-Archivo_Black text-5xl font-black text-[#ff8ba1]'>For the Community</div>
                        <div className='font-Archivo_Black text-5xl font-black text-[#ff8ba1]'>by the Community</div>
                    </div>
                    <div className='flex flex-col items-end'>
                    <div className='text-black'>Connecting passionate Django developers</div>
                    <div className='text-black'>especially from India to share, learn, and</div>
                    <div className='text-black'>grow together. </div>
                    
                    
                    </div>
                    
              
            </div>
          </div>
        </section>
        </>
     );
}
 
export default HeroSection;