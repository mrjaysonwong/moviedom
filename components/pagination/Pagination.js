import { movieMaxPages, scrollTop } from '@utils/common/common';
import ReactPaginate from 'react-paginate';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const PaginateWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: min(90%, 100vw);
  margin-inline: auto;
  margin-top: 2rem;

  ul {
    display: flex;
    background: black;
    border-radius: var(--borderRadius);
    padding: 0 0.5rem;
  }

  li {
    padding: 8px;
    cursor: pointer;
    font-size: clamp(0.9rem, 2vw, 1rem);

    &:hover {
      color: dimgray;
    }
  }

  .active {
    color: var(--gold);
  }
`;

const Pagination = (props) => {
  const router = useRouter();

  const paginationHandler = (pagenum) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = pagenum.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });

    scrollTop();
  };

  return (
    <>
      <PaginateWrapper>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          activeClassName={'active'}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          pageCount={movieMaxPages(props.totalpages)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={(e) => paginationHandler(e)}
          initialPage={props.currentpage - 1}
        />
      </PaginateWrapper>
    </>
  );
};

export default Pagination;
