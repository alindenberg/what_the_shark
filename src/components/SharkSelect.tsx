import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Sharks from '@/data/sharks.json'


export default function SharkSelect(props: any) {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
    }

    useEffect(() => {
        let isViewingShark = router.pathname.includes('/sharks/');
        if (!isViewingShark) {
            setSelectedOption(null);
        }
        else if (isViewingShark && selectedOption == null) {
            const sharkName = router.query.slug?.toString().split(' ').join('_').toLowerCase();
            if (!sharkName) {
                return;
            }
            const option = Sharks.findIndex((shark) => shark.name.toLowerCase().replace(' ', '_') === sharkName);
            console.log("option is ", option)
            setSelectedOption(option);
        }
    }, [router.pathname]);

    return (
        <Menu as="div" onChange={handleChange} className="relative inline-block text-left">
            <div>
                <MenuButton className={`inline-flex w-full justify-center gap-x-1.5 rounded-md text-white`}>
                    {selectedOption != null ? Sharks[selectedOption].name : 'Select a shark'}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
                </MenuButton>
            </div>

            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute left-0 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                    <div className="py-1">
                        {Sharks.map((shark, index) => (
                            <MenuItem key={index}>
                                <a
                                    href={`/sharks/${shark.name.split(' ').join('_').toLowerCase()}`}
                                    className={`block px-4 py-2 text-sm ${selectedOption === index ? 'opacity-50 cursor-default' : ''}`}
                                    onClick={(e) => selectedOption === index && e.preventDefault()}
                                >
                                    {shark.name}
                                </a>
                            </MenuItem>
                        ))
                        }
                    </div >
                </MenuItems >
            </Transition >
        </Menu >
    )
}
