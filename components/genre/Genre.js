import Link from 'next/link';
import styled from '@emotion/styled';
import { genreDataPage } from '@utils/apis/api';
import { Select } from '@mantine/core';
import { devices } from '@utils/devices/devices';
import { useEffect, useState } from 'react';

const slugify = require('slugify');

const Container = styled.div`
  display: grid;
  width: 100%;
  gap: 1.3rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 3fr));

  div {
    background-image: url('https://images.pexels.com/photos/7234393/pexels-photo-7234393.jpeg?auto=compress&cs=tinysrgb&w=700');
    background-repeat: no-repeat, no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: var(--borderRadius);
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }

  .genre {
    text-align: center;
    border-radius: var(--borderRadius);
    transition: transform 0.2s;

    a {
      background: -webkit-linear-gradient(lightblue, darkorchid);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /*
    background: rgb(65, 45, 73);
    background: linear-gradient(
      -40deg,
      rgba(65, 45, 73, 1) 0%,
      rgba(17, 48, 73, 1) 100%
    );
    

    &:hover {
      transform: scale(1.1);
    }
    */

    display: ${({ isMovie, isTV }) => (isMovie || isTV ? 'block' : 'none')};
  }
`;

const StyledSelect = styled(Select)`
  width: min(50%, 100vw);
  margin-bottom: 2rem;

  @media ${devices.laptopMinWidth} {
    width: min(20%, 100vw);
  }

  label {
    color: #fff;
    font-size: clamp(1rem, 5vw, 1.5rem);
    margin-bottom: 0.5rem;
  }
`;

const Genre = (props) => {
  const [value, setValue] = useState(null);
  const [isMovie, setIsMovie] = useState(false);
  const [isTV, setIsTV] = useState(false);

  useEffect(() => {
    if (value === 'movie') {
      setIsMovie(true);
    }
    if (value === 'tv') {
      setIsTV(true);
      setIsMovie(false);
    }
  }, [value]);

  const movie_genres = props.movie.genres.map((genre) => {
    return (
      <div key={genre.id} id="movie">
        <h2 className="genre">
          <Link
            href={`/genre/movie/${genre.id}_${slugify(genre.name, {
              lower: true,
              remove: /[*+~.()'"!:@/]/g,
            })}`}
            passHref
          >
            <a>{genre.name}</a>
          </Link>
        </h2>
      </div>
    );
  });

  const tv_genres = props.tv.genres.map((genre) => {
    return (
      <div key={genre.id} id="tv">
        <h2 className="genre">
          <Link
            href={`/genre/tv/${genre.id}_${slugify(genre.name, {
              lower: true,
              remove: /[*+~.()'"!:@/]/g,
            })}`}
            passHref
          >
            <a>{genre.name}</a>
          </Link>
        </h2>
      </div>
    );
  });

  return (
    <>
      <StyledSelect
        label="Select Genre For"
        placeholder="Pick one"
        data={[
          { value: 'movie', label: 'Movie' },
          { value: 'tv', label: 'TV' },
        ]}
        onChange={setValue}
      />
      <Container isMovie={isMovie} isTV={isTV}>
        {isMovie ? movie_genres : tv_genres}
      </Container>
    </>
  );
};

export default Genre;
