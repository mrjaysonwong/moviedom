import styled from '@emotion/styled';
import { Tabs } from '@mantine/core';
import { devices } from '@utils/devices/devices';
import MovieList from '@components/movies/movie-list/MovieList';
import PeopleList from '@components/people/people-list/PeopleList';
import Pagination from '@components/pagination/Pagination';

const SearchResultsWrapper = styled.div`
  width: min(90%, 100vw);
  margin-inline: auto;

  h2 > span {
    color: var(--gold);
  }

  h4 > span {
    color: gray;
    font-style: italic;
  }
`;

const StyledTabs = styled(Tabs)`
  margin-top: 2rem;

  .mantine-Tabs-tabLabel {
    color: #fff;
  }

  @media ${devices.laptopMaxWidth} {
    button {
      padding: 1rem;
    }
  }

  button:hover {
    background: var(--hover-secondary);
  }
`;

const Wrapper = styled.div`
  margin-top: 1rem;
`;

const SearchItem = (props) => {
  return (
    <>
      <SearchResultsWrapper>
        <h2>
          Search Results:{' '}
          <span>{props.total_results.toLocaleString('en-US')}</span>
        </h2>
        <h4>
          keywords: <span>{props.query}</span>
        </h4>
        <StyledTabs defaultValue="first">
          <Tabs.List grow>
            <Tabs.Tab value="first">
              Movies ({props.mtotal_results.toLocaleString('en-US')})
            </Tabs.Tab>
            <Tabs.Tab value="second">
              TV Shows ({props.tvtotal_results.toLocaleString('en-US')})
            </Tabs.Tab>
            <Tabs.Tab value="third">
              People ({props.ptotal_results.toLocaleString('en-US')})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
            <Wrapper>
              {props.mdata.results.length === 0 ? (
                'No Results, Try TV Shows or People Tab'
              ) : (
                <MovieList
                  data={props.mdata.results}
                  type="movie"
                  onsearch={true}
                />
              )}
            </Wrapper>
            {props.mtotal_results > 20 && (
              <Pagination
                totalpages={props.mtotalpages}
                currentpage={props.currentpage}
              />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="second" pt="xs">
            <Wrapper>
              {props.tvdata.results.length === 0 ? (
                'No Results, Try Movies or People Tab'
              ) : (
                <MovieList
                  data={props.tvdata.results}
                  type="tv"
                  onsearch={true}
                />
              )}
            </Wrapper>
            {props.tvtotal_results > 20 && (
              <Pagination
                totalpages={props.tvtotalpages}
                currentpage={props.currentpage}
              />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="third" pt="xs">
            <Wrapper>
              {props.pdata.results.length === 0 ? (
                'No Results, Try Movies, TV Shows Tab'
              ) : (
                <PeopleList data={props.pdata.results} onsearch={true} />
              )}
            </Wrapper>
            {props.ptotal_results > 20 && (
              <Pagination
                totalpages={props.ptotalpages}
                currentpage={props.currentpage}
              />
            )}
          </Tabs.Panel>
        </StyledTabs>
      </SearchResultsWrapper>
    </>
  );
};

export default SearchItem;
