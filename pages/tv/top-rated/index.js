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

// domain.com/movie/tv/top-rated
const TopRated = (props) => {
  const router = useRouter();

  useEffect(() => {
    useNavstore.setState({ routepath: '/tv/top-rated' });
    router.prefetch('/tv/top-rated');
  }, []);

  return (
    <>
      <Head>
        <title>{`${props.title} - MovieDom`}</title>
      </Head>

      <MovieListWrapper>
        <MovieList
          data={props.shows}
          title={props.title}
          total_results={movieMaxResults(props.totalResults)}
          cpage={props.currentPage}
          type="tv"
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

  const shows = await getDataPage('/tv/top_rated', `${page}`);

  if (
    query.page < 1 ||
    query.page > 500 ||
    query.page > shows.data.total_pages
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      shows: shows.data.results,
      totalPages: shows.data.total_pages,
      totalResults: shows.data.total_results,
      title: 'Top-Rated TV Shows',
      currentPage: page,
    },
  };
};

export default TopRated;
