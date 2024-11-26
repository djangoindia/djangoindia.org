'use client';
import React, { useEffect, useState } from 'react';

import { FaCity, FaGithub, FaUsers } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

// Define props type for StatCard component
interface StatCardProps {
  title: string;
  subText: string;
  startCount: number;
  count: number;
  icon: React.ReactNode;
}

export const DataCard = () => {
  return (
    <div className='grid w-full items-center justify-center gap-6 p-8 md:grid-cols-2 lg:grid-cols-3'>
      <StatCard
        title='Active Contributors'
        subText='& counting till date'
        startCount={0}
        count={20}
        icon={<FaCity className='text-[2rem]' />}
      />
      <StatCard
        title='Subscribers'
        subText='loving Django India'
        startCount={10}
        count={100}
        icon={<FaUsers className='text-[3rem]' />}
      />
      <StatCard
        title='GitHub Stars'
        subText='till date'
        startCount={0}
        count={70}
        icon={<FaGithub className='text-[2rem]' />}
      />
    </div>
  );
};

// Define StatCard component with props typed
const StatCard: React.FC<StatCardProps> = ({
  title,
  subText,
  count,
  startCount,
  icon,
}) => {
  const [number, setNumber] = useState(startCount);
  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  const intervalTime = count === 31818 ? 1 : 100;

  useEffect(() => {
    let start = startCount;
    const interval = setInterval(() => {
      if (start <= count) {
        setNumber(start);
        start += 1;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);
    return () => {
      clearInterval(interval);
    };
  }, [inView, startCount, count, intervalTime]);

  return (
    <div
      ref={ref}
      className='flex items-center rounded-lg border border-gray-400 p-4'
    >
      <div className='flex size-16 shrink-0 items-center justify-center rounded bg-green-500'>
        {icon}
      </div>
      <div className='ml-4 flex grow flex-col'>
        <span className='text-4xl font-bold'>
          {count === 50 ? '' : ''}
          {inView ? number : 0}+
        </span>
        <span className='text-xl font-bold'>{title}</span>
        <div className='flex items-center justify-between'>
          <span className='font-bold'>{subText}</span>
        </div>
      </div>
    </div>
  );
};
