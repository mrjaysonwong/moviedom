import styled from '@emotion/styled';
import { Tabs } from '@mantine/core';
import Videos from './content-media/videos/Videos';
import Posters from './content-media/posters/Posters';
import Backdrops from './content-media/backdrops/Backdrops';
import { devices } from '@utils/devices/devices';

const MediaWrapper = styled.div`
  padding: 1.5rem 0;
  width: min(90%, 100vw);
  margin-inline: auto;
`;

const StyledTabs = styled(Tabs)`
  .mantine-Tabs-tabLabel {
    color: #fff;
  }

  @media ${devices.laptopMaxWidth} {
    button {
      padding: 1rem;
    }
  }

  button:hover {
    background: var(--hover-secondary);
  }

  .mantine-Tabs-panel {
    overflow: auto;
  }
`;

const Media = ({ videos, posters, backdrops, type }) => {
  return (
    <>
      <MediaWrapper>
        <h3>Media</h3>
        <StyledTabs defaultValue="first">
          <Tabs.List grow>
            <Tabs.Tab value="first">
              {videos.length < 2 ? 'Video' : 'Videos'} ({videos.length})
            </Tabs.Tab>
            <Tabs.Tab value="second">
              {posters.length < 2 ? 'Poster' : 'Posters'} ({posters.length})
            </Tabs.Tab>
            <Tabs.Tab value="third">
              {backdrops.length < 2 ? 'Backdrop' : 'Backdrops'} (
              {backdrops.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
            <Videos videos={videos} type={type} />
          </Tabs.Panel>

          <Tabs.Panel value="second" pt="xs">
            <Posters posters={posters} type={type} />
          </Tabs.Panel>

          <Tabs.Panel value="third" pt="xs">
            <Backdrops backdrops={backdrops} type={type} />
          </Tabs.Panel>
        </StyledTabs>
      </MediaWrapper>
    </>
  );
};

export default Media;
