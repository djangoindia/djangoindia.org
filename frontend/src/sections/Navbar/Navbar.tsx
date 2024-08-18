'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { SupportUsDialog } from '@/containers'
import useWidth from '@/hooks/useWidth'
import { APP_ROUTES } from '@/constants'

const Drawer = ({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean
  onClose: () => void
  pathname: string
}) => {
  return (
    <div
      className={`bg-[#8796a4] fixed inset-0 z-50 flex flex-col p-4 justify-between items-top text-black transition-transform w-full sm:w-1/2 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className='flex flex-col items-center'>
        <button onClick={onClose}>
          <CrossIcon />
        </button>
        <Link
          href={APP_ROUTES.home}
          className={`py-3 ${pathname === APP_ROUTES.home && 'font-semibold'}`}
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          href={APP_ROUTES.events}
          className={`py-3 ${pathname === APP_ROUTES.events && 'font-semibold'}`}
          onClick={onClose}
        >
          Events
        </Link>
        <Link
          href={APP_ROUTES.contactUs}
          className={`py-3 ${pathname === APP_ROUTES.contactUs && 'font-semibold'}`}
          onClick={onClose}
        >
          Contact Us
        </Link>
        <div className='py-3'>
          <SupportUsDialog onClose={onClose} />
        </div>
      </div>
      <Image
        src='/whatIsDjango/Logo.svg'
        width={200}
        height={42}
        alt='logo'
        className=' object-center py-3 mt-auto mx-auto'
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
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
)
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
)

const Navbar = () => {
  const pathname = usePathname() //current pathname
  const width = useWidth()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = isDrawerOpen ? 'unset' : 'hidden'
    }
  }

  return (
    <>
      <section className='h-full w-full relative bg-[#C1CAD2]'>
        <div className='h-12 md:h-20 w-full flex justify-around items-center'>
          {/* logo  */}
          <div className='hidden md:flex items-center justify-center '>
            <Image
              src='/whatIsDjango/Logo.svg'
              width={121}
              height={42}
              alt='logo'
              className=' object-center'
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>

          {/* menu */}
          {width > 786 ? (
            <>
              <div className='flex font-semibold gap-5 md:gap-16 text-xs md:text-base text-black justify-center items-center'>
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
              <SupportUsDialog />
            </>
          ) : (
            <button onClick={toggleDrawer} className='md:hidden mr-auto ml-5'>
              {/* Hamburger icon */}
              <HamburgerMenuIcon />
            </button>
          )}
          <Drawer
            isOpen={isDrawerOpen}
            onClose={toggleDrawer}
            pathname={pathname}
          />
        </div>
      </section>
    </>
  )
}

export default Navbar
