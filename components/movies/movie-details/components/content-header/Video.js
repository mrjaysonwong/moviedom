import styled from '@emotion/styled';

const VideoWrapper = styled.div`
  iframe {
    width: clamp(260px, 70vw, 600px);
    height: clamp(250px, 50vw, 400px);
  }
`;

const Video = ({ trailer }) => {
  return (
    <>
      <VideoWrapper>
        <iframe
          src={`https://youtube.com/embed/${trailer[0].key}`}
          allowFullScreen="allowFullScreen"
          mozallowfullscreen="mozallowFullScreen"
          msallowfullscreen="msallowFullScreen"
          oallowfullscreen="oallowFullScreen"
          webkitallowfullscreen="webkitallowFullScreen"
          frameBorder="0"
          loading="lazy"
        ></iframe>
      </VideoWrapper>
    </>
  );
};

export default Video;
