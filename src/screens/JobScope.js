import { useContext, useState, useEffect, useRef } from 'react';
import '../styles/JobScope.scss';
import axios from 'axios';
import videojs from 'video.js';
import { useLocation } from 'react-router-dom';

import south_video from '../assets/south_park.mp4';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/city/index.css';

import { UserContext } from '../App';

export default function JobScope() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);

  function uploadVideo() {
    if (!videoFile) return;

    console.log(videoFile);

    setVideoUploading(true);

    const formData = new FormData();
    formData.append('video', videoFile);

    console.log(formData);

    axios
      .post('http://127.0.0.1:8000/api/upload_job_scope_video', formData, {
        headers: {
          Authorization: `Token ${user.auth_token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res);
        setVideoUploading(false);
      })
      .catch(e => console.error(e));
  }

  useEffect(() => {
    const player = playerRef.current;

    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, {
        autoplay: false,
        controls: true,
        // fluid: true,
        sources: [
          {
            src: south_video,
            type: 'video/mp4',
          },
        ],
      });
    }

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [videoRef]);

  return (
    <div className='jobScopeContainer'>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className={'video-js vjs-big-play-centered vjs-theme-city'}
        />
      </div>
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
