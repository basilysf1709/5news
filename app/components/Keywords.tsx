import React, { useEffect, useState } from 'react';

type KeywordsProps = {
  wing: string;
};

export const Keywords = ({ wing }: KeywordsProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);

  // Array of color classes
  const colorClasses = [
    'border-teal-500 text-teal-500 hover:border-teal-400 hover:text-teal-400',
    'border-blue-500 text-blue-500 hover:border-blue-400 hover:text-blue-400',
    'border-red-500 text-red-500 hover:border-red-400 hover:text-red-400',
    'border-yellow-500 text-yellow-500 hover:border-yellow-400 hover:text-yellow-400',
    'border-green-500 text-green-500 hover:border-green-400 hover:text-green-400',
    // Add more color classes as needed
  ];

  // Function to get a random color class
  const getRandomColorClass = () => {
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  };

  useEffect(() => {
    fetch(`/api/v1/trends`)
      .then(response => response.json())
      .then(data => {
        if (data && data[`${wing}_keywords`]) {
          setKeywords(data[`${wing}_keywords`]);
        } else {
          setKeywords([]);
        }
      })
      .catch(error => {
        console.error('Error fetching keywords:', error);
      });
  }, [wing]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
        {keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <span key={index} className={`mx-8 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border ${getRandomColorClass()} disabled:opacity-50 disabled:pointer-events-none`}>
              {keyword}
            </span>
          ))
        ) : (
          <span className={`mx-8 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border ${getRandomColorClass()} disabled:opacity-50 disabled:pointer-events-none`}>
              No significant keyword reported today
          </span>
        )}
      </div>
    </div>
  );
};
