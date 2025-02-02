import Image from 'next/image';

import { fetchData } from '@/utils';
import { getAccessToken } from '@/utils/getAccesstoken';

import { UserAvatar } from './UserAvatar';

import type { PageProps } from '@/types/common';

type UserData = {
  id: number;
  avatar: string | null;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_email_verified: boolean;
  is_onboarded: boolean;
  mobile_number: number | null;
  user_timezone: string;
  username: string;
  is_password_autoset: boolean;
  gender: string;
  organization: string | null;
};

const UserContainer = async ({
  params: { userId },
}: PageProps<never, { userId: string }>) => {
  const accessToken = await getAccessToken();

  const { data: userData } = await fetchData<UserData>('/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(userData);

  return (
    <section className='container py-10'>
      <div className='relative h-64 w-full rounded-2xl'>
        <Image
          src='https://picsum.photos/1300/250'
          fill
          alt='Profile Cover'
          objectFit='cover'
          className='rounded-2xl'
        />
        <UserAvatar avatarUrl={userData?.avatar} />
      </div>
      <div className='mt-36 flex flex-col'>
        <h3 className='text-3xl font-bold'>{userData?.username}</h3>
        {/* Uncomment when API cahnges are done */}
        {/* <span className='text-sm'>Senior Frontend Developer @JTG</span>
        <span className='text-xs'>Gurugram, India</span> */}
      </div>
    </section>
  );
};

export default UserContainer;
