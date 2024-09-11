'use client'
import Image from 'next/image'

const Goals = () => {
  return (
    <div className='max-w-7xl overflow-x-hidden mx-auto p-6 pb-20'>
      <h1 className='text-5xl font-black text-center archivo text-[#06038D] my-8'>
        Our Goals
      </h1>
      <div className='space-y-40'>
        {/* Goal 1 - Learning */}
        <div className='flex flex-col md:flex-row items-center justify-center mt-20 p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-all duration-300'>
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
        </div>

        {/* Goal 2 - Networking */}
        <div className='flex flex-col-reverse md:flex-row items-center justify-center p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-all duration-300'>
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
            alt='Networking'
            width={250}
            height={250}
            className='object-contain mx-8'
          />
        </div>

        {/* Goal 3 - Collaborative Projects */}
        <div className='flex flex-col md:flex-row items-center justify-center p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-all duration-300'>
          <Image
            src='/goals/Collaborative.svg'
            alt='Collaborative Projects'
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
        </div>

        {/* Goal 4 - Awareness */}
        <div className='flex flex-col-reverse md:flex-row items-center justify-center p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-all duration-300'>
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
            alt='Awareness'
            width={250}
            height={250}
            className='object-contain mx-8'
          />
        </div>
      </div>
    </div>
  )
}

export default Goals
