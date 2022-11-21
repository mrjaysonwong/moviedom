import { useRef } from 'react';
import styled from '@emotion/styled';
import { Carousel } from '@mantine/carousel';
import { useStyles } from '@utils/hooks/CarouselControl';
import Autoplay from 'embla-carousel-autoplay';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';
import { devices } from '@utils/devices/devices';
import { RingProgress, Text, Tooltip, Button } from '@mantine/core';
import Link from 'next/link';
import { formatScore } from '@utils/common/common';

const slugify = require('slugify');

const StyledSlide = styled(Carousel.Slide)`
  height: 100vh;
  display: flex;
  justify-content: center;

  @media ${devices.iPhoneLandscape} {
    height: 200vh;
  }

  .backdrop-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PosterContent = styled.div`
  position: absolute;
  z-index: 18;
  height: 100%;
  width: clamp(80%, 5vw, 100%);
`;

const ContentWrapper = styled.div`
  height: 100vh;
  min-height: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
`;

const PosterImageWrapper = styled.div`
  .poster-image {
    width: calc(((100vw / 2.222222) - 40px) / 1.8);
    min-width: calc(((100vw / 2.222222) - 40px) / 1.8);
    height: calc((100vw / 2.222222) - 40px) / 1.8;
    min-height: calc((100vw / 2.222222) - 40px) / 1.8;
    border-radius: var(--imageBorderRadius);
    margin: 1rem;
  }
`;

const PosterInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const MovieOverview = styled.div`
  height: 100px;
  overflow: auto;
  margin: 1rem 0;
`;

const ViewMore = styled.div`
  .btn {
    color: black;
  }
`;

const MovieStats = styled.div`
  display: flex;
  align-items: center;
  border-radius: 40px;
  background: var(--background-opacity-secondary);
  width: min(100%, 450px);

  .movie-title {
    line-height: 1.9rem;
    padding: 0.5rem 0.8rem;
  }
`;

const BackdropOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: var(--overlay-opacity-secondary);
`;

const HeaderCarousel = (props) => {
  const { classes } = useStyles();

  const autoplay = useRef(Autoplay({ delay: 20000 }));

  const heroElements = props.data.map((movie) => {
    const score = formatScore(movie.vote_average);
    return (
      <StyledSlide key={movie.id}>
        <PosterContent>
          <ContentWrapper>
            <PosterImageWrapper>
              <img
                className="poster-image"
                src={
                  movie.poster_path
                    ? `${IMAGES_API_original + movie.poster_path}`
                    : '/backup-image.png'
                }
                alt={`${movie.title} poster cover`}
                loading="lazy"
              />
            </PosterImageWrapper>

            <PosterInfo>
              <MovieStats>
                <Tooltip label="Movie score">
                  <span>
                    <RingProgress
                      size={60}
                      thickness={5}
                      roundCaps
                      label={
                        <Text size="md" align="center">
                          <b>{`${score}%`}</b>
                        </Text>
                      }
                      sections={[
                        {
                          value: score,
                          color:
                            score < 40
                              ? 'red'
                              : score < 70
                              ? 'orange'
                              : 'green',
                        },
                      ]}
                    />
                  </span>
                </Tooltip>
                <span>
                  <h2 className="movie-title">{movie.title}</h2>
                </span>
              </MovieStats>
              <MovieOverview>
                <p>{movie.overview}</p>
              </MovieOverview>
              <ViewMore>
                <Link
                  href={`/movie/${movie.id}-${slugify(movie.title, {
                    lower: true,
                    remove: /[*+~.()'"!:@/,]/g,
                  })}`}
                  passHref
                >
                  <Button
                    className="btn view-more"
                    variant="gradient"
                    gradient={{ from: 'var(--gold)', to: 'lime', deg: 105 }}
                  >
                    View more
                  </Button>
                </Link>
              </ViewMore>
            </PosterInfo>
          </ContentWrapper>
        </PosterContent>

        <BackdropOverlay />
        <img
          className="backdrop-image"
          src={
            movie.backdrop_path
              ? `${IMAGES_API_original + movie.backdrop_path}`
              : '/backup-cover.png'
          }
          alt={`${movie.title} backdrop cover`}
          loading="lazy"
        />
      </StyledSlide>
    );
  });

  return (
    <>
      <section id="header-carousel popular-movies">
        <Carousel
          sx={{ maxWidth: '100%' }}
          mx="auto"
          loop
          draggable={false}
          classNames={classes}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          {heroElements}
        </Carousel>
      </section>
    </>
  );
};

export default HeaderCarousel;
