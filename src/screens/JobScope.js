import { useContext, useState, useEffect, useRef } from 'react';
import '../styles/JobScope.scss';
import axios from 'axios';
import videojs from 'video.js';
import { useLocation } from 'react-router-dom';
// import Lottie from 'react-lottie';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import LoaderCircle from '../assets/lotties/LoaderCircle.json';
// import south_video from '../assets/south_park.mp4';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/city/index.css';

import { UserContext } from '../App';

export default function JobScope() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [video, setVideo] = useState(null);
  // const [videoLoading, setVideoLoading] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);
  // const loaderCircleOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: LoaderCircle,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice',
  //   },
  // };

  function setJobScope() {
    // setVideoLoading(true);

    axios
      .get(`http://127.0.0.1:8000/api/stream_job_scope_video/${6}`, {
        headers: { Authorization: `Token ${user.auth_token}` },
      })
      .then(res => {
        console.log('res1', res);
        setVideo(res.data);
      });

    // console.log('that after axios console');
  }

  function uploadVideo() {
    if (!videoFile) return;

    setVideoUploading(true);

    const formData = new FormData();
    formData.append('video', videoFile);

    axios
      .post('http://127.0.0.1:8000/api/upload_job_scope_video', formData, {
        headers: {
          Authorization: `Token ${user.auth_token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        // console.log(res);
        setVideoUploading(false);
      })
      .catch(e => console.error(e));
  }

  useEffect(() => {
    if (!video) return;

    // setVideoLoading(false);

    // console.log('Video1', video);

    const player = playerRef.current;

    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) {
        console.log('element fucked');
        return;
      }
      console.log('going to play');
      playerRef.current = videojs(videoElement, {
        autoplay: false,
        controls: true,
        // fluid: true,
        sources: [
          {
            // src: south_video,
            src: video.data,
            type: 'video/mp4',
          },
        ],
      });
      console.log('should be playing');
    }

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [video, videoRef]);

  useEffect(() => {
    setJobScope();
  }, []);

  return (
    <div className='jobScopeContainer'>
      {/* <div className='firstVideoContainer'> */}
      <div data-vjs-player>
        <video
          ref={videoRef}
          className={'video-js vjs-big-play-centered vjs-theme-city'}
        />
      </div>
      {/* <div className='firstVideoLoader'>
          {videoLoading && (
            <Lottie
              options={loaderCircleOptions}
              height={61}
              width={61}
              isClickToPauseDisabled={true}
            />
          )}
        </div> */}
      {/* </div> */}
      <form className='videoUpload'>
        <input type='file' onChange={e => setVideoFile(e.target.files[0])} />
        <button className='uploadBtn' type='button' onClick={uploadVideo}>
          Upload
        </button>
        {videoUploading && 'Video is uploading'}
      </form>
    </div>
  );
}
