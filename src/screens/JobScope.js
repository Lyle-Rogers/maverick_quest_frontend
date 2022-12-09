import { useContext, useState, useEffect, useRef } from 'react';
import '../styles/JobScope.scss';
import axios from 'axios';
import videojs from 'video.js';
import { useLocation } from 'react-router-dom';

import video from '../assets/EP.4.360p.mp4';

import { UserContext } from '../App';

export default function JobScope() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const videoOptions = {
    autoplay: false,
    controls: true,
    // fluid: true,
    source: [
      {
        src: video,
        type: 'video/mp4',
      },
    ],
  };
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const player = playerRef.current;

    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, videoOptions);
    }

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [videoOptions, videoRef, playerRef]);

  return (
    <div className='jobScopeContainer'>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className={'video vjs-big-play-centered vjs-theme-sea'}
        />
      </div>
    </div>
  );
}

// Here is an example of a simple function component named JobScope that renders a video player using the video.js library and the axios library to retrieve the video source from a backend server:

// Copy code
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import videojs from 'video.js';

// const JobScope = (props) => {
//   const [videoSource, setVideoSource] = useState(null);
//   const [player, setPlayer] = useState(null);

//   useEffect(() => {
//     // Retrieve the video source from the backend server
//     // using the axios library
//     const fetchVideo = async () => {
//       const response = await axios.get('https://example.com/video.mp4');
//       const src = response.data;
//       setVideoSource(src);
//     };
//     fetchVideo();
//   }, []);

//   useEffect(() => {
//     if (!videoSource) {
//       return;
//     }

//     // Initialize the video.js player
//     const player = videojs(videoNode, {
//       controls: true,
//       autoplay: false,
//       fluid: true,
//       width: props.width,
//       height: props.height,
//     });
//     setPlayer(player);

//     // Clean up the player when the component unmounts
//     return () => {
//       if (player) {
//         player.dispose();
//       }
//     };
//   }, [videoSource, props.width, props.height]);

//   return (
//     <div data-vjs-player>
//       <video ref={node => setVideoNode(node)} className="video-js" />
//     </div>
//   );
// };

// export default JobScope;
// To use this component, you would import it into your React app and render it like this:

// Copy code
// <JobScope width={640} height={480} />
// This function component accepts two props: width and height, which define the dimensions of the video player. The video source is retrieved using the axios library and the useEffect hook in the first effect, and the video.js player is initialized in the second effect. The video.js player is disposed of in the cleanup function of the second effect to avoid memory leaks.

// The controls option is passed to the video.js player to show the default player controls, such as the play/pause button and the volume control. The autoplay option is set to false to prevent the video from playing automatically. The fluid option is set to true to make the player responsive and resize automatically to fill its container.

// Note that this example uses the useState and useEffect hooks, which are new features in React 16.8 and are not available in older versions of React. If you are using an older version of React, you can use the class component syntax shown in the previous answer instead.

// import React from 'react';

// class VideoPlayer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filePath: props.filePath,
//     };
//   }

//   render() {
//     return (
//       <video className="video-player" src={this.state.filePath} controls>
//         <track label="English" kind="subtitles" src="/subtitles/video1.vtt" srclang="en" default />
//         Your browser does not support the video tag.
//       </video>
//     );
//   }
// }

// export default VideoPlayer;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function JobScope(props) {
//   const [videoFile, setVideoFile] = useState(null);

//   useEffect(() => {
//     const fetchVideoFile = async () => {
//       try {
//         const response = await axios.get(props.filePath);
//         setVideoFile(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchVideoFile();
//   }, [props.filePath]);

//   return (
//     <div>
//       {videoFile ? (
//         <video width='100%' height='100%' controls>
//           <source src={videoFile} type='video/mp4' />
//         </video>
//       ) : (
//         <p>Loading Video...</p>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const JobScope = () => {
//   const [video, setVideo] = useState(null);

//   useEffect(() => {
//     axios
//       .get('https://www.youtube.com/watch?v=U5MqKjb6N2Q')
//       .then(response => {
//         setVideo(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       {video && (
//         <iframe
//           width='560'
//           height='315'
//           src={`https://www.youtube.com/embed/${video.id}`}
//           frameBorder='0'
//           allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
//           allowFullScreen
//         />
//       )}
//     </div>
//   );
// };

// export default JobScope;

// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';

// const JobScope = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get('http://example.com/video.mp4');
//       setData(result.data);
//     };
//     fetchData();
//   }, []);

//   if (!data) return null;
//   return (
//     <ReactPlayer
//       url={'https://www.youtube.com/watch?v=ysz5S6PUM-U'}
//       width='100%'
//       height='100%'
//       controls
//     />
//   );
// };

// export default JobScope;

// what is the best way to go about uploading a video from reactJs to a django backend. Is it a good idea to lower the video's quality in django or react? How can I lower a video's quality in a django backend

// The best way to go about uploading a video from ReactJS to a Django backend is to first convert the video file to a web-compatible format (e.g. MP4) using a library such as FFmpeg. Then, upload the converted video file to the Django backend using a multipart request.

// To lower the video's quality, you can use FFmpeg in the same way that you used it to convert the video file. You can also use other libraries such as Pillow to reduce the quality of the video in the Django backend.

// does ffmpeg for work inside reactjs

// Yes, FFmpeg can be used within ReactJS. FFmpeg is a command line tool that can be used for manipulating audio and video files. It can be used with ReactJS by using a library like react-ffmpeg or react-ffmpeg-player. These libraries provide support for using FFmpeg within ReactJS applications.

// import React from 'react';
// import axios from 'axios';
// import videojs from 'video.js';

// class VideoPlayer extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       videoSource: null,
//     };
//   }

//   async componentDidMount() {
//     // Retrieve the video source from the backend server
//     // using the axios library
//     const response = await axios.get('https://example.com/video.mp4');
//     const videoSource = response.data;

//     // Update the component state with the video source
//     this.setState({ videoSource });

//     // Initialize the video.js player
//     this.player = videojs(this.videoNode, {
//       controls: true,
//       autoplay: false,
//       fluid: true,
//       width: this.props.width,
//       height: this.props.height,
//     });
//   }

//   componentWillUnmount() {
//     if (this.player) {
//       this.player.dispose();
//     }
//   }

//   render() {
//     return (
//       <div data-vjs-player>
//         <video ref={node => (this.videoNode = node)} className="video-js" />
//       </div>
//     );
//   }
// }

// export default VideoPlayer;
// To use this component, you would import it into your React app and render it like this:

// Copy code
// <VideoPlayer width={640} height={480} />
// This component accepts two props: width and height, which define the dimensions of the video player. The video.js player is initialized in the componentDidMount lifecycle method, where the video source is retrieved using the axios library and set on the component state. The video.js player is disposed of in the componentWillUnmount lifecycle method to avoid memory leaks.

// The controls option is passed to the video.js player to show the default player controls, such as the play/pause button and the volume control. The autoplay option is set to false to prevent the video from playing automatically. The fluid option is set to true to make the player responsive and resize automatically to fill its container.
