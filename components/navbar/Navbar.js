import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useNavstore from '@stores/navbar-store';
import Image from 'next/image';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import { routes } from '@utils/routes/routes';
import { devices } from '@utils/devices/devices';
import useClickOutside from '@utils/hooks/useClickOutside';
import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { Tooltip } from '@mantine/core';
import appLogo from '../../public/logo.png';

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background: var(--background-opacity);
  transition: all 0.5s ease;
  color: #fff;
  z-index: 20;
  display: flex;
  align-items: center;

  @media ${devices.laptopMaxWidth} {
    background: var(--background-primary);
  }

  @media ${devices.laptopMinWidth} {
    background: ${({ bgtrans, bgfill }) =>
      bgtrans && bgfill ? 'var(--background-primary)' : ''};

    &:hover {
      background: var(--background-primary);
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 1.5rem;

  @media ${devices.mobileLMaxWidth} {
    margin: 0 1rem;
  }

  @media ${devices.laptopMinWidth} {
    margin: 0 4rem;
  }
`;

const NavbarLogo = styled.a`
  cursor: pointer;
  display: flex;
  margin-right: 1rem;
`;

const NavMenuWrapper = styled.div`
  .menu-icon,
  .drop-icon {
    font-size: 1.5rem;
  }

  .drop-icon {
    margin-left: auto;
    cursor: pointer;

    &:hover {
      color: var(--gold);
    }
  }

  .menu-list {
    .menu-wrapper {
      display: flex;
    }
  }

  .menu-list,
  .submenu-list {
    .page-active {
      color: var(--gold);
    }
  }

  span {
    display: flex;
  }

  .menu-title,
  .submenu-title {
    font-weight: 500;
  }

  @media ${devices.laptopMaxWidth} {
    position: absolute;
    top: 80px;
    right: 0;
    width: 256px;
    height: 100vh;
    background: var(--background-primary);
    transform: translateX(${({ sidebar }) => (sidebar ? '0%' : '100%')});
    transition: all 0.5s ease;
    padding: 0.5rem 0;

    .menu-list {
      &:hover {
        background: var(--hover-gray);
      }
    }

    .menu-list,
    .submenu-list {
      padding: 0.8rem 2rem;
    }

    .menu-title {
      margin: 0 1rem;
    }
  }

  @media ${devices.laptopMinWidth} {
    display: flex;
    width: 100%;

    .menu-icon {
      display: none;
    }

    .menu {
      display: flex;
    }

    .menu-list {
      display: flex;
      align-items: center;
      padding: 0 1rem;
    }

    .submenu-wrapper {
      position: absolute;
      top: 80px;
      width: 128px;
      background: var(--gold);
      margin-left: -18px;
    }

    .submenu-list {
      padding: 0.2rem 1rem;

      &:hover {
        background: var(--dropdown-hover);
      }

      a {
        color: var(--dark-gray);

        &:hover {
          color: #efefef;
        }
      }

      .page-active {
        color: var(--primary-color-sharp);
      }
    }
  }
`;

const StyledLink = styled.a`
  color: #fff;

  &:hover {
    color: var(--gold);
  }
`;

const NavIconWrapper = styled.div`
  cursor: pointer;
  padding: 10px;
  margin-left: auto;

  &:active {
    border-radius: 60px;
    background-color: var(--hover-gray);
  }

  i {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
  }

  @media ${devices.laptopMinWidth} {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${devices.laptopMaxWidth} {
    padding: 1rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 0.5rem;
  }

  @media ${devices.laptopMinWidth} {
    margin-left: auto;
    padding-left: 1rem;
  }
`;

const Navbar = () => {
  const {
    sidebar,
    toggleSidebar,
    handleClick,
    pageactive,
    subnav,
    showSubnav,
  } = useNavstore((state) => ({
    sidebar: state.sidebar,
    toggleSidebar: state.toggleSidebar,
    pageactive: state.pageactive,
    handleClick: state.handleClick,
    subnav: state.subnav,
    showSubnav: state.showSubnav,
  }));

  const [links, setLinks] = useState([]);
  const [bgtrans, setBgTrans] = useState(true);
  const [bgfill, setBgFill] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > 50 && window.scrollY < 150) {
      setBgTrans(false);
    } else if (window.scrollY > 150) {
      setBgTrans(true);
      setBgFill(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = () => {
    setLinks(routes);
  };

  let domNode = useClickOutside(() => {
    useNavstore.setState({ sidebar: false, subnav: false });
  });

  const menuElements = links.map((item, index) => (
    <li key={index} className="menu-list">
      <div className="menu-wrapper">
        <span className="menu-icon">
          {pageactive === item.path ? item.ifill : item.ioutline}
        </span>
        <span className="menu-title">
          <Link href={item.path} passHref>
            <StyledLink
              onClick={() => handleClick(item.path)}
              className={pageactive === item.path ? 'page-active' : ''}
            >
              {item.title}
            </StyledLink>
          </Link>
        </span>
        <span className="drop-icon" onClick={() => showSubnav()}>
          {subnav && item.subNav ? item.iopened : item.iclosed}
        </span>
      </div>
      <div className="submenu-wrapper">
        <ul className="submenu">
          {subnav &&
            item.subNav?.map((item, index) => (
              <li key={index} className="submenu-list">
                <span className="submenu-title">
                  <Link href={item.path} passHref>
                    <StyledLink
                      onClick={() => handleClick(item.path)}
                      className={pageactive === item.path ? 'page-active' : ''}
                    >
                      {item.title}
                    </StyledLink>
                  </Link>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </li>
  ));

  return (
    <>
      <NavbarWrapper ref={domNode} bgtrans={bgtrans} bgfill={bgfill}>
        <Container>
          <Link href={'/'} passHref>
            <Tooltip label="MovieDom Home" withArrow color="dark">
              <NavbarLogo>
                <Image
                  src={appLogo}
                  alt="MovieDom logo"
                  width="190px"
                  height="33px"
                  quality={100}
                  loading="lazy"
                  onClick={() => handleClick('/')}
                />
              </NavbarLogo>
            </Tooltip>
          </Link>
          <NavMenuWrapper sidebar={sidebar} ref={domNode}>
            <ul className="menu">{menuElements}</ul>
            <SearchWrapper>
              <form>
                <Input
                  icon={<IconSearch color="var(--primary-color)" />}
                  placeholder="Search"
                />
              </form>
            </SearchWrapper>
          </NavMenuWrapper>
          <NavIconWrapper onClick={() => toggleSidebar()}>
            {!sidebar ? (
              <Tooltip label="Menu" withArrow color="dark">
                <i className="bars-icon">
                  <FaIcons.FaBars />
                </i>
              </Tooltip>
            ) : (
              <i className="times-icon">
                <FaIcons.FaTimes />
              </i>
            )}
          </NavIconWrapper>
        </Container>
      </NavbarWrapper>
    </>
  );
};

export default Navbar;
