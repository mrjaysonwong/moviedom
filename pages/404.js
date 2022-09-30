import Link from 'next/link';
import styled from '@emotion/styled';
import useNavstore from '@stores/navbar-store';
import Image from 'next/image';
import stickerError from '../public/stickerError.png';

const NotFoundWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 100vh;

  a {
    color: var(--gold);
  }

  .status-wrapper {
    display: flex;
    align-items: center;
  }
`;

const Custom404 = () => {
  const handleClick = useNavstore((state) => state.handleClick);
  useNavstore.setState({ pageactive: [] });

  return (
    <>
      <NotFoundWrapper>
        <Image
          src={stickerError}
          alt="Sticker Error"
          width="256px"
          height="256px"
          quality={100}
          loading="lazy"
        />
        <div className="status-wrapper">
          <h1>404: Page Not Found</h1>
        </div>

        <p>
          Go to the{' '}
          <Link href="/" passHref>
            <a onClick={() => handleClick('/')}>Homepage</a>
          </Link>
        </p>
      </NotFoundWrapper>
    </>
  );
};

export default Custom404;
