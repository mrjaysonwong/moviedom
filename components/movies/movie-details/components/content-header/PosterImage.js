import styled from '@emotion/styled';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';
import { devices } from '@utils/devices/devices';

const PosterImageWrapper = styled.div`
  .poster-image {
    width: calc(((100vw / 2.222222) - 40px) / 1.8);
    min-width: calc(((100vw / 2.222222) - 40px) / 1.8);
    height: calc((100vw / 2.222222) - 40px) / 1.8;
    min-height: calc((100vw / 2.222222) - 40px) / 1.8;
    border-radius: var(--imageBorderRadius);
  }

  @media ${devices.laptopMaxWidth} {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const PosterImage = ({ movie, type }) => {
  return (
    <>
      <PosterImageWrapper>
        <img
          className="poster-image"
          src={
            movie.poster_path
              ? `${IMAGES_API_original + movie.poster_path}`
              : '/backup-image.png'
          }
          alt={`${type === 'movie' ? movie.title : movie.name} poster cover`}
          loading="eager"
        />
      </PosterImageWrapper>
    </>
  );
};

export default PosterImage;
