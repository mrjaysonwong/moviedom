import ContentContainer from './ContentContainer';
import Navbar from '@components/navbar/Navbar';
import Footer from '@components/footer/Footer';
import styled from '@emotion/styled';
import { devices } from '@utils/devices/devices';
import useNavstore from '@stores/navbar-store';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ sidebar }) => (!sidebar ? 'none' : 'block')};
  z-index: 1;

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
        <ContentContainer>{children}</ContentContainer>
        <Footer />
     
    </>
  );
};

export default Layout;
