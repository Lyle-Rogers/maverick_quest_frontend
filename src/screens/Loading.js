import { useState, useEffect } from 'react';
import '../styles/Loading.scss';
import Lottie from 'react-lottie';
import LoaderCircle from '../assets/lotties/LoaderCircle.json';

export default function Loading() {
  const [error, setError] = useState('');

  const loaderCircleOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderCircle,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setError(true);
    }, 7000);
  }, []);

  return (
    <div className='loadingContainer'>
      <div className='title'>Maverick Quest</div>
      <div className='loaderCircle'>
        <Lottie
          options={loaderCircleOptions}
          height={301}
          width={301}
          isClickToPauseDisabled={true}
        />
      </div>
      {error ? (
        <div className='loaderError'>
          Either this is a network error or our servers are not responding
        </div>
      ) : null}
    </div>
  );
}
