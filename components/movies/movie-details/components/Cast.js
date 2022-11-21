import styled from '@emotion/styled';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';
import { devices } from '@utils/devices/devices';
import Link from 'next/link';

const slugify = require('slugify');

const MovieCastWrapper = styled.div`
  padding: 1.5rem 0;

  @media ${devices.laptopMinWidth} {
    width: min(80%, 100vw);
  }
`;

const CastWrapper = styled.div`
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

  .profile-image {
    width: 100%;
    height: 100%;
    border-top-left-radius: var(--imageBorderRadius);
    border-top-right-radius: var(--imageBorderRadius);
  }
`;

const ProfileInfo = styled.div`
  padding: 6px;
  text-align: left;

  .cast-name {
    font-weight: 500;
    max-width: 125px;

    a {
      color: var(--gold);
    }
  }

  .cast-character {
    font-size: 0.9rem;
    font-weight: 300;
  }
`;

const Cast = ({ cast, type }) => {
  const cardElements = cast.map((cast) => {
    return (
      <Card key={cast.id}>
        <ImageWrapper>
          <Link
            href={`/person/${cast.id}-${slugify(cast.name, {
              lower: true,
              remove: /[*+~.()'"!:@/,]/g,
            })}`}
            passHref
          >
            <a>
              <img
                className="profile-image"
                src={
                  cast.profile_path
                    ? `${IMAGES_API_w500 + cast.profile_path}`
                    : '/backup-image.png'
                }
                alt={`${cast.name} photo`}
                loading="lazy"
              />
            </a>
          </Link>
        </ImageWrapper>
        <ProfileInfo>
          <p className="cast-name">
            <Link
              href={`/person/${cast.id}-${slugify(cast.name, {
                lower: true,
                remove: /[*+~.()'"!:@/,]/g,
              })}`}
              passHref
            >
              <a>{cast.name}</a>
            </Link>
          </p>
          <p className="cast-character">{cast.character}</p>
        </ProfileInfo>
      </Card>
    );
  });

  return (
    <>
      <MovieCastWrapper>
        <h2>{type === 'movie' ? 'Movie' : 'Series'} Cast</h2>
        {cast.length > 0 ? (
          <CastWrapper>{cardElements}</CastWrapper>
        ) : (
          <p>
            We don&apos;t have any cast added to this{' '}
            {type === 'movie' ? 'movie' : 'show'}.
          </p>
        )}
      </MovieCastWrapper>
    </>
  );
};

export default Cast;
