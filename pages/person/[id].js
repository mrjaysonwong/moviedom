import { useEffect } from 'react';
import Head from 'next/head';
import useNavstore from '@stores/navbar-store';
import Details from '@components/people/person-details/Details';
import { fetchMovieDetails } from '@utils/apis/config';

const PersonDetails = ({ data }) => {
  useEffect(() => {
    useNavstore.setState({ routepath: [] });
  }, []);

  return (
    <>
      <Head>
        <title>{`${data.details.name} - MovieDom`}</title>
      </Head>

      <Details data={data} />
    </>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const id = params.id;

  // function to fetch Person details
  async function personDetails() {
    const details = await fetchMovieDetails(`/person/${id}`);
    const credits = await fetchMovieDetails(`/person/${id}, /combined_credits`);
    const images = await fetchMovieDetails(`/person/${id}, /images`);

    return { details, credits, images };
  }

  const { ...data } = await personDetails();

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

export default PersonDetails;
