import styled from '@emotion/styled';
import { Header, Logo, Cast, Stats, Media } from './components/index';
import { devices } from '@utils/devices/devices';
import {
  filterCast,
  filterLogo,
  filterMediaVideos,
  filterPosterImages,
  filterBackdropImages,
} from '@utils/common/common';

const BackgroundOverlay = styled.div`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(23, 4, 65, 1) 100%
  );
`;

const LogoWrapper = styled.div`
  background: rgba(128, 128, 128, 0.2);
`;

const CastStatsWrapper = styled.div`
  width: min(90%, 100vw);
  margin-inline: auto;

  @media ${devices.laptopMinWidth} {
      display: flex;
      
    }
  }
`;

const Details = (props) => {
  return (
    <>
      <Header
        movie={props.data.details}
        cert={props.data.release_dates}
        rating={props.data.ratings}
        credits={props.data.cast}
        videos={props.data.videos}
        type={props.type}
      />

      <section id="production">
        <LogoWrapper>
          <Logo logo={filterLogo(props.data.details)} />
        </LogoWrapper>
        <BackgroundOverlay>
          <CastStatsWrapper>
            <Cast cast={filterCast(props.data.cast)} type={props.type} />
            <Stats stats={props.data.details} type={props.type} />
          </CastStatsWrapper>
        </BackgroundOverlay>
      </section>

      <Media
        videos={filterMediaVideos(props.data.videos)}
        posters={filterPosterImages(props.data.images)}
        backdrops={filterBackdropImages(props.data.images)}
        type={props.type}
      />
    </>
  );
};

export default Details;
