import Head from 'next/head';
import { homeDataPage } from '@utils/apis/api';
import MovieList from '@components/movies/movie-list/MovieList';
import HeaderCarousel from '@components/movies/header/Carousel';
import useNavstore from '@stores/navbar-store';
import { useEffect } from 'react';
import { filterData, movieMaxResults } from '@utils/common/common';

// domain.com/
const Home = ({ movies }) => {
  useEffect(() => {
    useNavstore.setState({ routepath: '/' });
  }, []);

  return (
    <>
      <Head>
        <title>MovieDom</title>
      </Head>

      <HeaderCarousel data={filterData(movies.popular.results)} />

      <MovieList
        data={filterData(movies.upcoming.results)}
        total_results={movieMaxResults(movies.upcoming.total_results)}
        viewBtn={true}
        title="Upcoming Movies"
        link="/movie/upcoming?page=1"
        type="movie"
      />
      <MovieList
        data={filterData(movies.toprated.results)}
        total_results={movieMaxResults(movies.toprated.total_results)}
        viewBtn={true}
        title="Top-Rated Movies"
        link="/movie/top-rated?page=1"
        type="movie"
      />
      {/* <MovieList
        data={filterData(movies.popular.results)}
        total_results={movieMaxResults(movies.popular.total_results)}
        viewBtn={true}
        title="Popular Movies"
        link="/movie/popular?page=1"
        type='movie'
      /> */}
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const { ...movies } = await homeDataPage();
  // console.log(movies.upcoming);

  return {
    props: {
      movies,
    },
  };
};

export default Home;
