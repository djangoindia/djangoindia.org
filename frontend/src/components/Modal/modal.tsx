import React from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-lg p-6 bg-[#f9f4ee] rounded-lg shadow-lg md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-center text-2xl font-semibold text-black mb-6">
          Subscribe to Django India and never miss an update!
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Full Name Field */}
          <div className="relative">
            <FaRegUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <MdOutlineEmail className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-900 transition-all self-start"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
