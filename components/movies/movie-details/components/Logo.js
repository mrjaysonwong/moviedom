import { useRef } from 'react';
import styled from '@emotion/styled';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useStyles } from '@utils/hooks/CarouselControl';

const ProductionLogoWrapper = styled.div`
  padding: 1.5rem;
  margin-inline: auto;
  width: min(90%, 100vw);

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #fff;
  }
`;

const StyledCarousel = styled(Carousel)`
  margin-inline: auto;
`;

const StyledSlide = styled(Carousel.Slide)`
  display: flex;
  align-items: center;
`;

const CompanyLogoWrapper = styled.div`
  width: 100%
  height: 100%;
  margin: 0 0.5rem;

  .prod-logo {
    width: 100%;
    height: 100%;
  }
`;

const Logo = ({ logo }) => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const { classes } = useStyles();

  const logoElements = logo.map((prod) => {
    return (
      <StyledSlide key={prod.id} size="30%">
        <CompanyLogoWrapper>
          <img
            className="prod-logo"
            src={`${IMAGES_API_original + prod.logo_path}`}
            alt={`${prod.name} Logo`}
            loading="lazy"
          />
        </CompanyLogoWrapper>
      </StyledSlide>
    );
  });

  return (
    <>
      {logo.length > 1 && (
        <ProductionLogoWrapper>
          <h2>Production Companies</h2>
          <StyledCarousel
            height={190}
            loop
            align="start"
            slidesToScroll={1}
            plugins={[autoplay.current]}
            withControls={14}
            sx={{ maxWidth: 500 }}
            classNames={classes}
          >
            {logoElements}
          </StyledCarousel>
        </ProductionLogoWrapper>
      )}
    </>
  );
};

export default Logo;
