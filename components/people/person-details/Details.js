import styled from '@emotion/styled';
import Header from './components/Header';
import Credits from './components/Credits';
import Stats from './components/Stats';
import Media from './components/Media';
import { devices } from '@utils/devices/devices';
import { filterCreditsCast, filterCreditsCrew } from '@utils/common/common';

const BackgroundOverlay = styled.div`
  background: rgb(50, 17, 43);
  background: linear-gradient(
    240deg,
    rgba(50, 17, 43, 1) 0%,
    rgba(2, 0, 36, 1) 100%
  );
`;

const CreditsWrapper = styled.div`
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
      <Header person={props.data.details} />

      <section id="credits stats">
        <BackgroundOverlay>
          <CreditsWrapper>
            <Credits
              credits={
                props.data.details.known_for_department === 'Acting'
                  ? filterCreditsCast(props.data.credits)
                  : filterCreditsCrew(props.data.credits)
              }
            />
            <Stats stats={props.data.details} />
          </CreditsWrapper>
        </BackgroundOverlay>
      </section>

      <Media images={props.data.images} />
    </>
  );
};

export default Details;
