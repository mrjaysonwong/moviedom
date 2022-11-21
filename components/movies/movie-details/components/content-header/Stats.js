import styled from '@emotion/styled';
import { useState } from 'react';
import { RingProgress, Text, Button, Modal } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons';
import Video from './Video';
import { formatScore } from '@utils/common/common';

const MovieStats = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  span {
    margin-right: 1rem;
  }

  .score-circle {
    border-radius: 100%;
    background: var(--dark-blue);
  }

  .trailer {
    color: black;
  }
`;

const StyledModal = styled(Modal)`
  .mantine-Modal-modal {
    background: transparent;
    color: #fff;
  }
`;

const Stats = ({ movie, filteredvids, type }) => {
  // modal component local state
  const [opened, setOpened] = useState(false);

  const score = formatScore(movie.vote_average);

  return (
    <>
      <MovieStats>
        <span>
          <RingProgress
            size={60}
            thickness={5}
            className="score-circle"
            roundCaps
            label={
              <Text size="md" align="center">
                <b>
                  {movie.status !== 'In Production' &&
                  movie.status !== 'Planned' &&
                  movie.status !== 'Post Production'
                    ? `${score}%`
                    : 'NR'}
                </b>
              </Text>
            }
            sections={[
              {
                value: score,
                color:
                  score === 0
                    ? ''
                    : score < 40
                    ? 'red'
                    : score < 70
                    ? 'orange'
                    : 'green',
              },
            ]}
          />
        </span>
        <span className="score-text">
          <h3>{type === 'movie' ? 'Movie' : 'TV'} Score</h3>
        </span>
        <span>
          <StyledModal
            opened={opened}
            onClose={() => setOpened(false)}
            size="auto"
          >
            <Video trailer={filteredvids} />
          </StyledModal>
          {filteredvids.length > 0 && (
            <Button
              leftIcon={<IconPlayerPlay />}
              className="btn trailer"
              variant="gradient"
              gradient={{ from: 'var(--gold)', to: 'lime', deg: 105 }}
              onClick={() => setOpened(true)}
            >
              Play Trailer
            </Button>
          )}
        </span>
      </MovieStats>
    </>
  );
};

export default Stats;
