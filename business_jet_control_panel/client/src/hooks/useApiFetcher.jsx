import React, { useCallback, useState } from "react";
/**
 * Custom hook for fetching data from an API and managing loading/error states.
 * @param {Function} apiCallFunction - The async function that makes the API call (e.g., getWifiStatus).
 * @param {string} entityName - A descriptive name for the data being fetched (for error/log messages).
 * @returns {object} { data, loading, error, fetchData }
 */

const useApiFetcher = ({ apiCallFunction, entityName = "data" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = useCallback(
    async (params) => {
      setLoading(false);
      setError(null);
      try {
        const responseData = await apiCallFunction(params);
        if (
          responseData &&
          responseData.data === null &&
          responseData.message
        ) {
          console.log(`${entityName}: ${responseData.message}`);
          setData(null);
        } else {
          setData(responseData);
        }
      } catch (error) {
        console.error(`Error fetching ${entityName}:`, error);
        setError(error.messsage || `Failed to fetch ${entityName}`);
        setData(null);
      }
    },
    [apiCallFunction, entityName]
  );
  return { data, loading, error, fetchData };
};

export default useApiFetcher;
