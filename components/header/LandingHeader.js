import styled from '@emotion/styled';
import backupImage from '@public/backup-image.png';

const LandingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;

  flex-basis: 20%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LandingBackdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LandingHeader = (props) => {
  const IMAGES_API_w500 = 'https://image.tmdb.org/t/p/w500';
  const IMAGES_API_original = 'https://image.tmdb.org/t/p/original';

  //   let img =
  //     props.poster_path === null
  //       ? { backupImage }
  //       : `${IMAGES_API_w500 + props.poster_path}`;

  // console.log(`${IMAGES_API_original + props.backdrop_path}`);

  return (
    <>
      <LandingWrapper>
        <LandingBackdrop>
          <img
            src={`${IMAGES_API_original + props.backdrop_path}`}
            alt={`${props.title} backdrop-cover`}
            loading="lazy"
          />
        </LandingBackdrop>
      </LandingWrapper>
    </>
  );
};

export default LandingHeader;
