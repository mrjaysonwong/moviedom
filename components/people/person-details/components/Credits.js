import styled from '@emotion/styled';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';
import { devices } from '@utils/devices/devices';
import Link from 'next/link';

const slugify = require('slugify');

const CreditsWrapper = styled.div`
  padding: 1.5rem 0;

  @media ${devices.laptopMinWidth} {
    width: min(80%, 100vw);
  }
`;

const ActingBackgroundWrapper = styled.div`
  display: flex;
  overflow-x: auto;
`;

const Card = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  min-width: 135px;
`;

const ImageWrapper = styled.div`
  width: 135px;
  height: 200px;

  .poster-image {
    width: 100%;
    height: 100%;
    border-top-left-radius: var(--imageBorderRadius);
    border-top-right-radius: var(--imageBorderRadius);
  }
`;

const MovieInfo = styled.div`
  padding: 6px;
  text-align: left;

  .movie-name {
    font-weight: 500;
    max-width: 125px;

    a {
      color: var(--gold);
    }
  }
`;

const Credits = ({ credits }) => {
  const cardElements = credits.map((data, index) => {
    return (
      <Card key={index}>
        <ImageWrapper>
          <Link
            href={`/${data.media_type === 'tv' ? 'tv' : 'movie'}/${
              data.id
            }-${slugify(data.media_type === 'tv' ? data.name : data.title, {
              lower: true,
              remove: /[*+~.()'"!:@/]/g,
            })}`}
            passHref
          >
            <a>
              <img
                className="poster-image"
                src={
                  data.poster_path
                    ? `${IMAGES_API_w500 + data.poster_path}`
                    : '/backup-image.png'
                }
                alt={`${data.title} photo`}
                loading="lazy"
              />
            </a>
          </Link>
        </ImageWrapper>
        <MovieInfo>
          <p className="movie-name">
            <Link
              href={`/${data.media_type === 'tv' ? 'tv' : 'movie'}/${
                data.id
              }-${slugify(data.media_type === 'tv' ? data.name : data.title, {
                lower: true,
                remove: /[*+~.()'"!:@/]/g,
              })}`}
              passHref
            >
              <a>{data.media_type === 'movie' ? data.title : data.name}</a>
            </Link>
          </p>
        </MovieInfo>
      </Card>
    );
  });

  return (
    <>
      <CreditsWrapper>
        <h2>Known For</h2>
        {credits.length > 0 ? (
          <ActingBackgroundWrapper>{cardElements}</ActingBackgroundWrapper>
        ) : (
          <p>We don't have any credits added.</p>
        )}
      </CreditsWrapper>
    </>
  );
};

export default Credits;
