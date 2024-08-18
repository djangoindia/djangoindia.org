import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components'
import { DialogProps } from '@radix-ui/react-dialog'
import { RiEmotionLaughLine } from 'react-icons/ri'
import { RxCrossCircled } from 'react-icons/rx'
import { FetchResponse } from '@/utils'

const ResponseHandler = ({
  open,
  onClose,
  data,
}: {
  open: boolean
  onClose: DialogProps['onOpenChange']
  data: FetchResponse<unknown> | null
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className='sm:max-w-[530px] py-8'>
      <DialogHeader>
        {data?.data !== null && data?.data !== undefined ? (
          <DialogDescription>
            <RiEmotionLaughLine className='text-6xl mx-auto' />
            <h3 className='text-2xl font-bold text-center'>
              {data?.data?.message || 'Thanks for Subscribing to Us'}
            </h3>
            <p className='max-w-96 mx-auto text-center'>
              Your support means the world to us, and there are several ways you
              can help us grow and thrive
            </p>
          </DialogDescription>
        ) : (
          <DialogDescription>
            <RxCrossCircled
              className='text-6xl mx-auto'
              color='red'
              size={50}
            />
            <h3 className='text-2xl font-bold text-center text-red-500'>
              {data?.error?.message || 'Something went wrong'}
            </h3>
          </DialogDescription>
        )}
      </DialogHeader>
    </DialogContent>
  </Dialog>
)

export default ResponseHandler
