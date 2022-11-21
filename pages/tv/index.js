import Head from 'next/head';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { tvDataPage } from '@utils/apis/api';
import MovieList from '@components/movies/movie-list/MovieList';
import useNavstore from '@stores/navbar-store';
import { filterData, movieMaxResults } from '@utils/common/common';

const MovieListWrapper = styled.div`
  padding-top: 60px;
`;

// domain.com/tv
const TvShows = ({ shows }) => {
  useEffect(() => {
    useNavstore.setState({ routepath: '/tv' });
  }, []);
  return (
    <>
      <Head>
        <title>TV Shows - MovieDom</title>
      </Head>

      <MovieListWrapper>
        <MovieList
          data={filterData(shows.popular.results)}
          total_results={movieMaxResults(shows.popular.total_results)}
          viewBtn={true}
          title="Popular TV Shows"
          link="/tv/popular?page=1"
          type="tv"
        />

        <MovieList
          data={filterData(shows.onair.results)}
          total_results={movieMaxResults(shows.onair.total_results)}
          viewBtn={true}
          title="Airing Today Shows"
          link="/tv/airing-today?page=1"
          type="tv"
        />

        <MovieList
          data={filterData(shows.toprated.results)}
          total_results={movieMaxResults(shows.toprated.total_results)}
          viewBtn={true}
          title="Top-Rated TV Shows"
          link="/tv/top-rated?page=1"
          type="tv"
        />
      </MovieListWrapper>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const { ...shows } = await tvDataPage();
  // console.log(shows.popular);

  return {
    props: {
      shows,
    },
  };
};

export default TvShows;
