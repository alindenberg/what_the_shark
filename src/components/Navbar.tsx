import Link from 'next/link';
import { useRouter } from 'next/router';
import SharkSelect from '@/components/SharkSelect';

const Navbar = () => {
  const router = useRouter();

  const handleSharkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sharkSlug = event.target.value;
    router.push(`/sharks/${sharkSlug}`);
  };


  return (
    <nav className="flex items-center flex-wrap bg-teal-600 p-6">
      <Link className={`text-white pr-4 ${router.pathname === '/' ? 'opacity-50 cursor-default' : ''}`} href="/" onClick={(e) => router.pathname === '/' && e.preventDefault()}>Home</Link>
      <div className="pr-4">
        <SharkSelect />
      </div>
    </nav >
  );
};

export default Navbar;

