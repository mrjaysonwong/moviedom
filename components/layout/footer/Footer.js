import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { routes } from '@utils/routes/routes';
import Link from 'next/link';
import { socials } from '@utils/socials/social-media';
import useNavstore from '@stores/navbar-store';
import Image from 'next/image';
import { devices } from '@utils/devices/devices';

const FooterWrapper = styled.div`
  height: 500px;
  background: var(--background-secondary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 4px solid transparent;
  border-style: solid;
  border-image: var(--linear);
`;

const NavWrapper = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-inline: auto;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media ${devices.mobileLMaxWidth} {
    width: min(90%, 100vw);
  }

  .menu {
    padding: 0 0.2rem;

    .page-active {
      color: var(--gold);
    }
  }

  .menu-list {
    min-width: 100px;
    text-align: center;
    padding: 0.5rem;
  }

  .menu-title {
    font-weight: 500;
  }
`;

const CopyrightWrapper = styled.div`
  width: 250px;
  font-weight: 300;
  padding: 1.5rem 0;
  margin-inline: auto;
  color: gray;
`;

const SocialWrapper = styled.div`
  font-size: 2.5rem;
  display: flex;
  justify-content: center;

  .social-icon-list {
    padding: 10px;
  }

  a {
    color: var(--primary-color);
    display: flex;
  }
`;

const StyledLink = styled.a`
  color: #fff;

  &:hover {
    color: var(--gold);
  }
`;

const BrandLogo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Footer = () => {
  const { handleClick, routepath } = useNavstore((state) => ({
    handleClick: state.handleClick,
    routepath: state.routepath,
  }));

  const [links, setLinks] = useState([]);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = () => {
    setLinks(routes);
  };

  const menuElements = links.map((item, index) => {
    return (
      <ul key={index} className="menu">
        <li className="menu-list">
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
        </li>
      </ul>
    );
  });

  const socialsElements = socials.map((item, index) => {
    return (
      <ul key={index} className="social-icon">
        <li className="social-icon-list">
          <a href={item.link} target="_blank" rel="noreferrer">
            {item.socialicon}
          </a>
        </li>
      </ul>
    );
  });

  return (
    <>
      <FooterWrapper>
        <footer>
          <NavWrapper>{menuElements}</NavWrapper>
          <CopyrightWrapper>
            <BrandLogo>
              <a
                href="https://mrjaysonwong.dev/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/mylogo.png"
                  alt="Jayson Wong logo"
                  width="240px"
                  height="60px"
                  quality={100}
                  loading="lazy"
                />
              </a>
            </BrandLogo>
            <p>
              A project for fun, learning, and creativity. © Jayson Wong 2022.
            </p>
          </CopyrightWrapper>
          <SocialWrapper>{socialsElements}</SocialWrapper>
        </footer>
      </FooterWrapper>
    </>
  );
};

export default Footer;
