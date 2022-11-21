import styled from '@emotion/styled';

const IFrameWrapper = styled.div`
  display: flex;

  iframe {
    max-width: 350px;
    height: 250px;
    margin: 1rem 0.5rem;
  }
`;

const Videos = ({ videos, type }) => {
  const vidElements = videos.map((video) => {
    return (
      <iframe
        key={video.id}
        src={`https://youtube.com/embed/${video.key}`}
        allowFullScreen="allowFullScreen"
        mozallowfullscreen="mozallowFullScreen"
        msallowfullscreen="msallowFullScreen"
        oallowfullscreen="oallowFullScreen"
        webkitallowfullscreen="webkitallowFullScreen"
        frameBorder="0"
        loading="lazy"
      ></iframe>
    );
  });
  return (
    <>
      <IFrameWrapper>
        {videos.length > 0 ? (
          vidElements
        ) : (
          <p>
            Sorry, no video is available for this{' '}
            {type === 'movie' ? 'movie' : 'tv show'}.
          </p>
        )}
      </IFrameWrapper>
    </>
  );
};

export default Videos;
