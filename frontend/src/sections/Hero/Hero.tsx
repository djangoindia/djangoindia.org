'use client'

import Image from 'next/image'

const HeroSection = (): JSX.Element => {
  return (
    <section className='relative h-auto w-full bg-[#f9f4ee]'>
      <div className='relative flex w-full items-start justify-center overflow-hidden lg:h-[750px]'>
        <Image
          src='/HeroRight.png'
          width={600}
          height={400}
          alt='hero'
          className='absolute -right-20 -top-24 z-0 scale-90 object-contain'
        />

        <Image
          src='/HeroLeft.png'
          width={200}
          height={200}
          alt='hero'
          className=' absolute left-0 top-60 z-0 object-contain xs:h-auto md:top-40'
        />

        <div className='z-10 flex h-auto w-full max-w-screen-xl flex-col justify-center gap-8 p-10 xl:pt-16'>
          <div className='w-full justify-start md:h-40'>
            <Image
              src='/DJANGO.svg'
              width={816}
              height={164}
              alt='logo'
              className='pt-14 md:scale-100 md:pt-0'
            />
          </div>
          <div className='flex w-full flex-row items-center justify-center md:gap-8'>
            <div className='mx-auto h-full'>
              <Image
                src='/03Heroimage.svg'
                width={532}
                height={159}
                alt='logo'
                className='mx-auto hidden md:block'
              />
            </div>
            <div className='flex h-full min-w-[50%] justify-start'>
              <div className='flex flex-col justify-start gap-20'>
                <Image src='/INDIA.svg' width={532} height={159} alt='logo' />
                <div className='flex flex-col gap-10'>
                  <div className='flex flex-col items-end text-right'>
                    <div className='archivo flex-nowrap text-4xl font-black uppercase text-[#046A38]'>
                      For the Community
                    </div>
                    <div className='archivo text-4xl font-[800] uppercase text-[#ff641f]'>
                      by the Community
                    </div>
                  </div>
                  <div className='flex flex-col text-right md:items-end'>
                    <div className='text-black'>
                      Connecting <strong>Django</strong> developers
                    </div>
                    <div className='text-black'>
                      from India & across the globe, to
                    </div>
                    <div className='pb-2 text-black'> share, learn, and grow <strong>together.</strong></div>
                    {/* <Button>Subscribe</Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
