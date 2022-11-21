import { useEffect } from 'react';
import Head from 'next/head';
import useNavstore from '@stores/navbar-store';
import Details from '@components/movies/movie-details/Details';
import { fetchMovieDetails } from '@utils/apis/config';

const TvDetails = ({ data }) => {
  useEffect(() => {
    useNavstore.setState({ routepath: [] });
  }, []);

  return (
    <>
      <Head>
        <title>{`${data.details.name} - MovieDom`}</title>
      </Head>

      <Details data={data} type="tv" />
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
  async function TvDetails() {
    const details = await fetchMovieDetails(`/tv/${id}`);
    const cast = await fetchMovieDetails(`/tv/${id}, /credits`);
    const ratings = await fetchMovieDetails(`/tv/${id}, /content_ratings`);
    const videos = await fetchMovieDetails(`/tv/${id}, /videos`);
    const images = await fetchMovieDetails(`/tv/${id}, /images`);

    return { details, cast, ratings, videos, images };
  }

  const { ...data } = await TvDetails();

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

export default TvDetails;
