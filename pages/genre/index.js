import styled from '@emotion/styled';
import Head from 'next/head';
import { genreDataPage } from '@utils/apis/api';
import GenreList from '@components/genre/Genre';

const GenreListWrapper = styled.div`
  padding-top: 106px;
  width: min(85%, 100vw);
  margin-inline: auto;

  h2 {
    margin: 1rem 0;
  }
`;

// domain.com/genre
const Genre = (props) => {
  return (
    <>
      <Head>
        <title>Genre - MovieDom</title>
      </Head>

      <GenreListWrapper>
        <GenreList movie={props.movie} tv={props.tv} />
      </GenreListWrapper>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const { movie } = await genreDataPage();
  const { tv } = await genreDataPage();

  return {
    props: {
      movie,
      tv,
    },
  };
};

export default Genre;
