import { useEffect } from 'react';
import NProgress from 'nprogress';
import '../styles/nprogress.css';

const ProgressBar = () => {
  useEffect(() => {
    NProgress.configure({ 
      showSpinner: true,
      trickleSpeed: 200,
      easing: 'ease',
      speed: 500
    });

    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return null;
};

export default ProgressBar; 