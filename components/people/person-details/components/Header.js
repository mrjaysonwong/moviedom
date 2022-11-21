import styled from '@emotion/styled';
import { devices } from '@utils/devices/devices';
import DisplayPhoto from './content-header/DisplayPhoto';

const LandingHeader = styled.div`
  width: min(90%, 100vw);
  margin-inline: auto;
  padding: 60px 0;
`;

const PersonContent = styled.div`
  margin: 1rem 0;

  @media ${devices.laptopMinWidth} {
    display: flex;
    align-items: center;
  }
`;

const PersonalInfo = styled.div`
  h1 {
    margin-bottom: 1.5rem;
    font-size: clamp(2.5rem, 5vw, 5rem);
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    margin-bottom: 0.5rem;
  }

  @media ${devices.laptopMinWidth} {
    margin-left: 1.5rem;

    p {
      max-height: 250px;
      overflow-y: auto;
    }
  }
`;

const Header = ({ person }) => {
  return (
    <>
      <LandingHeader>
        <PersonContent>
          <DisplayPhoto person={person} />
          <PersonalInfo>
            <h1>{person.name}</h1>
            <h2>Biography</h2>
            <p>
              {person.biography
                ? person.biography
                : `We don't have a biography for ${person.name}.`}
            </p>
          </PersonalInfo>
        </PersonContent>
      </LandingHeader>
    </>
  );
};

export default Header;
