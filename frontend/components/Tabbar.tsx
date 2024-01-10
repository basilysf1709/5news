'use client'
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';


type TabbarProps = {
  wing: string;
};



export const Tabbar: React.FC<TabbarProps> = ({ wing }) => {
  const pathname = usePathname()
  const router = useRouter();
  const handleSelectChange = (event : any) => {
    router.push(event.target.value);
  };

  const isActive = (currentWing: string) => {
    return wing === currentWing ? "bg-gray-100" : "bg-white";
  };

  return (
    <>
      <div className="sm:hidden w-full px-4 pt-16">
        <label htmlFor="tabs" className="sr-only">
          Select political spectrum
        </label>
        <select
          id="tabs"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 text-base"
          onChange={handleSelectChange}
          value={pathname}
        >
          <option value="/">Left</option>
          <option value="/centre-left">Centre-Left</option>
          <option value="/centre">Centre</option>
          <option value="/centre-right">Centre-Right</option>
          <option value="/right">Right</option>
        </select>
      </div>
      <ul className="m-20 hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex">
        {['/', '/Centre-Left', '/Centre', '/Centre-Right', '/Right'].map((path, index) => (
          <li className="w-full" key={index}>
            <Link className={`inline-block w-full p-4 border-r border-gray-200 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none ${isActive(path.toLowerCase())}`}
                aria-current={wing === path.toLowerCase() ? 'page' : undefined} href={path.toLowerCase()}>
                {path === '/' ? 'Left' : path.replace('/', '')}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
