'use client'

import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input, Label, Textarea } from '@components'
import { API_ENDPOINTS, CONTACT_US_FORM_SCHEMA } from '@constants'
import { fetchData } from '@utils'

import { ContactUsForm } from './ContactUs.types'

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsForm>({
    resolver: yupResolver(CONTACT_US_FORM_SCHEMA),
  })

  const onSubmit: SubmitHandler<ContactUsForm> = async (data) => {
    const res = await fetchData<{ message: string }>(API_ENDPOINTS.contactUs, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (res.statusCode === 200 || res.statusCode === 201) {
      enqueueSnackbar(res?.data?.message, { variant: 'success' })
    } else {
      enqueueSnackbar(res?.error?.message, {
        variant: 'error',
      })
    }
    reset()
  }

  return (
    <>
      <div className='container'>
        <h2 className='mb-6 mt-12 text-6xl font-bold text-blue-900'>
          Contact Us
        </h2>
        <hr />
        <p className='my-6'>
          Have a question or want to collaborate? We&#39;d love to hear from
          you! Fill out the form below or reach out to us directly at
          admin@djangoindia.org. We look forward to connecting with you!
        </p>
        <form
          className='mx-auto my-16 flex max-w-2xl flex-col gap-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex w-full flex-col justify-between gap-5 sm:flex-row'>
            <div className='grid w-full items-center gap-1.5'>
              <Label
                htmlFor='firstName'
                className={`${errors.first_name ? 'text-red-500' : ''}`}
              >
                First Name
              </Label>
              <Input
                {...register('first_name', { required: true })}
                type='text'
                placeholder='Enter your first Name'
                className={`${errors.first_name ? 'text-color-500 !outline-red-500' : ''}`}
              />
              <p className='h-[20px] text-sm text-red-500'>
                {errors.first_name?.message ?? ' '}
              </p>
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label
                htmlFor='lastName'
                className={`${errors.last_name ? 'text-red-500' : ''}`}
              >
                Last Name
              </Label>
              <Input
                {...register('last_name', { required: true })}
                type='text'
                id='lastName'
                placeholder='Enter your last Name'
                className={`${errors.last_name ? 'text-color-500 !outline-red-500' : ''}`}
              />
              <p className='h-[20px] text-sm text-red-500'>
                {errors.last_name?.message ?? ' '}
              </p>
            </div>
          </div>
          <div className='grid w-full items-center gap-1.5'>
            <Label
              htmlFor='email'
              className={`${errors.email ? 'text-red-500' : ''}`}
            >
              Email
            </Label>
            <Input
              {...register('email', { required: true })}
              type='email'
              id='email'
              placeholder='Enter your email'
              className={`${errors.email ? 'text-color-500 !outline-red-500' : ''}`}
            />
            <p className='h-[20px] text-sm text-red-500'>
              {errors.email?.message ?? ' '}
            </p>
          </div>
          <div className='grid w-full gap-1.5'>
            <Label
              htmlFor='message'
              className={`${errors.message ? 'text-red-500' : ''}`}
            >
              Your message
            </Label>
            <Textarea
              rows={10}
              {...register('message', { required: true })}
              placeholder='Type your message here.'
              id='message'
              className={`${errors.message ? 'text-color-500 !outline-red-500' : ''}`}
            />
            <p className='h-[20px] text-sm text-red-500'>
              {errors.message?.message ?? ' '}
            </p>
          </div>
          <Button type='submit'>Submit</Button>
        </form>
        {/* <div className='my-16 bg-yellow-50 rounded-2xl shadow-lg'>
          <div className='flex flex-col gap-5 p-10'>
            <h4 className='text-2xl text-center font-bold text-blue-900'>
              Ask us Anything
            </h4>
            <p className='text-center'>
              Have any questions? We&#39;re here to assist you.
            </p>
            <Input
              type='email'
              id='email'
              placeholder='Search'
              className='w-full md:w-1/4 mx-auto'
            />
          </div>
          <div className='bg-white py-14'>
            <div className='grid grid-rows-2 grid-cols-3 gap-10 mx-auto w-3/4'>
              <div className='flex flex-col gap-2 items-start col-span-3 md:col-span-1'>
                <div className='bg-orange-200 p-2 rounded-full'>
                  <CiMail className='text-orange-500 text-2xl' />
                </div>
                <h6 className='text-lg font-semibold text-slate-500'>
                  How do I change my account email?
                </h6>
                <p className='text-sm'>
                  You can log in to your account and change it from your Profile
                  Edit Profile. Then go to the general tab to change your email.
                </p>
              </div>
              <div className='flex flex-col gap-2 items-start col-span-3 md:col-span-1'>
                <div className='bg-orange-200 p-2 rounded-full'>
                  <CiCreditCard1 className='text-orange-500 text-2xl' />
                </div>
                <h6 className='text-lg font-semibold text-slate-500'>
                  What should I do if my payment fails?
                </h6>
                <p className='text-sm'>
                  If your payment fails, you can use the (COD) payment option,
                  if available on that order. If your payment is debited from
                  your account after a payment failure, it will be credited back
                  within 7-10 days.
                </p>
              </div>
              <div className='flex flex-col gap-2 items-start col-span-3 md:col-span-1'>
                <div className='bg-orange-200 p-2 rounded-full'>
                  <CiReceipt className='text-orange-500 text-2xl' />
                </div>
                <h6 className='text-lg font-semibold text-slate-500'>
                  What is your cancellation policy?
                </h6>
                <p className='text-sm'>
                  You can now cancel an order when it is in packed/shipped
                  status. Any amount paid will be credited into the same payment
                  mode using which the payment was made
                </p>
              </div>
              <div className='flex flex-col gap-2 items-start col-span-3 md:col-span-1'>
                <div className='bg-orange-200 p-2 rounded-full'>
                  <CiDeliveryTruck className='text-orange-500 text-2xl' />
                </div>
                <h6 className='text-lg font-semibold text-slate-500'>
                  How do I check order delivery status ?
                </h6>
                <p className='text-sm'>
                  Please tap on “My Orders” section under main menu of
                  App/Website/M-site to check your order status.
                </p>
              </div>
              <div className='flex flex-col gap-2 items-start col-span-3 md:col-span-1'>
                <div className='bg-orange-200 p-2 rounded-full'>
                  <CiBag1 className='text-orange-500 text-2xl' />
                </div>
                <h6 className='text-lg font-semibold text-slate-500'>
                  What is Instant Refunds?
                </h6>
                <p className='text-sm'>
                  Upon successful pickup of the return product at your doorstep,
                  Myntra will instantly initiate the refund to your source
                  account or chosen method of refund. Instant Refunds is not
                  available in a few select pin codes and for all self ship
                  returns.
                </p>
              </div>
              <div className='flex flex-col gap-2 items-start col-span-3 md:col-span-1'>
                <div className='bg-orange-200 p-2 rounded-full'>
                  <CiShoppingTag className='text-orange-500 text-2xl' />
                </div>
                <h6 className='text-lg font-semibold text-slate-500'>
                  How do I apply a coupon on my order?
                </h6>
                <p className='text-sm'>
                  You can apply a coupon on cart page before order placement.
                  The complete list of your unused and valid coupons will be
                  available under “My Coupons” tab of App/Website/M-site.
                </p>
              </div>
            </div>
            <div className='p-5 rounded-2xl bg-yellow-50 w-4/5 md:w-2/4 mx-auto mt-10 flex flex-col md:flex-row justify-between	items-center gap-4 md:gap-0'>
              <div>
                <span className='text-sm font-semibold'>
                  Still have questions?
                </span>
                <p className='text-xs'>
                  Can’t find the answer you’re looking for? Talk to our team.
                </p>
              </div>
              <a href="mailto:admin@djangoindia.org" target='_blank'>
                <Button>Get In Touch</Button>
              </a>
            </div>
          </div>
          <div className='h-40'></div>
        </div> */}
      </div>
    </>
  )
}

export default ContactUs
