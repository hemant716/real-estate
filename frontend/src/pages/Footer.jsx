import React from 'react'
import {Github,Instagram,Twitter,Linkedin} from  "lucide-react"
export default function footer() {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> 
          <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              ModernBlog
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Exploring ideas, sharing knowledge, and connecting minds through thoughtful content and engaging discussions.
            </p>


            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400 transition-colors"> 
                <Twitter className="w-5 h-5"/>
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors"> 
                <Github className="w-5 h-5"/>
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors"> 
                <Linkedin className="w-5 h-5"/>
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors"> 
                <Instagram className="w-5 h-5"/>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-purple-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Categories</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>


          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Development</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Design</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Technology</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Lifestyle</a>
              </li>
            </ul>
          </div>
        



        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© {currentYear} Hemant vaidya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
