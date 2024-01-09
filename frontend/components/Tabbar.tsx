
export const Tabbar = () => {
  return (
    <>
      <div className="m-20 sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select your country
        </label>
        <select
          id="tabs"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option>Left</option>
          <option>Centre-Left</option>
          <option>Centre</option>
          <option>Cemtre-Right</option>
          <option>Right</option>
        </select>
      </div>
      <ul className="m-20 hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex">
        <li className="w-full">
          <a
            href="#"
            className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none"
            aria-current="page"
          >
            Left
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
            className="inline-block w-full p-4 bg-white border-r border-gray-200 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Centre-Left
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
            className="inline-block w-full p-4 bg-white border-r border-gray-200 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Centre
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
            className="inline-block w-full p-4 bg-white border-r border-gray-200 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Centre-Right
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
            className="inline-block w-full p-4 bg-white border-s-0 border-gray-200 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Right
          </a>
        </li>
      </ul>
    </>
  );
};
