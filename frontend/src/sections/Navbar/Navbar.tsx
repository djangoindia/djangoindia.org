'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components';
import { APP_ROUTES } from '@/constants';
import { SupportUsDialog } from '@/containers';
import useWidth from '@/hooks/useWidth';

const Drawer = ({
  isOpen,
  onClose,
  pathname,
  status,
  router,
  session,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  status: string;
  router: any;
  session: any;
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex w-80 flex-col bg-[#F2ECE4] p-6 text-[#1e3a8a] shadow-2xl shadow-[#1e3a8a]/40 transition-all duration-300 ease-in-out${isOpen ? ' translate-x-0' : ' -translate-x-full'}`}
    >
      <div className='mb-6 flex items-center justify-between'>
        <Image
          src='/whatIsDjango/Logo.svg'
          width={100}
          height={35}
          alt='Django India Logo'
        />
        <button
          onClick={onClose}
          className='rounded-full p-2 transition-colors hover:bg-[#1e3a8a]/10'
        >
          <CrossIcon />
        </button>
      </div>

      <nav className='grow space-y-2'>
        {[
          { route: APP_ROUTES.home, label: 'Home' },
          { route: APP_ROUTES.events, label: 'Events' },
          { route: APP_ROUTES.gallery, label: 'Gallery' },
          {
            route: APP_ROUTES.sponsorsAndPartners,
            label: 'Sponsors and Partners',
          },
          { route: APP_ROUTES.contactUs, label: 'Contact Us' },
        ].map(({ route, label }) => (
          <Link
            key={route}
            href={route}
            className={`
              block rounded-lg px-4 py-3 transition-all duration-200 
              ${
                pathname === route
                  ? 'bg-[#1e3a8a]/10 font-semibold text-[#1e3a8a]'
                  : 'text-[#1e3a8a]/70 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a]'
              }
            `}
            onClick={onClose}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className='mt-auto w-full space-y-4 border-t border-[#1e3a8a]/20 py-3'>
        {status === 'authenticated' ? (
          <DropdownMenu>
            <DropdownMenuContent className='mb-2 min-w-64'>
              <DropdownMenuItem onClick={() => router.push('/users/me')}>
                My Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: '/home' })}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center justify-between rounded-lg bg-[#1e3a8a]/5 p-3'>
                <div className='flex items-center gap-3'>
                  <Avatar className='border-2 border-[#F2ECE4]'>
                    <AvatarImage
                      src={
                        session?.user?.image || 'https://github.com/shadcn.png'
                      }
                    />
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0) || 'DU'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-sm font-medium text-[#1e3a8a]'>
                      {session?.user?.name ||
                        session?.user?.email?.split('@')[0]}
                    </p>
                    <p className='text-xs text-[#1e3a8a]/70'>
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
                <button className='rounded-full p-2 hover:bg-[#1e3a8a]/10'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <circle cx='12' cy='7' r='1' />
                    <circle cx='12' cy='12' r='1' />
                    <circle cx='12' cy='17' r='1' />
                  </svg>
                </button>
              </div>
            </DropdownMenuTrigger>
          </DropdownMenu>
        ) : (
          <Button
            variant='outline'
            onClick={() => router.replace('/login')}
            className='w-full'
          >
            Login
          </Button>
        )}
        <SupportUsDialog onClose={onClose} />
      </div>
    </div>
  );
};

const HamburgerMenuIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect x='3' y='6' width='18' height='2' fill='currentColor' />
    <rect x='3' y='11' width='18' height='2' fill='currentColor' />
    <rect x='3' y='16' width='18' height='2' fill='currentColor' />
  </svg>
);
const CrossIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <line
      x1='4.93'
      y1='4.93'
      x2='19.07'
      y2='19.07'
      stroke='currentColor'
      strokeWidth='2'
    />
    <line
      x1='4.93'
      y1='19.07'
      x2='19.07'
      y2='4.93'
      stroke='currentColor'
      strokeWidth='2'
    />
  </svg>
);

const Navbar = () => {
  const { data: session, status } = useSession();

  const pathname = usePathname(); //current pathname
  const width = useWidth();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window !== 'undefined' && window.document) {
      document.body.style.overflow = isDrawerOpen ? 'unset' : 'hidden';
    }
  };

  return (
    <>
      <section className='relative size-full bg-[#C1CAD2]'>
        <div className='flex h-12 w-full items-center justify-around md:h-20'>
          {/* logo  */}
          <div className='hidden items-center justify-center md:flex'>
            <Link href='/' passHref>
              <Image
                src='/whatIsDjango/Logo.svg'
                width={121}
                height={42}
                alt='logo'
                className='h-full max-w-full object-center'
              />
            </Link>
          </div>

          {/* menu */}
          {width > 750 ? (
            <>
              <div className='flex items-center justify-center gap-5 text-xs font-semibold text-black md:gap-16 md:text-base'>
                <Link
                  href={APP_ROUTES.home}
                  className={`py-5 ${
                    pathname === APP_ROUTES.home
                      ? 'border-b-2 border-black'
                      : 'hover:border-b-2 hover:border-black'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href={APP_ROUTES.events}
                  className={`py-5 ${
                    pathname === APP_ROUTES.events
                      ? 'border-b-2 border-black'
                      : 'hover:border-b-2 hover:border-black'
                  }`}
                >
                  Events
                </Link>
                <Link
                  href={APP_ROUTES.gallery}
                  className={`py-5 ${
                    pathname === APP_ROUTES.gallery
                      ? 'border-b-2 border-black'
                      : 'hover:border-b-2 hover:border-black'
                  }`}
                >
                  Gallery
                </Link>
                <Link
                  href={APP_ROUTES.sponsorsAndPartners}
                  className={`py-5 ${
                    pathname === APP_ROUTES.sponsorsAndPartners
                      ? 'border-b-2 border-black'
                      : 'hover:border-b-2 hover:border-black'
                  }`}
                >
                  Sponsors and partners
                </Link>
                <Link
                  href={APP_ROUTES.contactUs}
                  className={`py-5 ${
                    pathname === APP_ROUTES.contactUs
                      ? 'border-b-2 border-black'
                      : 'hover:border-b-2 hover:border-black'
                  }`}
                >
                  Contact Us
                </Link>
              </div>
              <div className='flex gap-4'>
                <SupportUsDialog />
                {status === 'authenticated' ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className='cursor-pointer border-2 border-[#F2ECE4]'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>DU</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => router.push('/users/me')}
                      >
                        My Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          signOut({
                            callbackUrl: '/home',
                          })
                        }
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant='outline'
                    onClick={() => router.replace('/login')}
                  >
                    Login
                  </Button>
                )}
              </div>
            </>
          ) : (
            <button onClick={toggleDrawer} className='ml-5 mr-auto'>
              {/* Hamburger icon */}
              <HamburgerMenuIcon />
            </button>
          )}
          <Drawer
            isOpen={isDrawerOpen}
            onClose={toggleDrawer}
            pathname={pathname}
            status={status}
            router={router}
            session={session}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;
