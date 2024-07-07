"use client"
import Image from "next/image";
import { Archivo_Black } from "next/font/google";
import SignButton from '../ui/SignButton';
import { Button } from "../ui/button";



const HeroSection = () => {
  return (
    <section className="w-full h-auto relative bg-[#f9f4ee]">
      <div className="lg:h-[750px] overflow-hidden relative w-full flex justify-center items-start">
        <Image
          src="/HeroRight.png"
          width={600}
          height={400}
          alt="hero"
          className="object-contain scale-90 z-0 absolute -top-24 -right-20"
        />

        <Image
          src="/HeroLeft.png"
          width={200}
          height={200}
          alt="hero"
          className="object-contain z-0 absolute left-0 top-60 md:top-40 xs:w-1/2 xs:h-auto"
        />

        <div className="max-w-[1200px] h-auto z-10 xl:pt-16 pt-10 px-10 w-full gap-8 flex justify-center flex-col pb-10">
          <div className="w-full h-40 justify-start">
            <Image
              src="/DJANGO.svg"
              width={816}
              height={164}
              alt="logo"
              className="scale-75 md:scale-100"
            />
          </div>
          <div className="w-full h-96 flex justify-center gap-8 flex-row items-center">
            <div className="h-full mx-auto">
              <Image
                src="/03Heroimage.svg"
                width={532}
                height={159}
                alt="logo"
                className="mx-auto"
              />
            </div>
            <div className="h-full flex justify-end min-w-1/2">
              <div className="flex justify-start gap-20 flex-col">
                <Image
                  src="/INDIA.svg"
                  width={532}
                  height={159}
                  alt="logo"
                />
                <div className="flex flex-col gap-10">
                  <div className='flex flex-col items-end'>
                    <div className='font-Archivo_Black text-4xl uppercase flex-nowrap archivo font-black text-[#046A38]'>For the Community</div>
                    <div className='font-Archivo_Black text-4xl uppercase archivo font-[800] text-[#ff641f]'>by the Community</div>
                  </div>
                  <div className='flex flex-col items-end'>
                    <div className='text-black'>Connecting passionate Django developers</div>
                    <div className='text-black'>especially from India to share, learn, and</div>
                    <div className='text-black pb-2'>grow together. </div>
                    <SignButton color="black" text="Subscribe" tcol="white"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;


// const HeroSection = () => {
//     return <>
//     <section className="w-full h-auto relative bg-[#f9f4ee]">
//         <div className="h-auto relative w-full flex justify-center items-center">
//         <Image
//         src="/HeroRight.png"
//         width={600}
//         height={400}
//         alt="hero"
//         className="object-contain scale-90 z-0 absolute -top-24 -right-20"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />

//         <Image
//         src="/HeroLeft.png"
//         width={200}
//         height={200}
//         alt="hero"
//         className="object-contain z-0 absolute left-0 top-60 md:top-40 xs:w-1/2 xs:h-auto"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />

//             <div className="max-w-[1200px] h-full z-10 xl:pt-16 pt:10 px-10 w-full gap-8 flex justify-center flex-col pb-10">
//                 <div className=" w-full h-40 justify-start"><Image
//                     src="/DJANGO.svg"
//                     width={816}
//                     height={164}
//                     alt="logo"
//                     className="scale-75 md:scale-100 "
//                     style={{ maxWidth: "100%", height: "auto" }}
//                 /></div>
//                 <div className=" w-full h-96 flex justify-center gap-8 flex-row items-center">
//                     <div className="h-full mx-auto ">
//                     <Image
//                         src="/03Heroimage.svg"
//                         width={532}
//                         height={159}
//                         alt="logo"
//                         className="mx-auto"
//                         style={{ maxWidth: "100%", height: "auto" }}
//                     />
//                     </div>
//                     <div className="h-full flex justify-end min-w-1/2 ">
//                     <div className="flex justify-start gap-20  flex-col">
//                     <Image
//                         src="/INDIA.svg"
//                         width={532}
//                         height={159}
//                         alt="logo"
//                         className=""
//                         // style={{ maxWidth: "100%", height: "auto" }}
//                     />
//                     <div className="flex flex-col gap-10">
//                     <div className='flex flex-col items-end'>
//                     <div className='font-Archivo_Black text-5xl font-black text-[#ff8ba1]'>For the Community</div>
//                     <div className='font-Archivo_Black text-5xl font-black text-[#ff8ba1]'>by the Community</div>
//                     </div>
//                     <div className='flex flex-col items-end'>
//                     <div className='text-black'>Connecting passionate Django developers</div>
//                     <div className='text-black'>especially from India to share, learn, and</div>
//                     <div className='text-black pb-2'>grow together. </div>
//                     <SignButton color="black" text="Subscribe" tcol="white"/>
//                     </div>
                    
//                     </div>
//                     </div>
                    
//                     </div>
//                 </div>

//             </div>
        
//         {/* <Image
//         src="/HeroRight.png"
//         width={600}
//         height={600}
//         alt="hero"
//         className="object-contain absolute md:right-0 -right-20 -top-10 xs:w-full "
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
//       <Image
//         src="/HeroLeft.png"
//         width={200}
//         height={200}
//         alt="hero"
//         className="object-contain absolute left-0 top-60 md:top-40 xs:w-1/2 xs:h-auto"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
//       <Image
//         src="/DJANGO.svg"
//         width={816}
//         height={164}
//         alt="logo"
//         className="absolute scale-75 md:scale-100 left-30 top-32 xs:w-3/4 xs:left-10 xs:top-24"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
//       <Image
//         src="/INDIA.svg"
//         width={532}
//         height={159}
//         alt="logo"
//         className="absolute right-30 top-80 md:right-60 md:top-80 xs:w-2/3 xs:right-10 xs:top-64"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
//       <Image
//         src="/INDIA.svg"
//         width={532}
//         height={159}
//         alt="logo"
//         className="absolute right-30 top-80 md:right-60 md:top-80 xs:w-2/3 xs:right-10 xs:top-64"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
//       <Image
//         src="/03Heroimage.svg"
//         width={532}
//         height={159}
//         alt="logo"
//         className="absolute scale-90 top-80 md:left-20 md:top-80 xs:w-2/3 xs:right-10 xs:top-64"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
    
//                 <div className='absolute flex justify-center gap-6 flex-col items-end right-60 top-1/3'>
//                     <div className='flex flex-col items-end'>
//                     <div className='font-Archivo_Black text-5xl font-black text-[#ff8ba1]'>For the Community</div>
//                     <div className='font-Archivo_Black text-5xl font-black text-[#ff8ba1]'>by the Community</div>
//                 </div>
//                 <div className='flex flex-col items-end'>
//                 <div className='text-black'>Connecting passionate Django developers</div>
//                 <div className='text-black'>especially from India to share, learn, and</div>
//                 <div className='text-black'>grow together. </div>
                
                
//                 </div>
                
          
//         </div> */}
//       </div>
//       {/* <section>
//       <Image
//         src="/whatIsDjango/Rectangle.svg"
//         alt="logo"
//         width={1920}
//         height={1080}
//         className="object-contain w-full h-auto"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
//         <Image
//         src="/whatIsDjango/glow.svg"
//         alt="logo"
//         width={1920}
//         height={1080}
//         className="absolute bottom-0 object-contain w-full h-auto"
//         style={{ maxWidth: "100%", height: "auto" }}
//       />
//         <Image
//         src="/whatIsDjango/mandala.svg"
//         alt="logo"
//         width={503}
//         height={578}
//         className="absolute scale-110  object-contain bottom-32 right-40"
//       />
      
//       </section> */}
//     </section>
    
//     </>;
// }
 
