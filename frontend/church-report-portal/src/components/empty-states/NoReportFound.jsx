import React from 'react';
import noreportImage from '../../assets/images/noreport.png';

const NoReportFound = () => {
  return (
      <div className=''>
            <div className="flex flex-col items-center justify-center svh-188">
        <img src={noreportImage} alt="" width={100} height={100} className='mb-3'/>
        <h2 className='text-center text-gray-600 dark:text-gray-300'>
            No Report Found !
        </h2>
        </div>
    </div>
  )
}

export default NoReportFound