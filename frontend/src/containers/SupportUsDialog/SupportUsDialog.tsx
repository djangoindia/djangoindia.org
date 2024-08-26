import React from 'react'

import { DialogTriggerProps } from '@radix-ui/react-dialog'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components'

const SupportUsDialog = ({
  onClose,
}: {
  onClose?: DialogTriggerProps['onClick']
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild onClick={onClose}>
        <Button className='text-xs md:text-base'>Support Us</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[730px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Support Us</DialogTitle>
          <DialogDescription>
            Your support means the world to us, and there are several ways you
            can help us grow and thrive:
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div>
            <h6 className='inline-flex items-center gap-2 text-base font-bold'>
              Give Us a Shoutout
              <Link
                href='https://www.linkedin.com/company/djangoindia'
                target='_blank'
              >
                <FaExternalLinkAlt />
              </Link>
            </h6>
            <p className='text-sm'>
              Spread the word! Share our community on social media and let
              others know about the exciting things we’re doing together.
            </p>
          </div>
          <div>
            <h6 className='inline-flex items-center gap-2 text-base font-bold'>
              Star Our Repo
              <Link
                href='https://github.com/djangoindia/djangoindia.org'
                target='_blank'
              >
                <FaExternalLinkAlt />
              </Link>
            </h6>
            <p className='text-sm'>
              Show your love by starring our GitHub repository. It helps us gain
              visibility and attracts more contributors.
            </p>
          </div>
          <div>
            <h6 className='inline-flex items-center gap-2 text-base font-bold'>
              Contribute on GitHub
              <Link
                href='https://github.com/djangoindia/djangoindia.org/issues'
                target='_blank'
              >
                <FaExternalLinkAlt />
              </Link>
            </h6>
            <p className='text-sm'>
              Have a knack for coding? We’d love your contributions! Whether
              it’s fixing bugs, adding new features, or improving our
              documentation, every bit helps.
            </p>
          </div>
        </div>
        <DialogFooter>
          Thank you for being an integral part of our journey. Together, we’re
          building something amazing!
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SupportUsDialog
