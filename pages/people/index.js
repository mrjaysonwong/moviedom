import styled from '@emotion/styled';
import Head from 'next/head';
import useNavstore from '@stores/navbar-store';
import { useEffect } from 'react';
import { getDataPage } from '@utils/apis/api';
import PeopleList from '@components/people/people-list/PeopleList';
import { useRouter } from 'next/router';
import { movieMaxResults } from '@utils/common/common';
import Pagination from '@components/pagination/Pagination';

const PeopleListWrapper = styled.div`
  padding-top: 60px;
`;

// domain.com/people
const People = (props) => {

  const router = useRouter();

  useEffect(() => {
    useNavstore.setState({ routepath: '/people' });
    router.prefetch('/people');
  }, []);

  return (
    <>
      <Head>
        <title>{`${props.title} - MovieDom`}</title>
      </Head>

      <PeopleListWrapper>
        <PeopleList
          data={props.people}
          title={props.title}
          total_results={movieMaxResults(props.totalResults)}
        />
      </PeopleListWrapper>

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

  const people = await getDataPage('/person/popular', `${page}`);

  if (
    query.page < 1 ||
    query.page > 500 ||
    query.page > people.data.total_pages
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      people: people.data.results,
      totalPages: people.data.total_pages,
      totalResults: people.data.total_results,
      title: 'Popular People',
      currentPage: page,
    },
  };
};

export default People;
