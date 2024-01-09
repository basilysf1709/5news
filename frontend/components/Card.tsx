
type CardProps = {
  newsChannel: string;
  headlines: string;
  url: string;
};

export const Card: React.FC<CardProps> = ({ newsChannel, headlines, url }) => {
  return (
    <>
      <div className="mx-20 my-16 flex flex-col bg-white border shadow-sm rounded-xl">
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">
            Reported by {newsChannel}
          </h3>
          <p className="mt-2 text-gray-500">
            {headlines}
          </p>
          <a
            className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
            href={url}
          >
            Check the news
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
        <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5">
          <p className="mt-1 text-sm text-gray-500">
            Last updated 5 mins ago
          </p>
        </div>
      </div>
    </>
  );
};
