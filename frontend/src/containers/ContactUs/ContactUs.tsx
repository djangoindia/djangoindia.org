import { Label, Input, Textarea, Button } from '@components'
import React from 'react'
import {
  CiBag1,
  CiCreditCard1,
  CiDeliveryTruck,
  CiMail,
  CiReceipt,
  CiShoppingTag,
} from 'react-icons/ci'

const ContactUs = () => {
  return (
    <div className='container'>
      <h2 className='text-6xl mt-12 mb-6 font-bold text-blue-900'>
        Contact Us
      </h2>
      <hr />
      <p className='my-6'>
        Have a question or want to collaborate? We&#39;d love to hear from you!
        Fill out the form below or reach out to us directly at
        admin@djangoindia.org. We look forward to connecting with you!
      </p>
      <form className='flex flex-col max-w-2xl mx-auto my-16 gap-6'>
        <div className='flex w-full justify-between'>
          <div className='grid w-full max-w-80 items-center gap-1.5'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input
              type='text'
              id='firstName'
              placeholder='Enter your first Name'
            />
          </div>
          <div className='grid w-full max-w-80 items-center gap-1.5'>
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
        <div className='grid w-full gap-1.5'>
          <Label htmlFor='message'>Your message</Label>
          <Textarea
            rows={10}
            placeholder='Type your message here.'
            id='message'
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
      <div className='my-16 bg-yellow-50 rounded-2xl shadow-lg'>
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
            className='w-1/4 mx-auto'
          />
        </div>
        <div className='bg-white py-14'>
          <div className='grid grid-rows-2 grid-cols-3 gap-10 mx-auto w-3/4'>
            <div className='flex flex-col gap-2 items-start'>
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
            <div className='flex flex-col gap-2 items-start'>
              <div className='bg-orange-200 p-2 rounded-full'>
                <CiCreditCard1 className='text-orange-500 text-2xl' />
              </div>
              <h6 className='text-lg font-semibold text-slate-500'>
                What should I do if my payment fails?
              </h6>
              <p className='text-sm'>
                If your payment fails, you can use the (COD) payment option, if
                available on that order. If your payment is debited from your
                account after a payment failure, it will be credited back within
                7-10 days.
              </p>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <div className='bg-orange-200 p-2 rounded-full'>
                <CiReceipt className='text-orange-500 text-2xl' />
              </div>
              <h6 className='text-lg font-semibold text-slate-500'>
                What is your cancellation policy?
              </h6>
              <p className='text-sm'>
                You can now cancel an order when it is in packed/shipped status.
                Any amount paid will be credited into the same payment mode
                using which the payment was made
              </p>
            </div>
            <div className='flex flex-col gap-2 items-start'>
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
            <div className='flex flex-col gap-2 items-start'>
              <div className='bg-orange-200 p-2 rounded-full'>
                <CiBag1 className='text-orange-500 text-2xl' />
              </div>
              <h6 className='text-lg font-semibold text-slate-500'>
                What is Instant Refunds?
              </h6>
              <p className='text-sm'>
                Upon successful pickup of the return product at your doorstep,
                Myntra will instantly initiate the refund to your source account
                or chosen method of refund. Instant Refunds is not available in
                a few select pin codes and for all self ship returns.
              </p>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <div className='bg-orange-200 p-2 rounded-full'>
                <CiShoppingTag className='text-orange-500 text-2xl' />
              </div>
              <h6 className='text-lg font-semibold text-slate-500'>
                How do I apply a coupon on my order?
              </h6>
              <p className='text-sm'>
                You can apply a coupon on cart page before order placement. The
                complete list of your unused and valid coupons will be available
                under “My Coupons” tab of App/Website/M-site.
              </p>
            </div>
          </div>
          <div className='p-5 rounded-2xl bg-yellow-50 w-2/4 mx-auto mt-10 flex justify-between	items-center'>
            <div>
              <span className='text-sm font-semibold'>
                Still have questions?
              </span>
              <p className='text-xs'>
                Can’t find the answer you’re looking for? Talk to our team.
              </p>
            </div>
            <Button>Get In Touch</Button>
          </div>
        </div>
        <div className='h-40'></div>
      </div>
    </div>
  )
}

export default ContactUs
