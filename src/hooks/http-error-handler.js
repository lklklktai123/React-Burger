import { useState, useEffect } from 'react';
import axios from '../axios-orders';

export default httpClient => {
  const [error, setError] = useState(null);
  const reqinterceptor = axios.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  const resinterceptor = axios.interceptors.response.use(
    res => res,
    error => {
      setError(error);
    }
  );
  useEffect(() => {
    // console.log('will unmount', reqinterceptor, resinterceptor);
    axios.interceptors.request.eject(reqinterceptor);
    axios.interceptors.response.eject(resinterceptor);
  }, [reqinterceptor, resinterceptor]);
  const errorConfirmHandler = () => {
    setError(null);
  };
  return [error, errorConfirmHandler];
};
