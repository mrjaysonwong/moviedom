import styled from '@emotion/styled';
import Link from 'next/link';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';
import { RingProgress, Text } from '@mantine/core';
import Image from 'next/image';

const slugify = require('slugify');

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const MovieCard = styled.div`
  /*  
  box-shadow: var(--card-shadow);
  -webkit-box-shadow: var(--card-shadow);
  -moz-box-shadow: var(--card-shadow);
  */
  border-radius: 0.5rem;
  width: min(150px, 130px);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const PosterImageWrapper = styled.div`
  height: 170px;

  .poster-image {
    border-top-left-radius: var(--imageBorderRadius);
    border-top-right-radius: var(--imageBorderRadius);
    height: 100%;
    width: 100%;
  }
`;

const MovieScore = styled.div`
  position: relative;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  top: -20px;
  left: 10px;
  background: var(--background-primary);
`;

const MovieTitle = styled.div`
  position: relative;
  padding: 0 0.5rem;
  top: -15px;

  p {
    color: gray;
    font-size: clamp(0.7rem, 1.25vw, 0.8rem);
  }

  a {
    color: #fff;

    &:hover {
      color: var(--gold);
    }
  }
`;

const Movie = (props) => {
  return (
    <>
      <MovieCard>
        <PosterImageWrapper>
          <Link
            href={`/${props.type === 'movie' ? 'movie' : 'tv'}/${
              props.id
            }-${slugify(props.title, {
              lower: true,
              remove: /[*+~.()'"!:@/,]/g,
            })}`}
            passHref
          >
            <a>
              <Image
                className="poster-image"
                loader={myLoader}
                src={
                  props.poster
                    ? `${IMAGES_API_original + props.poster}`
                    : '/backup-image.png'
                }
                alt={`${props.title} poster cover`}
                width={150}
                height={200}
                priority
              />
            </a>
          </Link>
        </PosterImageWrapper>
        <MovieScore>
          <RingProgress
            size={50}
            thickness={3}
            roundCaps
            label={
              <Text size="sm" align="center">
                <b>{props.score !== 0 ? `${props.score}%` : 'NR'}</b>
              </Text>
            }
            sections={[
              {
                value: props.score,
                color:
                  props.score === 0
                    ? ''
                    : props.score < 40
                    ? 'red'
                    : props.score < 70
                    ? 'orange'
                    : 'green',
              },
            ]}
          />
        </MovieScore>
        <MovieTitle>
          <Link
            href={`/${props.type === 'movie' ? 'movie' : 'tv'}/${
              props.id
            }-${slugify(props.title, {
              lower: true,
              remove: /[*+~.()'"!:@/,]/g,
            })}`}
            passHref
          >
            <a>
              <h4>{props.title}</h4>
            </a>
          </Link>
          <p>{props.date}</p>
        </MovieTitle>
      </MovieCard>
    </>
  );
};

export default Movie;
