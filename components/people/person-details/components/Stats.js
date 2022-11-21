import styled from '@emotion/styled';
import { filterKnownAs, formatGender } from '@utils/common/common';
import { devices } from '@utils/devices/devices';

const StatsWrapper = styled.div`
  padding: 1.5rem 0;

  @media ${devices.laptopMinWidth} {
    padding: 1.5rem;
  }
`;

const StatsFacts = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;

  p {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
    margin-right: 0.5rem;
    width: min(190px, 100vw);
  }

  .facts {
    color: var(--primary-color);
    letter-spacing: 0.5px;
  }
`;

const Stats = ({ stats }) => {
  return (
    <>
      <StatsWrapper>
        <h2>Person Stats</h2>
        <StatsFacts>
          <p>
            <span className="facts">Known For</span>
            <span>{stats.known_for_department}</span>
          </p>
          <p>
            <span className="facts">Gender</span>
            <span>{formatGender(stats.gender)}</span>
          </p>
          <p>
            <span className="facts">Birthday</span>
            <span>{stats.birthday ? stats.birthday : 'Not Given'}</span>
          </p>
          <p>
            <span className="facts">Place of Birth</span>
            <span>
              {stats.place_of_birth ? stats.place_of_birth : 'Not Given'}
            </span>
          </p>
          <p>
            <span className="facts">Also Known As</span>
            <span>
              {stats.also_known_as.length !== 0
                ? filterKnownAs(stats.also_known_as)
                : 'Not Given'}
            </span>
          </p>
        </StatsFacts>
      </StatsWrapper>
    </>
  );
};

export default Stats;
