import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useNavstore from '@stores/navbar-store';
import Image from 'next/image';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import { routes } from '@utils/routes/routes';
import { devices } from '@utils/devices/devices';
import useClickOutside from '@utils/hooks/useClickOutside';
import { Tooltip } from '@mantine/core';
import appLogo from '@public/logo.png';
import Search from './Search';

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: ${({ bgopac, bgfill, sidebar }) =>
    !bgopac && !bgfill
      ? 'var(--background-primary)'
      : sidebar
      ? 'var(--background-primary)'
      : ''};
  transition: all 0.5s ease;
  color: #fff;
  z-index: 20;
  display: flex;
  align-items: center;

  &:hover {
    background: var(--background-primary);
  }

  &&.show {
    top: 0px;
  }

  &&.hide {
    top: 60px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: min(90%, 100vw);
  margin-inline: auto;
`;

const NavbarLogo = styled.a`
  cursor: pointer;
  display: flex;
  margin-right: 1rem;

  @media ${devices.laptopMaxWidth} {
    margin-inline: auto;
  }
`;

const NavMenuWrapper = styled.div`
  overflow-y: auto;

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
    @media ${devices.laptopMaxWidth} {
      margin: 0 1rem;
    }
  }

  .menu-list,
  .submenu-list {
    .page-active {
      color: var(--gold);
    }
  }

  .menu-wrapper {
    display: flex;
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
    top: 60px;
    left: 0;
    right: 0;
    width: 256px;
    height: 100vh;
    background: var(--background-primary);
    transform: translateX(${({ sidebar }) => (sidebar ? '0%' : '-100%')});
    transition: all 0.5s ease;
    padding: 4rem 0;

    .menu-list {
      padding: 0 0.8rem;

      &:hover {
        background: var(--hover-gray);
      }
    }

    .submenu-list {
      padding: 0.8rem 2rem;
      display: flex;
      align-items: center;

      &::before {
        content: '⦿';
        margin-right: 0.8rem;
      }
    }

    .menu-title {
      margin: 0 1rem;
    }

    .menu-wrapper {
      padding: 0.8rem 0;
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
      top: 60px;
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
    position: absolute;
    top: 0;
    width: 100%;
  }

  @media ${devices.laptopMinWidth} {
    margin-left: auto;
    padding-left: 1rem;
  }
`;

const Navbar = () => {
  const { sidebar, toggleSidebar, handleClick, routepath, subnav, showSubnav } =
    useNavstore((state) => ({
      sidebar: state.sidebar,
      toggleSidebar: state.toggleSidebar,
      routepath: state.routepath,
      handleClick: state.handleClick,
      subnav: state.subnav,
      showSubnav: state.showSubnav,
    }));

  const [links, setLinks] = useState([]);
  const [bgopac, setBgOpac] = useState(true);
  const [bgfill, setBgFill] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > 20) {
      setBgOpac(false);
    } else if (window.scrollY < 120) {
      setBgOpac(true);
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
          {routepath === item.path ? item.ifill : item.ioutline}
        </span>
        <span className="menu-title">
          <Link href={item.path} passHref>
            <StyledLink
              onClick={() => handleClick(item.path)}
              className={routepath === item.path ? 'page-active' : ''}
            >
              {item.title}
            </StyledLink>
          </Link>
        </span>
        {item.subNav ? (
          <span className="drop-icon" onClick={() => showSubnav()}>
            {subnav && item.subNav ? item.iopened : item.iclosed}
          </span>
        ) : null}
      </div>
      {item.subNav ? (
        <div className="submenu-wrapper">
          <ul className="submenu" onMouseLeave={() => showSubnav(false)}>
            {subnav &&
              item.subNav?.map((item, index) => (
                <li key={index} className="submenu-list">
                  <span className="submenu-title">
                    <Link href={item.path} passHref>
                      <StyledLink
                        onClick={() => handleClick(item.path)}
                        className={routepath === item.path ? 'page-active' : ''}
                      >
                        {item.title}
                      </StyledLink>
                    </Link>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </li>
  ));

  return (
    <>
      <NavbarWrapper
        ref={domNode}
        bgopac={bgopac}
        bgfill={bgfill}
        sidebar={sidebar}
      >
        <Container>
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
          <Link href={'/'} passHref>
            <Tooltip label="MovieDom Home" withArrow color="dark">
              <NavbarLogo>
                <Image
                  src='/moviedom_logo.png'
                  alt="MovieDom logo"
                  width="190px"
                  height="33px"
                  quality={100}
                  priority
                  onClick={() => handleClick('/')}
                />
              </NavbarLogo>
            </Tooltip>
          </Link>
          <NavMenuWrapper sidebar={sidebar} ref={domNode}>
            <ul className="menu">{menuElements}</ul>
            <SearchWrapper>
              <Search />
            </SearchWrapper>
          </NavMenuWrapper>
        </Container>
      </NavbarWrapper>
    </>
  );
};

export default Navbar;
