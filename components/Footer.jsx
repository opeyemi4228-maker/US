import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold mb-6">CUSTOMER CARE</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/ContactUs" className="hover:text-gray-300 transition-colors">Contact Us</Link></li>
              <li><Link href="/SizeGuide" className="hover:text-gray-300 transition-colors">Size Guide</Link></li>
              <li><Link href="/care-instructions" className="hover:text-gray-300 transition-colors">Care Instructions</Link></li>
              <li><Link href="/TrackOrder" className="hover:text-gray-300 transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">SERVICES</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/Personalization" className="hover:text-gray-300 transition-colors">Personalization</Link></li>
              <li><Link href="/stores" className="hover:text-gray-300 transition-colors">Find a Store</Link></li>
              <li><Link href="/appointments" className="hover:text-gray-300 transition-colors">Book an Appointment</Link></li>
            </ul>
          </div>

          {/* The Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">THE COMPANY</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/About" className="hover:text-gray-300 transition-colors">About Us</Link></li>
              <li><Link href="/sustainability" className="hover:text-gray-300 transition-colors">Sustainability</Link></li>
              <li><Link href="/press" className="hover:text-gray-300 transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-6">CONNECT</h3>
            
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm mb-4">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-transparent border border-gray-600 text-white placeholder-gray-400 text-sm focus:border-white focus:outline-none"
                />
                <button className="px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors">
                  JOIN
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm mb-4">Follow Us</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-gray-400" />
              <span>Customer Service: 1-877-482-2430</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={16} className="text-gray-400" />
              <span>customerservice@unicestitches.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={16} className="text-gray-400" />
              <span>Find a Store Near You</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-wider">
              UNICE STITCHES
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-400">
              <Link href="/Privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              © 2024 Unice Stitches. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 opacity-60">
           
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;