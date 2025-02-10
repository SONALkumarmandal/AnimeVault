import React from 'react'

function Footer() {
  return (
    <div className='bg-zinc-900 h-48 flex justify-center items-center text-orange-700'>
      <div className="container mx-auto text-center">
        <p className="text-sm mb-4">
          © {new Date().getFullYear()} Sonal Kumar Mandal. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-6 text-sm">
          <li>
            <a
              href="/privacy"
              className="hover:text-white transition duration-200"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/terms"
              className="hover:text-white transition duration-200"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-white transition duration-200"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer