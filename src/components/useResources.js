import { useState, useEffect } from 'react';
import axios from 'axios';

const useResources = (resource) => {
  const [resources, setResources] = useState([]);

  const fetchResource = async () => {
    const response = await axios.get(
      `https://tgradmin.herokuapp.com/api/${resource}`
      // `http://192.168.2.94:3001/api/${resource}`
    );
    setResources(response.data);
  };

  useEffect(() => {
    fetchResource(resource);
  }, [resource]);

  return resources;
};

export default useResources;
