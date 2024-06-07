import Link from 'next/link';
import { useRouter } from 'next/router';
import sharks from '@/data/sharks.json';

const Navbar = () => {
  const router = useRouter();

  const handleSharkChange = (event) => {
    const sharkSlug = event.target.value;
    router.push(`/sharks/${sharkSlug}`);
  };


  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-600 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link aria-disabled={true} href="/">Home</Link>
        <select onChange={handleSharkChange}>
          {sharks.map((shark) => (
            <option key={shark.id} value={shark.name.toLowerCase().replace(' ', '_')}>
              {shark.name}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;

