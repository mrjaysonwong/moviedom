import styled from '@emotion/styled';
import Link from 'next/link';
import { IMAGES_API_w500, IMAGES_API_original } from '@utils/apis/config';
import Image from 'next/image';

const slugify = require('slugify');

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const PersonCard = styled.div`
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

const DisplayPhotoWrapper = styled.div`
  height: 170px;

  .display-photo {
    border-top-left-radius: var(--imageBorderRadius);
    border-top-right-radius: var(--imageBorderRadius);
    height: 100%;
    width: 100%;
  }
`;

const PersonName = styled.div`
  text-align: center;
  padding: 0.5rem;

  a {
    color: #fff;

    &:hover {
      color: var(--gold);
    }
  }
`;

const Person = (props) => {
  return (
    <>
      <PersonCard>
        <DisplayPhotoWrapper>
          <Link
            href={`/person/${props.id}-${slugify(props.name, {
              lower: true,
              remove: /[*+~.()'"!:@/,]/g,
            })}`}
            passHref
          >
            <a>
              <Image
                className="display-photo"
                loader={myLoader}
                src={
                  props.display_photo
                    ? `${IMAGES_API_w500 + props.display_photo}`
                    : '/backup-image.png'
                }
                alt={`${props.name} photo`}
                width={150}
                height={200}
                priority
              />
            </a>
          </Link>
        </DisplayPhotoWrapper>
        <PersonName>
          <Link
            href={`/person/${props.id}-${slugify(props.name, {
              lower: true,
              remove: /[*+~.()'"!:@/,]/g,
            })}`}
            passHref
          >
            <a>
              <h4>{props.name}</h4>
            </a>
          </Link>
        </PersonName>
      </PersonCard>
    </>
  );
};

export default Person;
