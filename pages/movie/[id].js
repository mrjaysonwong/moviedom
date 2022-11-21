import { useEffect } from 'react';
import Head from 'next/head';
import useNavstore from '@stores/navbar-store';
import Details from '@components/movies/movie-details/Details';
import { fetchMovieDetails } from '@utils/apis/config';

const MovieDetails = ({ data }) => {
  useEffect(() => {
    useNavstore.setState({ routepath: [] });
  }, []);

  return (
    <>
      <Head>
        <title>{`${data.details.title} - MovieDom`}</title>
      </Head>

      <Details data={data} type="movie" />
    </>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const id = params.id;

  // function to fetch Movie details
  async function movieDetails() {
    const details = await fetchMovieDetails(`/movie/${id}`);
    const cast = await fetchMovieDetails(`/movie/${id}, /credits`);
    const release_dates = await fetchMovieDetails(
      `/movie/${id}, /release_dates`
    );
    const videos = await fetchMovieDetails(`/movie/${id}, /videos`);
    const images = await fetchMovieDetails(`/movie/${id}, /images`);

    return { details, cast, release_dates, videos, images };
  }

  const { ...data } = await movieDetails();

  if (!data.details.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

export default MovieDetails;
