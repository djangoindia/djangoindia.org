'use client';

import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { type SubmitHandler, useForm } from 'react-hook-form';

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components';
import { API_ENDPOINTS, REGISTER_EVENT_FORM_SCHEMA } from '@constants';
import { dayjsWithTZ } from '@utils';

import { fetchData } from '@/utils';

import { REGISTER_FORM_FIELDS } from './RegisterEvent.config';

import type { RegisterEventForm } from './RegisterEvent.types';

export const RegisterEvent = ({
  eventId,
  seats_left,
  registration_end_date,
}: {
  eventId: string;
  seats_left: number;
  registration_end_date: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      include_in_attendee_list: false,
    },
  });

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
    );
    if (res.statusCode === 200 || res.statusCode === 201) {
      enqueueSnackbar(res?.data?.message, { variant: 'success' });
    } else {
      enqueueSnackbar(res?.error?.message, {
        variant: 'error',
      });
    }
    reset();
    setIsOpen(false);
  };

  const currentDate = dayjsWithTZ();
  const registrationEndDate = dayjsWithTZ(registration_end_date);
  const isRegistrationOpen =
    seats_left > 0 && currentDate.isBefore(registrationEndDate);
  const isFull = seats_left === 0;

  let buttonText = 'Registration closed';
  if (isRegistrationOpen) {
    buttonText = 'Register';
  } else if (isFull) {
    buttonText = 'Housefull!';
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {seats_left && registration_end_date && (
          <Button
            className='z-50 w-fit bg-blue-900'
            onClick={() => isRegistrationOpen && setIsOpen(true)}
            disabled={!isRegistrationOpen}
          >
            {buttonText}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="z-50 h-full bg-orange-50 bg-[url('/sprinkle.svg')] bg-cover pb-8">
        <div className='no-scrollbar overflow-auto'>
          <DrawerHeader>
            <DrawerTitle className='text-center text-4xl'>
              Register Now!
            </DrawerTitle>
            <DrawerDescription className='text-center'>
              Please fill the information carefully
            </DrawerDescription>
            <DrawerClose asChild>
              <Button
                className='absolute right-0 top-0 m-4 font-bold'
                variant='ghost'
              >
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
              className='mx-auto mt-10 flex h-full w-5/6 flex-col gap-6 sm:w-2/4'
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
                              {type === 'checkbox' ? (
                                <div className='flex items-center gap-0'>
                                  <FormControl>
                                    <Input
                                      type='checkbox'
                                      onChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className='mb-0'>
                                    {label}
                                  </FormLabel>
                                </div>
                              ) : (
                                <>
                                  <FormLabel>{label}</FormLabel>
                                  {type === 'select' ? (
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={String(field.value)}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue
                                            placeholder={placeholder}
                                          />
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
                                        onChange={field.onChange}
                                      />
                                    </FormControl>
                                  )}
                                </>
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
                              defaultValue={String(field.value)}
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
                                onChange={field.onChange}
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
              <DrawerFooter className='mx-auto flex flex-row gap-4'>
                <Button type='submit'>Register</Button>
                <DrawerClose asChild>
                  <Button
                    variant='outline'
                    onClick={() => {
                      reset();
                      setIsOpen(false);
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
  );
};
