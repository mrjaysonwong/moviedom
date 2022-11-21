import styled from '@emotion/styled';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';
import { devices } from '@utils/devices/devices';

const DisplayPhotoWrapper = styled.div`
  .display-photo {
    width: calc(((100vw / 2.222222) - 40px) / 1.8);
    min-width: calc(((100vw / 2.222222) - 40px) / 1.8);
    height: calc((100vw / 2.222222) - 40px) / 1.8;
    min-height: calc((100vw / 2.222222) - 40px) / 1.8;
    border-radius: var(--imageBorderRadius);
  }

  @media ${devices.laptopMaxWidth} {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
`;

const DisplayPhoto = ({ person }) => {
  return (
    <>
      <DisplayPhotoWrapper>
        <img
          className="display-photo"
          src={
            person.profile_path
              ? `${IMAGES_API_original + person.profile_path}`
              : '/backup-image.png'
          }
          alt={`${person.name} photo`}
          loading="eager"
        />
      </DisplayPhotoWrapper>
    </>
  );
};

export default DisplayPhoto;
