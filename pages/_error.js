import Link from 'next/link';
import styled from '@emotion/styled';
import useNavstore from '@stores/navbar-store';
import Image from 'next/image';
import stickerError from '../public/stickerError2.png';

const ServerErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  min-height: 100vh;

  a {
    color: var(--gold);
  }

  .status-wrapper {
    display: flex;
    align-items: center;
  }

  .try-again {
    padding: 0.5rem;
    margin: 0.5rem 0;
    background: var(--gold);
    color: #000;
    cursor: pointer;
    border: none;
  }
`;

function Error({ statusCode }) {
  const handleClick = useNavstore((state) => state.handleClick);
  useNavstore.setState({ pageactive: [] });

  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>
      <ServerErrorWrapper>
        <Image
          src={stickerError}
          alt="Sticker Error"
          width="256px"
          height="256px"
          quality={100}
          loading="lazy"
        />
        <div className="status-wrapper">
          {statusCode && <h1>Error: {statusCode}</h1>}
        </div>
        <p>We are sorry! There was an error</p>
        <button className="try-again button" onClick={() => refreshPage(true)}>
          Try again?
        </button>
        <p>
          Go to the{' '}
          <Link href="/" passHref>
            <a onClick={() => handleClick('/')}>Homepage</a>
          </Link>
        </p>
      </ServerErrorWrapper>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
