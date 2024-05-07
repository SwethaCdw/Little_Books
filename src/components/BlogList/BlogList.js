// MyComponent.js

import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/Api-service';
import { blogsAPILink } from '../../constants/api-constants';

const BlogList = () => {
  const [blogsData, setBlogsData] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData(blogsAPILink);
        setBlogsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <div>
        <ul>
            {blogsData?.map(item => {
                return (
                    <li key={item.title}>{item.title}</li>
                )
            })}
        </ul>
    </div>
  );
};

export default BlogList;
