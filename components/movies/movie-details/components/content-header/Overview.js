import styled from '@emotion/styled';

const OverviewWrapper = styled.div`
  p {
    max-height: 150px;
    overflow-y: auto;
  }

  h2 {
    margin-bottom: 5px;
  }
`;

const Overview = ({ movie }) => {
  return (
    <>
      <OverviewWrapper>
        <h2>Overview</h2>
        <p>
          {movie.overview
            ? movie.overview
            : `We don't have an overview translated in English`}
        </p>
      </OverviewWrapper>
    </>
  );
};

export default Overview;
