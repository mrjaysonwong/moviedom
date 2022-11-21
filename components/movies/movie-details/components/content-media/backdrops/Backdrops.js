import styled from '@emotion/styled';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';

const BackdropsWrapper = styled.div`
  display: flex;

  .backdrop-image {
    max-width: 420px;
    height: 250px;
    margin: 1rem 0.5rem;
  }
`;

const Backdrops = ({ backdrops, type }) => {
  const backdropsElements = backdrops.map((backdrop, index) => {
    return (
      <span key={index}>
        <img
          className="backdrop-image"
          src={
            backdrop.file_path
              ? `${IMAGES_API_w500 + backdrop.file_path}`
              : '/backup-image.png'
          }
          alt={'Backdrops'}
          loading="lazy"
        />
      </span>
    );
  });
  return (
    <>
      <BackdropsWrapper>
        {backdrops.length > 0 ? (
          backdropsElements
        ) : (
          <p>
            Sorry, no backdrop is available for this{' '}
            {type === 'movie' ? 'movie' : 'tv show'}.
          </p>
        )}
      </BackdropsWrapper>
    </>
  );
};

export default Backdrops;
