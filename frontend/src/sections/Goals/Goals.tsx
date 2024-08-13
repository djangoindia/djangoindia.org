'use client'
import Image from 'next/image'

const Goals = () => {
  return (
    <div className='max-w-7xl overflow-x-hidden mx-auto p-6 pb-20'>
      <h1 className='text-5xl font-black text-center archivo text-[#06038D] my-8'>
        Our Goals
      </h1>
      <div className='space-y-40'>
        <div className='flex flex-col md:flex-row  items-center justify-center mt-20 '>
          <Image
            src='/goals/learning.svg'
            alt='Learning'
            width={250}
            height={250}
            className='object-contain mx-8'
          />
          <div className='max-w-[570px]'>
            <h2 className='font-extrabold pb-4 text-3xl'>Learning</h2>
            <p className='text-gray-700 md:text-[24px] font-medium'>
              Foster an environment of knowledge sharing by organizing regular
              meetups, workshops, and webinars where members can learn from
              industry experts and peers.
            </p>
          </div>
          <div className='w-[250px] bg-red-500'></div>
        </div>

        <div className='flex flex-col-reverse md:flex-row items-center justify-center '>
          <div className='w-[250px] h-[250px] mx-8 hidden md:block'></div>
          <div className='max-w-[570px]'>
            <h2 className='font-extrabold pb-4 text-3xl'>Networking</h2>
            <p className='text-gray-700 md:text-[24px] font-medium'>
              Networking is another key goal, with a focus on facilitating
              events such as hackathons, conferences, and social gatherings to
              help developers connect and collaborate.
            </p>
          </div>
          <Image
            src='/goals/networking.svg'
            alt='Learning'
            width={250}
            height={250}
            className='object-contain'
          />
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center '>
          <Image
            src='/goals/Collaborative.svg'
            alt='Learning'
            width={250}
            height={250}
            className='object-contain mx-8'
          />
          <div className='max-w-[570px]'>
            <h2 className='font-extrabold pb-4 text-3xl'>
              Collaborative Projects
            </h2>
            <p className='text-gray-700 md:text-[24px] font-medium'>
              To promote collaborative projects, open-source initiatives and
              local development for the community. Recognizing and rewarding
              contributions to promote OSS.
            </p>
          </div>
          <div className='w-[250px] h-[250px] hidden md:block'></div>
        </div>

        <div className='flex flex-col-reverse md:flex-row items-center justify-center '>
          <div className='w-[250px] h-[250px] mx-8 hidden md:block'></div>
          <div className='max-w-[570px]'>
            <h2 className='font-extrabold pb-4 text-3xl'>Awareness</h2>
            <p className='text-gray-700 md:text-[24px] font-medium'>
              Spreading Django&apos;s benefits through talks, blogs, and social
              media, along with successful case studies, will drive its adoption
              in diverse industries.
            </p>
          </div>
          <Image
            src='/goals/aware.svg'
            alt='Learning'
            width={250}
            height={250}
            className='objext-contain'
          />
        </div>
      </div>
    </div>
  )
}
export default Goals
