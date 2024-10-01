'use client'

import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegisterEventForm } from './RegisterEvent.types'
import { API_ENDPOINTS, REGISTER_EVENT_FORM_SCHEMA } from '@constants'
import { REGISTER_FORM_FIELDS } from './RegisterEvent.config'
import { fetchData } from '@/utils'
import { enqueueSnackbar } from 'notistack'

export const RegisterEvent = ({ eventId }: { eventId: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    control,
    reset,
    formState: { errors, ...restFormState },
    handleSubmit,
    ...rest
  } = useForm<RegisterEventForm>({
    resolver: yupResolver(REGISTER_EVENT_FORM_SCHEMA),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      linkedin: '',
      organization: '',
      description: '',
    },
  })

  const onSubmit: SubmitHandler<RegisterEventForm> = async (data) => {
    const res = await fetchData<{ message: string }>(
      API_ENDPOINTS.registerEvent.replace(':id', eventId),
      {
        method: 'POST',
        body: JSON.stringify({
          event: eventId,
          ...data,
        }),
      },
    )
    if (res.statusCode === 200 || res.statusCode === 201) {
      enqueueSnackbar(res?.data?.message, { variant: 'success' })
    } else {
      enqueueSnackbar(res?.error?.message, {
        variant: 'error',
      })
    }
    reset()
    setIsOpen(false)
  }
  

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className='w-fit bg-blue-900 z-50' onClick={() => setIsOpen(true)}>
          Register
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-orange-50 bg-[url('/sprinkle.svg')] bg-cover h-full pb-8 z-50">
      <div className="overflow-auto no-scrollbar">
        <DrawerHeader>
          <DrawerTitle className='text-center text-4xl'>
            Register Now!
          </DrawerTitle>
          <DrawerDescription className='text-center'>
            Please fill the information carefully
          </DrawerDescription>
          <DrawerClose asChild>
            <Button className='absolute top-0 right-0 m-4 font-bold' variant='ghost'>
              ✕
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <Form
          register={register}
          control={control}
          reset={reset}
          formState={{ errors, ...restFormState }}
          handleSubmit={handleSubmit}
          {...rest}
        >
          <form
            className='sm:w-2/4 w-5/6 flex flex-col mx-auto gap-6 mt-10  h-full' // Added h-full and overflow-y-auto
            onSubmit={handleSubmit(onSubmit)}
          >
            {REGISTER_FORM_FIELDS.map((item, i) =>
              Array.isArray(item) ? (
                <div
                className='flex w-full justify-between gap-5'
                key={`field-group-${i}`}
              >
                  {item.map(({ name, label, placeholder, type, options }) => (
                    <div
                      className='grid w-full items-center gap-1.5'
                      key={name}
                    >
                      <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            {type === 'select' ? (
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {options.map(({ label, value }) => (
                                    <SelectItem key={value} value={value}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <FormControl>
                                <Input
                                  type={type}
                                  placeholder={placeholder}
                                  {...field}
                                />
                              </FormControl>
                            )}
                            <FormMessage>
                              {errors[name]?.message ?? ' '}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className='grid w-full items-center gap-1.5'
                  key={item.name}
                >
                  <FormField
                    control={control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        {item.type === 'select' ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={item.placeholder} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {item.options.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <FormControl>
                            <Input
                              type={item.type}
                              placeholder={item.placeholder}
                              {...field}
                            />
                          </FormControl>
                        )}
                        <FormMessage>
                          {errors[item.name]?.message ?? ' '}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              ),
            )}
            <DrawerFooter className='flex flex-row gap-4 mx-auto'>
              <Button type='submit'>Register</Button>
              <DrawerClose asChild>
                <Button
                  variant='outline'
                  onClick={() => {
                    reset()
                    setIsOpen(false)
                  }}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
