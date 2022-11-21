import styled from '@emotion/styled';

const MovieTagline = styled.div`
  margin: 0.5rem 0;

  .tagline {
    font-style: italic;
    color: rgba(0, 244, 244, 0.9);
  }
`;

const Tagline = ({ movie }) => {
  return (
    <>
      {movie.tagline && (
        <MovieTagline>
          <p className="tagline">{movie.tagline}</p>
        </MovieTagline>
      )}
    </>
  );
};

export default Tagline;
