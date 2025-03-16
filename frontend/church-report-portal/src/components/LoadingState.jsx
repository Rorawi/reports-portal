import React, {useEffect} from 'react';
import loader from '../assets/images/loading.gif';

const LoadingState = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoading) {
    return null;
  }
  return (
    <div className=''>
                <div className="flex flex-col items-center justify-center svh-188">
            <img src={loader}  alt="" width={100} height={100} className='mb-3'/>
            <h2 className='text-center text-gray-600 dark:text-gray-300'>
            Loading...
            </h2>
            </div>
      </div>
  )
}

export default LoadingState