import React from 'react'

import { DialogProps } from '@radix-ui/react-dialog'
import { RiEmotionLaughLine } from 'react-icons/ri'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components'

const Thanks = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: DialogProps['onOpenChange']
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className='py-8 sm:max-w-[530px]'>
      <DialogHeader>
        <DialogDescription>
          <RiEmotionLaughLine className='mx-auto text-6xl' />
          <h3 className='text-center text-2xl font-bold'>
            Thanks for Contacting Us
          </h3>
          <p className='mx-auto max-w-96 text-center'>
            Your support means the world to us, and there are several ways you
            can help us grow and thrive
          </p>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
)

export default Thanks
