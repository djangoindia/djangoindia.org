import React from 'react'

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@components'

export const RegisterEvent = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='w-fit bg-blue-900' disabled>
          Register
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full bg-orange-50 bg-[url('/sprinkle.svg')] bg-cover">
        <DrawerHeader>
          <DrawerTitle className='text-center text-4xl'>
            Register Now!
          </DrawerTitle>
          <DrawerDescription className='text-center'>
            Please fill the information carefully
          </DrawerDescription>
        </DrawerHeader>
        <form className='mx-auto mt-10 flex w-2/4 flex-col gap-6'>
          <div className='flex w-full justify-between gap-5'>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='firstName'>First Name</Label>
              <Input
                type='text'
                id='firstName'
                placeholder='Enter your first Name'
              />
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input
                type='text'
                id='lastName'
                placeholder='Enter your last Name'
              />
            </div>
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' placeholder='Enter your email' />
          </div>
          <div className='flex w-full justify-between gap-5'>
            <div className='grid w-full items-center'>
              <RadioGroup className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                  <RadioGroupItem value='male' id='r1' />
                  <Label className='mb-0' htmlFor='r1'>
                    Male
                  </Label>
                </div>
                <div className='flex items-center gap-2'>
                  <RadioGroupItem value='female' id='r2' />
                  <Label className='mb-0' htmlFor='r2'>
                    Female
                  </Label>
                </div>
                <div className='flex items-center gap-2'>
                  <RadioGroupItem value='other' id='r3' />
                  <Label className='mb-0' htmlFor='r3'>
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='mobile'>Mobile</Label>
              <Input
                type='number'
                id='mobile'
                placeholder='Enter your mobile'
              />
            </div>
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='Occupation'>Occupation</Label>
            <Input
              type='text'
              id='Occupation'
              placeholder='Enter your occupation'
            />
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='linkedin'>LinkedIn</Label>
            <Input
              type='text'
              id='linkedin'
              placeholder='Enter your linkedin id'
            />
          </div>
          <div className='flex w-full justify-between gap-5'>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='github'>Github</Label>
              <Input type='text' id='github' placeholder='Enter your github' />
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='twitter'>Twitter</Label>
              <Input
                type='text'
                id='twitter'
                placeholder='Enter your twitter'
              />
            </div>
          </div>
          <DrawerFooter className='mx-auto flex flex-row gap-4'>
            <Button>Register</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
