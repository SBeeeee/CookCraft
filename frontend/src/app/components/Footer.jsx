// components/Footer.js

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-8 px-4">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* App Description */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-extrabold text-purple-400">CookCraft</h3>
            <p className="text-sm">Your favorite recipe generator — save, delete, and discover new recipes!</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/about" className="text-sm hover:text-gray-400">
              About Us
            </Link>
            <Link href="/contact" className="text-sm hover:text-gray-400">
              Contact
            </Link>
            <Link href="/favorites" className="text-sm hover:text-gray-400">
              My Favorites
            </Link>
            <Link href="/recipes" className="text-sm hover:text-gray-400">
              Explore Recipes
            </Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 mx-2"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 mx-2"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 mx-2"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-sm">
          <p>&copy; {new Date().getFullYear()} CookCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
