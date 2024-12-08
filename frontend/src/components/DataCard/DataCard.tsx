'use client';
import React, { useEffect, useState } from 'react';

import { FaCity, FaGithub, FaUsers } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { url, requestOptions } from './apiDataCard';

// Define props type for StatCard component
interface StatCardProps {
  title: string;
  subText: string;
  startCount: number;
  count: number;
  icon: React.ReactNode;
}




export const DataCard = () => {
  const [dataCount, setDataCount] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchStargazerCount(url1: string, url2: string, options: object): Promise<any> {
      try {
        if (url1 && url2) {
          let res = await fetch(url1, options);
          let res2 = await fetch(url2, options);
          let data = await res.json();
          let data2 = await res2.json();
          setDataCount({stargazers_count: Number(data.stargazers_count), subscribers_count: Number( data.subscribers_count), contributors_count: Number(data2.length)});
          setLoading(false);
        }

      }
      catch(err){
          console.log('Error:', err)
      }
    }
    if (loading){
      fetchStargazerCount(url.stargazers_subs_count, url.contributors, requestOptions.options);
    }
    
  },[])

  return (
    <div className='grid w-full items-center justify-center gap-6 p-8 md:grid-cols-2 lg:grid-cols-3'>
      <StatCard
        title='Active Contributors'
        subText='& counting to date'
        startCount={0}
        count={dataCount.contributors_count}
        icon={<FaCity className='text-[2rem]' />}
      />
      <StatCard
        title='Subscribers'
        subText='loving Django India'
        startCount={0}
        count={dataCount.subscribers_count}
        icon={<FaUsers className='text-[3rem]' />}
      />
      <StatCard
        title='GitHub Stars'
        subText='to date'
        startCount={0}
        count={dataCount.stargazers_count}
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
          {inView ? number : 0}
        </span>
        <span className='text-xl font-bold'>{title}</span>
        <div className='flex items-center justify-between'>
          <span className='font-bold'>{subText}</span>
        </div>
      </div>
    </div>
  );
};
