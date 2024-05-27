import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-600 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link aria-disabled={true} href="/">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;

