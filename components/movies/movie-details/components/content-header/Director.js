import styled from '@emotion/styled';
import Link from 'next/link';

const slugify = require('slugify');

const MovieDirector = styled.div`
  margin-top: 1.5rem;

  .name {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const Director = ({ mdirector, type }) => {
  return (
    <>
      <MovieDirector>
        {mdirector && mdirector.length !== 0 && (
          <p className="name">
            <Link
              href={`/person/${
                type === 'movie' ? mdirector[0]?.id : mdirector.id
              }-${slugify(
                type === 'movie' ? mdirector[0]?.name : mdirector.name,
                {
                  lower: true,
                  remove: /[*+~.()'"!:@/,]/g,
                }
              )}`}
              passHref
            >
              <a>{type === 'movie' ? mdirector[0]?.name : mdirector.name}</a>
            </Link>
          </p>
        )}
        {mdirector && (
          <p className="job">
            {type === 'movie' ? mdirector[0]?.job : 'Creator'}
          </p>
        )}
      </MovieDirector>
    </>
  );
};

export default Director;
