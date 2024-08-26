'use client'
import Image from 'next/image'

const Goals = () => {
  return (
    <div className='mx-auto max-w-7xl overflow-x-hidden p-6 pb-20'>
      <h1 className='archivo my-8 text-center text-5xl font-black text-[#06038D]'>
        Our Goals
      </h1>
      <div className='space-y-40'>
        <div className='mt-20 flex flex-col  items-center justify-center md:flex-row '>
          <Image
            src='/goals/learning.svg'
            alt='Learning'
            width={250}
            height={250}
            className='mx-8 object-contain'
          />
          <div className='max-w-[570px]'>
            <h2 className='pb-4 text-3xl font-extrabold'>Learning</h2>
            <p className='font-medium text-gray-700 md:text-[24px]'>
              Foster an environment of knowledge sharing by organizing regular
              meetups, workshops, and webinars where members can learn from
              industry experts and peers.
            </p>
          </div>
          <div className='w-[250px] bg-red-500'></div>
        </div>

        <div className='flex flex-col-reverse items-center justify-center md:flex-row '>
          <div className='mx-8 hidden size-[250px] md:block'></div>
          <div className='max-w-[570px]'>
            <h2 className='pb-4 text-3xl font-extrabold'>Networking</h2>
            <p className='font-medium text-gray-700 md:text-[24px]'>
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

        <div className='flex flex-col items-center justify-center md:flex-row '>
          <Image
            src='/goals/Collaborative.svg'
            alt='Learning'
            width={250}
            height={250}
            className='mx-8 object-contain'
          />
          <div className='max-w-[570px]'>
            <h2 className='pb-4 text-3xl font-extrabold'>
              Collaborative Projects
            </h2>
            <p className='font-medium text-gray-700 md:text-[24px]'>
              To promote collaborative projects, open-source initiatives and
              local development for the community. Recognizing and rewarding
              contributions to promote OSS.
            </p>
          </div>
          <div className='hidden size-[250px] md:block'></div>
        </div>

        <div className='flex flex-col-reverse items-center justify-center md:flex-row '>
          <div className='mx-8 hidden size-[250px] md:block'></div>
          <div className='max-w-[570px]'>
            <h2 className='pb-4 text-3xl font-extrabold'>Awareness</h2>
            <p className='font-medium text-gray-700 md:text-[24px]'>
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
