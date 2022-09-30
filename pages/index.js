import styled from '@emotion/styled';
import { homeDataPage } from '@utils/apis/api';
import MovieList from '@components/movies/MovieList';
import HeaderCarousel from '@components/header/Carousel';

const HomepageWrapper = styled.div`
  
`;

// domain.com/
const Home = ({ data }) => {
  return (
    <>
      <HomepageWrapper>
        <HeaderCarousel data={data.popular} />
        <MovieList data={data.toprated} />
      </HomepageWrapper>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { ...data } = await homeDataPage();
  // console.log(data.upcoming);
  return {
    props: {
      data,
    },
  };
}

export default Home;
