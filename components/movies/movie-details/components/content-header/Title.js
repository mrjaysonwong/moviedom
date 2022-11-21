import styled from '@emotion/styled';
import { filterCertification } from '@utils/common/common';
import Link from 'next/link';

const slugify = require('slugify');

const MovieTitle = styled.div`
  .release-year {
    margin-left: 0.5rem;
    color: gray;
  }

  span {
    margin-bottom: 5px;
  }
`;

const MovieFacts = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  span {
    margin-right: 0.6rem;
  }

  .certification {
    border: 1px solid gray;
    padding: 0 6px;
    color: gray;
  }

  .genres::before {
    content: '🔗 ';
  }

  .genre-links:not(:first-of-type)::before {
    content: ',' ' ';
  }

  .runtime {
    &::before {
      content: '⌛ ';
    }
  }
`;

const Title = ({
  movie,
  cert,
  date,
  runtime,
  pcountry,
  sortedcert,
  rating,
  type,
}) => {
  const mcert =
    type === 'movie' && filterCertification(cert, pcountry, sortedcert);
  const hasUS =
    type === 'movie' &&
    mcert.map((certification) => certification.iso_3166_1).includes('US');

  if (hasUS) {
    mcert[0] = mcert.splice(1, 1, mcert[0])[0];
  }

  const rated =
    mcert[0]?.release_dates[0]?.certification ||
    mcert[mcert.length - 1]?.release_dates[0]?.certification;

  return (
    <>
      <MovieTitle>
        <h1>
          <span className="movie-title">
            {type === 'movie' ? movie.title : movie.name}
          </span>
          {date && <span className="release-year">({date.slice(-4)})</span>}
        </h1>
        <MovieFacts>
          {type === 'movie'
            ? rated && <span className="certification">{rated}</span>
            : rating &&
              rating.length !== 0 && (
                <span className="certification">{rating[0].rating}</span>
              )}

          {type === 'movie' && (
            <span className="release-date">
              {date} (
              {pcountry ||
                mcert[0]?.iso_3166_1 ||
                mcert[mcert.length - 1]?.iso_3166_1}
              )
            </span>
          )}
          <span className="genres">
            {movie.genres.map((genre) => {
              return (
                <Link
                  key={genre.id}
                  href={`/genre/${type === 'movie' ? 'movie' : 'tv'}/${
                    genre.id
                  }_${slugify(genre.name, {
                    lower: true,
                    remove: /[*+~.()'"!:@/]/g,
                  })}`}
                  passHref
                >
                  <a key={genre.id} className="genre-links">
                    {genre.name}
                  </a>
                </Link>
              );
            })}
          </span>
          {runtime !== '0m' && <span className="runtime">{runtime}</span>}
        </MovieFacts>
      </MovieTitle>
    </>
  );
};

export default Title;
