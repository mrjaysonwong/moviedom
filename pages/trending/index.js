import Head from 'next/head';
import { trendingDataPage } from '@utils/apis/api';
import MovieList from '@components/movies/movie-list/MovieList';
import useNavstore from '@stores/navbar-store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { filterData, movieMaxResults } from '@utils/common/common';
import styled from '@emotion/styled';

const MovieListWrapper = styled.div`
  padding-top: 60px;
`;

// domain.com/trending
const Trending = ({ trending }) => {
  const router = useRouter();
  useEffect(() => {
    useNavstore.setState({ routepath: '/trending' });
    router.prefetch('/trending');
  }, []);
  return (
    <>
      <Head>
        <title>Trending - MovieDom</title>
      </Head>

      <MovieListWrapper>
        <MovieList
          data={filterData(trending.movies_trending.results)}
          total_results={movieMaxResults(
            trending.movies_trending.total_results
          )}
          viewBtn={true}
          title="Trending Movies"
          link="/trending/movies?page=1"
          type="movie"
        />
        <MovieList
          data={filterData(trending.tv_trending.results)}
          total_results={movieMaxResults(trending.tv_trending.total_results)}
          viewBtn={true}
          title="Trending TV Shows"
          link="/trending/tv?page=1"
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

  const { ...trending } = await trendingDataPage();
  // console.log(trending.movies_trending);

  return {
    props: {
      trending,
    },
  };
};

export default Trending;
