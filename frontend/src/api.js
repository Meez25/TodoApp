import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
});

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { autoFetch = true } = options;

  const fetchData = useCallback(async (queryParams = null) => {
    setIsLoading(true);
    setError(null);

    try {
      const fullUrl = queryParams ? `${url}?${new URLSearchParams(queryParams)}` : url;
      const response = await instance.get(fullUrl);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const create = useCallback(async (newData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await instance.post(url, newData);
      await fetchData();
      return response.data;
    } catch (err) {
      console.log(err)
      const errorMessage = err.response?.data || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [url, fetchData]);

  const update = useCallback(async (id, updatedData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await instance.patch(`${url}${id}/`, updatedData);
      await fetchData();
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [url, fetchData]);

  const remove = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      await instance.delete(`${url}${id}/`);
      await fetchData();
      return true;
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [url, fetchData]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    isLoading,
    error,
    fetchData,
    create,
    update,
    remove
  };
};

export const useCategories = () => {
  return useApi('/categories/');
};

export const useTasks = (categoryId = null) => {
  const queryParams = categoryId ? { category_id: categoryId } : null;
  const hook = useApi('/tasks/', { autoFetch: false });

  useEffect(() => {
    hook.fetchData(queryParams); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return hook;
};
