import Head from 'next/head';
import useNavstore from '@stores/navbar-store';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import SearchItem from '@components/search/SearchItem';
import { requestData, searchUrl } from '@utils/apis/config';

const SearchItemWrapper = styled.div`
  padding-top: 90px;
`;

const Search = (props) => {
  useEffect(() => {
    useNavstore.setState({ routepath: [] });
  }, []);

  return (
    <>
      <Head>
        <title>{`${props.search_query} - MovieDom`}</title>
      </Head>

      <SearchItemWrapper>
        <SearchItem
          total_results={props.multi_query.total_results}
          currentpage={props.currentPage}
          query={props.search_query}
          mtotal_results={props.m_query.total_results}
          tvtotal_results={props.tv_query.total_results}
          ptotal_results={props.p_query.total_results}
          mdata={props.m_query}
          mtotalpages={props.m_query.total_pages}
          mcurrentpage={props.mcurrentPage}
          tvdata={props.tv_query}
          tvtotalpages={props.tv_query.total_pages}
          tvcurrenpage={props.tvcurrentPage}
          pdata={props.p_query}
          ptotalpages={props.p_query.total_pages}
        />
      </SearchItemWrapper>
    </>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const page = query.page || 1;
  const q = query.search;

  const multi_query = await requestData(searchUrl(`${q}`, `${page}`, 'multi'));
  const m_query = await requestData(searchUrl(`${q}`, `${page}`, 'movie'));
  const tv_query = await requestData(searchUrl(`${q}`, `${page}`, 'tv'));
  const p_query = await requestData(searchUrl(`${q}`, `${page}`, 'person'));

  return {
    props: {
      multi_query,
      m_query,
      tv_query,
      p_query,
      currentPage: page,
      search_query: q,
    },
  };
};

export default Search;
