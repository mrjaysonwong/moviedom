import styled from '@emotion/styled';
import MainContainer from '@components/layout/MainContainer';
import Navbar from '@components/layout/navbar/Navbar';
import Footer from '@components/layout/footer/Footer';
import { devices } from '@utils/devices/devices';
import useNavstore from '@stores/navbar-store';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ sidebar }) => (!sidebar ? 'none' : 'block')};
  z-index: 19;

  @media ${devices.laptopMaxWidth} {
    background: var(--overlay-opacity);
    backdrop-filter: blur(2px);
  }
`;

const Layout = ({ children }) => {
  const sidebar = useNavstore((state) => state.sidebar);
  return (
    <>
      <Navbar />
      <Overlay sidebar={sidebar}></Overlay>
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
};

export default Layout;
