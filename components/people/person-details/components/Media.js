import styled from '@emotion/styled';
import { Tabs } from '@mantine/core';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';

const ImageWrapper = styled.div`
  padding: 1.5rem 0;
  width: min(90%, 100vw);
  margin-inline: auto;
`;

const StyledTabs = styled(Tabs)`
  .mantine-Tabs-tabLabel {
    color: #fff;
  }

  button:hover {
    background: var(--hover-secondary);
  }

  .mantine-Tabs-panel {
    overflow: auto;
  }
`;

const DisplayPhotoWrapper = styled.div`
  display: flex;

  .display_photo {
    max-width: 420px;
    height: 250px;
    margin: 1rem 0.5rem;
  }
`;

const Media = ({ images }) => {
  const display_photo = images.profiles.map((p, i) => {
    return (
      <span key={i}>
        <img
          className="display_photo"
          src={
            p.file_path
              ? `${IMAGES_API_w500 + p.file_path}`
              : '/backup-image.png'
          }
          alt={'Display Photo'}
          loading="lazy"
        />
      </span>
    );
  });

  return (
    <>
      <ImageWrapper>
        <h3>Gallery</h3>
        <StyledTabs defaultValue="first">
          <Tabs.List grow>
            <Tabs.Tab value="first">
              {display_photo.length > 1 ? 'Photos' : 'Photo'} (
              {display_photo.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
            <DisplayPhotoWrapper>
              {display_photo.length > 0 ? (
                display_photo
              ) : (
                <p>Sorry, no photo is available</p>
              )}
            </DisplayPhotoWrapper>
          </Tabs.Panel>
        </StyledTabs>
      </ImageWrapper>
    </>
  );
};

export default Media;
