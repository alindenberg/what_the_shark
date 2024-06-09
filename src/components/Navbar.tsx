import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
// import SharkSelect from '@/components/SharkSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

const Navbar = () => {
  const router = useRouter();

  const [isHome, setIsHome] = useState(false);
  const [isViewingShark, setIsViewingShark] = useState(false);
  const [isViewingQuiz, setIsViewingQuiz] = useState(false);

  useEffect(() => {
    setIsHome(router.pathname === '/');
    setIsViewingShark(router.pathname == '/sharks/[slug]');
    setIsViewingQuiz(router.pathname.includes('/quiz'));
  }, [router.pathname]);

  const transformSlugToName = (slug: string) => {
    return slug
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="flex items-center flex-wrap p-6">
      <Link className={`flex items-center mr-2 ${isHome ? 'opacity-50 cursor-default' : 'hover:text-blue-600'}`} href="/" onClick={(e) => router.pathname === '/' && e.preventDefault()}>
        <FontAwesomeIcon icon={faHome} className='mr-2 w-4' />
        Sharks
      </Link>
      {!isHome && (
        <>
          <>
            <FontAwesomeIcon icon={faAngleRight} className="pr-2 w-4" />
            {!!router.query.slug && <Link className={`pr-2 ${isViewingShark ? 'opacity-50 cursor-default' : 'hover:text-blue-600'}`} href={`/sharks/${router.query.slug}`}>
              {transformSlugToName(router.query.slug as string)}
            </Link>}
          </>
          {isViewingQuiz && (
            <>
              <FontAwesomeIcon icon={faAngleRight} className="pr-2 w-4" />
              <Link className="opacity-50 cursor-default" href="#">
                Quiz
              </Link>
            </>
          )}
        </>
      )}
    </nav >
  );
};

export default Navbar;

