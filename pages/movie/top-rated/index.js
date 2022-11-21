import styled from '@emotion/styled';
import Head from 'next/head';
import useNavstore from '@stores/navbar-store';
import MovieList from '@components/movies/movie-list/MovieList';
import { useEffect } from 'react';
import { getDataPage } from '@utils/apis/api';
import { useRouter } from 'next/router';
import { movieMaxResults } from '@utils/common/common';
import Pagination from '@components/pagination/Pagination';

const MovieListWrapper = styled.div`
  padding-top: 60px;
`;

// domain.com/movie/top-rated
const TopRated = (props) => {
  const router = useRouter();

  useEffect(() => {
    useNavstore.setState({ routepath: '/movie/top-rated' });
    router.prefetch('/movie/top-rated');
  }, []);

  return (
    <>
      <Head>
        <title>{`${props.title} - MovieDom`}</title>
      </Head>

      <MovieListWrapper>
        <MovieList
          data={props.movies}
          title={props.title}
          total_results={movieMaxResults(props.totalResults)}
          cpage={props.currentPage}
          type="movie"
        />
      </MovieListWrapper>

      <Pagination
        totalpages={props.totalPages}
        currentpage={props.currentPage}
      />
    </>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const page = query.page || 1;

  const movies = await getDataPage('/movie/top_rated', `${page}`);

  if (
    query.page < 1 ||
    query.page > 500 ||
    query.page > movies.data.total_pages
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movies: movies.data.results,
      totalPages: movies.data.total_pages,
      totalResults: movies.data.total_results,
      title: 'Top-Rated Movies',
      currentPage: page,
    },
  };
};

export default TopRated;
