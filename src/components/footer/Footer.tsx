import Link from 'next/link'
import {Facebook,Twitter,Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="  py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg font-bold">Contact Information</h3>
            <p>Email: contact@blooddonation.com</p>
            <p>Phone: (123) 456-7890</p>
            <div className="flex space-x-4 mt-2">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gray-400">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-gray-400">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-gray-400">
                <Instagram size={24} />
              </a>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-bold">Additional Links</h3>
            <ul>
              <li><Link href="/terms" className="hover:underline">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} Blood Donation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
