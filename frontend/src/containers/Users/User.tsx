import Image from 'next/image';
import Link from 'next/link';

import { fetchData } from '@/utils';
import { getAccessToken } from '@/utils/getAccesstoken';

import ChangePasswordForm from './ChangePasswordForm';
import { UserAvatar } from './UserAvatar';
import ProfileForm from './UserProfileForm';

export type UserData = {
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
  bio: string | null;
  about: string | null;
  website: string | null;
  linkedin: string | null;
  github: string | null;
  twitter: string | null;
  instagram: string | null;
  cover_image: string | null;
  country: string | null;
  organization: string | null;
  mastodon: string | null;
};

const UserContainer = async () => {
  const accessToken = await getAccessToken();

  const { data: userData } = await fetchData<UserData>('/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!userData) {
    return (
      <section className='container py-10'>
        <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center'>
          <h2 className='text-2xl font-semibold'>
            Your profile is temporarily unavailable due to some reason
          </h2>
          <p className='mt-2 text-zinc-600'>It will be available soon.</p>
          <Link
            href='/home'
            className='mt-5 inline-flex rounded-md bg-blue-900 px-4 py-2 font-semibold text-white'
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className='container py-10'>
      <div className='relative h-64 w-full rounded-2xl'>
        <Image
          src={userData.cover_image || 'https://picsum.photos/1300/250'}
          fill
          sizes='(max-width: 768px) 100vw, 1280px'
          alt='Profile Cover'
          objectFit='cover'
          className='rounded-2xl'
        />

        <UserAvatar
          avatarUrl={userData.avatar || 'https://github.com/shadcn.png'}
        />
      </div>
      <div className='mx-auto mt-36 flex w-full flex-col sm:w-4/5'>
        <h3 className='text-3xl font-bold'>
          {userData.first_name} {userData.last_name}
        </h3>
        <h3>@{userData.username}</h3>
        {/* Uncomment when API cahnges are done */}
        <span className='text-sm'>{userData.bio}</span>
        <ProfileForm userData={userData} />
        <ChangePasswordForm />
      </div>
    </section>
  );
};

export default UserContainer;
