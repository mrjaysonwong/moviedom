import styled from '@emotion/styled';

const MovieListWrapper = styled.div`
  .movies {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 4rem 2rem;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .movie-card {
    border: 1px solid;
    height: 360px;
  }
`;

const Movie = (props) => {
  const movieElements = props.data.results.map((movie, index) => {
    return (
      <div key={index} className="movie-card">
        {movie.title}
      </div>
    );
  });

  return (
    <>
      <MovieListWrapper>
        <div className="movies">{movieElements}</div>
      </MovieListWrapper>
    </>
  );
};

export default Movie;
