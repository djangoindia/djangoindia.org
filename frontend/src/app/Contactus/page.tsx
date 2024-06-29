import React from "react";
import Navbar from "@/components/Navbar/page";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import djangobg from "../../../public/django-views-1.jpg";
import Image from "next/image";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import djangopic from "../../../public/django-rest-framework-create-api.jpg";
import Footer from "@/components/Footer/Footer";

function Page() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <h1 className="font-bold text-2xl">Contact Us</h1>
        <hr />
        <p className="pt-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
          sapiente amet repudiandae facere, ex, dicta quo ab natus iure atque
          suscipit sit adipisci ducimus expedita dolor Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Inventore earum quasi quibusdam
          sunt error! Quod facere quidem quam iure repellat. a voluptatibus
          architecto doloribus.
        </p>
        <div className="py-12">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <Image
                    src={djangopic}
                    alt="ContactUs tailwind section"
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700"
                  />
                  <div className="absolute bottom-0 w-full lg:p-11 justify-center">
                    <div className="flex space-x-4 p-6">
                      <a
                        href="https://www.twitter.com/djangoindiaa"
                        target="_blank"
                      >
                        <div className="bg-slate-300 p-4  rounded-md">
                          <FaTwitter className="text-gray-900" />
                        </div>
                      </a>
                      <a href="" target="_blank">
                        <div className="bg-slate-300 p-4 rounded-md">
                          <FaTelegramPlane className="text-gray-900" />
                        </div>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/django-india/"
                        target="_blank"
                      >
                        <div className="bg-slate-300 p-4  rounded-md">
                          <FaLinkedin className="text-gray-900" />
                        </div>
                      </a>
                      <a href="" target="_blank">
                        <div className="bg-slate-300 p-4  rounded-md">
                          <FaFacebook className="text-gray-900" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <h2 className="text-4xl font-semibold leading-10">
                GET IN TOUCH
              </h2>
              <p className="mb-11 text-gray-500">
                24/7 We will answer to your questions and problems
              </p>
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaRegUser className="text-gray-600" />
                </div>
                <input
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 border border-gray-200 focus:outline-none pl-10 pr-4"
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdOutlineMail className="text-gray-600" />
                  </div>
                  <input
                    className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 border border-gray-200 focus:outline-none pl-10 pr-4"
                    placeholder="Email"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdOutlinePhoneAndroid className="text-gray-600" />
                  </div>
                  <input
                    className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 border border-gray-200 focus:outline-none pl-10 pr-4"
                    placeholder="Phone"
                  />
                </div>
              </div>

              <textarea
                className="w-full h-36 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 border border-gray-200 focus:outline-none pl-4 mb-10"
                placeholder="Describe your issue"
              />

              <button className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-800 bg-indigo-600 shadow-sm">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-12">
        <h1 className="text-center font-bold text-3xl">FAQS</h1>
        <section className="px-10 pb-8 pt-10 rounded-lg flex justify-center flex-row">
          <div className="w-2/4">
            {[
              "Do I have to allow the use of cookies?",
              "How do I change my My Page Password?",
              "What is BankID?",
              "Whose birth number can I use?",
              "When do I receive a password ordered by letter?",
            ].map((question, index) => (
              <details
                key={index}
                className="border border-slate-400 rounded pt-4 pb-6 px-3 relative open:shadow-lg mb-1 bg-none open:bg-yellow-50 duration-300"
              >
                <summary className="list-none font-semibold relative text-sm cursor-pointer pr-7">
                  {question}
                  <div className="absolute top-0 right-0 bg-slate-200 rounded-full px-1 py-0.5 cursor-pointer visible open:invisible">
                    <svg
                      className="h-5 w-4"
                      
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.0}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </summary>
                <p className="text-xs pt-3">
                  Yes, in order to use My Page, you must allow the use of
                  cookies in your browser.
                  <br />
                  <br />
                  See also: What is a cookie and what does it do?
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
