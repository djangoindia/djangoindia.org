import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components'
import { DialogProps } from '@radix-ui/react-dialog'
import { RiEmotionLaughLine } from 'react-icons/ri'

const Thanks = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: DialogProps['onOpenChange']
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className='sm:max-w-[530px] py-8'>
      <DialogHeader>
        <DialogDescription>
          <RiEmotionLaughLine className='text-6xl mx-auto' />
          <h3 className='text-2xl font-bold text-center'>
            Thanks for Subscribing to Us
          </h3>
          <p className='max-w-96 mx-auto text-center'>
            Your support means the world to us, and there are several ways you
            can help us grow and thrive
          </p>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
)

export default Thanks
