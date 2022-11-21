import styled from '@emotion/styled';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';

const PostersWrapper = styled.div`
  display: flex;

  .poster-image {
    max-width: 420px;
    height: 250px;
    margin: 1rem 0.5rem;
  }
`;

const Posters = ({ posters, type }) => {
  const postersElements = posters.map((poster, index) => {
    return (
      <span key={index}>
        <img
          className="poster-image"
          src={
            poster.file_path
              ? `${IMAGES_API_w500 + poster.file_path}`
              : '/backup-image.png'
          }
          alt={'Posters'}
          loading="lazy"
        />
      </span>
    );
  });
  return (
    <>
      <PostersWrapper>
        {posters.length > 0 ? (
          postersElements
        ) : (
          <p>
            Sorry, no poster is available for this{' '}
            {type === 'movie' ? 'movie' : 'tv show'}.
          </p>
        )}
      </PostersWrapper>
    </>
  );
};

export default Posters;
