import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import Movie from './Movie/Movie';
import { formatScore } from '@utils/common/common';
import Link from 'next/link';

const Wrapper = styled.div`
  padding-top: 2rem 0;
  width: min(90%, 100vw);
  margin-inline: auto;

  h2 {
    margin: 2rem 0;
  }

  .header-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .total-results {
      color: var(--gold);
    }
  }
`;

const MovieWrapper = styled.div`
  width: min(95%, 100vw);
  margin-inline: auto;
  display: grid;
  justify-items: center;
  gap: 2rem 3rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 2fr));
`;

const ButtonWrapper = styled.div`
  margin: 2rem;

  .btn {
    color: black;
    display: flex;
    margin-inline: auto;
  }
`;

const MovieList = (props) => {
  const content = props.data.map((data) => {
    return (
      <Movie
        key={data.id}
        id={data.id}
        poster={data.poster_path}
        title={props.type === 'movie' ? data.title : data.name}
        score={formatScore(data.vote_average)}
        date={props.type === 'movie' ? data.release_date : data.first_air_date}
        type={props.type}
      />
    );
  });

  return (
    <>
      <section id="movies">
        <Wrapper>
          {!props.onsearch && (
            <span className="header-title-wrapper">
              <h2 className="header-title">{props.title}</h2>
              <p className="total-results">
                {props.total_results.toLocaleString('en-US')}{' '}
                {props.type === 'movie' ? 'Movies' : 'Shows'}
              </p>
            </span>
          )}

          <MovieWrapper>{content}</MovieWrapper>

          {props.viewBtn && (
            <ButtonWrapper>
              <Link href={props.link} passHref>
                <a>
                  <Button
                    className="btn view-all"
                    variant="gradient"
                    gradient={{ from: 'var(--gold)', to: 'lime', deg: 105 }}
                  >
                    View All {props.title}
                  </Button>
                </a>
              </Link>
            </ButtonWrapper>
          )}
        </Wrapper>
      </section>
    </>
  );
};

export default MovieList;
