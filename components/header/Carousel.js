import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import LandingHeader from './LandingHeader';
import { Carousel } from '@mantine/carousel';

const Header = styled.header`
  height: 100vh;
  margin: 0px auto;
`;

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

const StyledCarousel = styled(Carousel)`
  min-width: 100%;
  border: 1px solid;
`;

const StyledSlide = styled(Carousel.Slide)`
  height: 100vh;
  max-width: 100%;
`;

const HeaderCarousel = (props) => {
  const moviedata = props.data.results;

  // console.log('DATA',moviedata);
  const [imagepath, setImagePath] = useState([]);

  useEffect(() => {
    setImagePath(
      moviedata.map((item) => {
        return {
          path: item.backdrop_path,
        };
      })
    );
  }, []);
  // console.log(imagepath);

  const IMAGES_API_w500 = 'https://image.tmdb.org/t/p/w500';
  const IMAGES_API_original = 'https://image.tmdb.org/t/p/original';

  let heroElements = moviedata.map((movie, index) => {
    return (
      <StyledSlide key={movie.id}>
        <img src={`${IMAGES_API_original + movie.backdrop_path}`} />
      </StyledSlide>
    );
  });

  console.log(heroElements);

  return (
    <>
      <Header>
        <LandingWrapper>
          <LandingBackdrop>
            <StyledCarousel sx={{ maxWidth: 320 }} mx="auto" withIndicators>
              {heroElements}
            </StyledCarousel>
          </LandingBackdrop>
        </LandingWrapper>
      </Header>
    </>
  );
};

export default HeaderCarousel;
