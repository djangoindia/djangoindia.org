import { ReactNode } from 'react'

export const Modal = ({ onClose, children }: { onClose: () => void, children: ReactNode }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-lg p-8 bg-white rounded-lg shadow-lg'>
        <button onClick={onClose} className='absolute top-2 right-2'>
          Close
        </button>
        {children}
      </div>
    </div>
  )
}
