import styled from '@emotion/styled';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';
import { devices } from '@utils/devices/devices';
import {
  Title,
  Stats,
  PosterImage,
  Tagline,
  Overview,
  Director,
} from './content-header/index';
import {
  filterDirector,
  filterTrailerVideos,
  filterTvRating,
  formatDate,
  hasCountry,
  sortCertification,
  toHoursAndMinutes,
} from '@utils/common/common';

const LandingHeader = styled.div`
  position: relative;

  a {
    color: var(--gold);
  }

  .backdrop-image {
    width: 100%;
    max-height: 100vh;
    min-height: 100%;
    object-fit: cover;
  }
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  background: var(--overlay-opacity-secondary);
  height: 100%;
  width: 100%;
`;

const PosterContent = styled.section`
  padding-bottom: 0.5rem;

  @media ${devices.laptopMaxWidth} {
    width: min(90%, 100vw);
    margin-inline: auto;
    padding: 1.5rem 0;
  }

  @media ${devices.laptopMinWidth} {
    position: absolute;
    padding: 4.2rem;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

const MovieInfo = styled.div`
  position: relative;

  @media ${devices.laptopMinWidth} {
    margin-left: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Header = ({ movie, cert, credits, videos, rating, type }) => {
  return (
    <>
      <LandingHeader>
        <BackgroundOverlay />
        <img
          className="backdrop-image"
          src={
            movie.backdrop_path
              ? `${IMAGES_API_original + movie.backdrop_path}`
              : '/backup-cover.png'
          }
          alt={`${type === 'movie' ? movie.title : movie.name} backdrop cover`}
          loading="eager"
        />
        <PosterContent>
          <PosterImage movie={movie} type={type} />

          <MovieInfo>
            <Title
              movie={movie}
              cert={type === 'movie' && cert}
              rating={type === 'tv' && filterTvRating(rating)}
              date={formatDate(
                type === 'movie' ? movie.release_date : movie.first_air_date
              )}
              runtime={toHoursAndMinutes(
                type === 'movie'
                  ? movie.runtime
                  : movie.episode_run_time[0] || movie.episode_run_time
              )}
              pcountry={type === 'movie' && hasCountry(movie)}
              sortedcert={type === 'movie' && sortCertification(cert)}
              type={type}
            />
            <Stats
              movie={movie}
              filteredvids={filterTrailerVideos(videos)}
              type={type}
            />
            <Tagline movie={movie} />
            <Overview movie={movie} />
            <Director
              mdirector={
                type === 'movie' ? filterDirector(credits) : movie.created_by[0]
              }
              type={type}
            />
          </MovieInfo>
        </PosterContent>
      </LandingHeader>
    </>
  );
};

export default Header;
