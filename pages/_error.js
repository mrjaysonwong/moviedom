import { useEffect } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import useNavstore from '@stores/navbar-store';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useStyles } from '@utils/hooks/errorPages';
import Link from 'next/link';

const ServerErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  min-height: 100vh;
`;

const Label = styled.div`
  .label-one {
    color: dimgray;
  }
`;

function Error({ statusCode }) {
  const handleClick = useNavstore((state) => state.handleClick);

  const { classes } = useStyles();

  useEffect(() => {
    useNavstore.setState({ routepath: [] });
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>
      <Head>
        <title>{`${statusCode} Error - MovieDom`}</title>
      </Head>

      <ServerErrorWrapper>
        <Container className={classes.root}>
          <Label>
            <div className={`${classes.label} label-one`}>{statusCode}</div>
          </Label>
          <Label>
            <Title className={classes.title}>
              <div className="label-two">
                {statusCode === 404 ? 'Page Not Found.' : 'Server Error'}
              </div>
            </Title>
          </Label>

          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            {statusCode === 404
              ? 'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL.'
              : `Our servers could not handle your request. Don't worry, our
            development team was already notified. Try refreshing the page.`}
          </Text>
          {statusCode !== 404 && (
            <Group position="center">
              <Button
                variant="subtle"
                size="md"
                onClick={() => refreshPage(true)}
              >
                Refresh the page
              </Button>
            </Group>
          )}
          <Group position="center">
            <Link href="/" passHref>
              <a onClick={() => handleClick('/')}>
                <Button variant="subtle" size="md">
                  Take me back to home
                </Button>
              </a>
            </Link>
          </Group>
        </Container>
      </ServerErrorWrapper>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
