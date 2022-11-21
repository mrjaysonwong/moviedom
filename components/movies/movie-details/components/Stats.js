import styled from '@emotion/styled';
import { filterLanguages } from '@utils/common/common';
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

const Stats = ({ stats, type }) => {
  const lang = filterLanguages(stats, stats.original_language);

  return (
    <>
      <StatsWrapper>
        <h2>{type === 'movie' ? 'Movie' : 'Show'} Stats</h2>
        <StatsFacts>
          <p>
            <span className="facts">Status</span>
            <span>{stats && stats.status}</span>
          </p>
          {type === 'movie' ? (
            <p>
              <span className="facts">Budget</span>
              <span>
                {stats.budget === 0
                  ? 'Not Given'
                  : `$${stats.budget.toLocaleString('en-US')}.00`}
              </span>
            </p>
          ) : (
            <p>
              <span className="facts">Network</span>
              <span>
                {stats.networks.length !== 0
                  ? stats.networks[0].name
                  : 'Not Given'}
              </span>
            </p>
          )}
          {type === 'movie' ? (
            <p>
              <span className="facts">Revenue</span>
              <span>
                {stats.revenue === 0
                  ? 'Not Given'
                  : `$${stats.revenue.toLocaleString('en-US')}.00`}
              </span>
            </p>
          ) : (
            <p>
              <span className="facts">Type</span>
              <span>{stats.type}</span>
            </p>
          )}
          {type === 'movie' && (
            <p>
              <span className="facts">Production Company</span>
              <span>
                {!stats.production_companies[0]
                  ? 'Not Given'
                  : stats.production_companies[0].name}
              </span>
            </p>
          )}
          <p>
            <span className="facts">Original Language</span>
            <span>
              {lang.length !== 0 ? lang[0].english_name : 'Not Given'}
            </span>
          </p>
        </StatsFacts>
      </StatsWrapper>
    </>
  );
};

export default Stats;
