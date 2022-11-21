import anime from 'animejs';

// function to filter list of array to be displayed
// 14 arrays
export function filterData(data) {
  const d = data.slice(0, 16);
  // let d = data.filter((data, index) => {
  //   return index < 14;
  // });
  return d;
}

// format score
export function formatScore(score) {
  const s = Math.round(score * 10);
  return s;
}

// format date
export function formatDate(date) {
  const [yyyy, mm, dd] = date.split('-');
  const rdate = `${mm}/${dd}/${yyyy}`;

  return rdate;
}

// note: START helpers for Title Component
// check if has country by production companies/countries
export function hasCountry(movie) {
  const pcountry =
    movie.production_companies[0]?.origin_country ||
    movie.production_countries[0]?.iso_3166_1;

  return pcountry;
}

// sort certification
export function sortCertification(cert) {
  const sorted = cert.results.sort((a, b) => {
    const nameA = a.iso_3166_1;
    const nameB = b.iso_3166_1;

    if (nameA < nameB) {
      return -1;
    }

    if (nameB > nameB) {
      return 1;
    }
  });

  return sorted;
}

// filter certification
export function filterCertification(cert, pcountry, sortedcert) {
  const mcert = cert.results.filter((certification) => {
    return (
      certification.iso_3166_1 === 'US' ||
      certification.iso_3166_1 === pcountry ||
      certification.iso_3166_1 === sortedcert[0]?.iso_3166_1
    );
  });

  return mcert;
}

// convert/format runtime
export function toHoursAndMinutes(totalMinutes) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return hours === 0
    ? `${padTo2Digits(minutes)}m`
    : `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
}

// convert/format runtime
function padTo2Digits(num) {
  return num.toString().padStart(1, '0');
}
// note: END helpers for Title Component

// filter tv rating
export function filterTvRating(rating) {
  const tvRating = rating.results.filter(
    (movie) => movie.iso_3166_1 === 'US' || movie.iso_3166_1
  );

  return tvRating;
}

// filter trailer videos
export function filterTrailerVideos(videos) {
  const vid = videos.results.filter(
    (video) =>
      (video.type === 'Trailer' && video.name.includes('Trailer')) ||
      (video.type === 'Teaser' && video.name.includes('Teaser'))
  );

  return vid;
}

// filter crew/director
export function filterDirector(credits) {
  const director = credits.crew.filter(
    (crew) => crew.department === 'Directing' && crew.job === 'Director'
  );

  return director;
}

// filter cast
export function filterCast(credits) {
  const cast = credits.cast.slice(0, 11);
  // let mcast = credits.cast.filter((data, index) => {
  //   return index < 11;
  // });

  return cast;
}

// filter Production Companies Logo
export function filterLogo(production) {
  const prod = production.production_companies.filter(
    (prod) => prod.logo_path !== null
  );

  return prod;
}

// filter Movie Languages
export function filterLanguages(stats, orig_lang) {
  // const language = stats.spoken_languages.filter(
  //   (lang) => lang.english_name === 'English'
  // );

  const language = stats.spoken_languages.filter(
    (lang) => lang.iso_639_1 === orig_lang
  );

  return language;
}

// note: START helpers for Media Component
// filter videos
export function filterMediaVideos(videos) {
  const vid = videos.results.filter(
    (video) =>
      video.type === 'Behind the Scenes' ||
      video.name.includes('Trailer') ||
      (video.type === 'Teaser' && video.name.includes('Teaser'))
  );

  return vid;
}
// filter posters
export function filterPosterImages(images) {
  const posters = images.posters.filter(
    (poster) =>
      (poster.vote_average > 4.5 && poster.vote_average < 5) ||
      !poster.vote_average
  );

  return posters;
}

// filter posters
export function filterBackdropImages(images) {
  const backdrops = images.backdrops.filter(
    (backdrop) =>
      (backdrop.vote_average > 4.5 && backdrop.vote_average < 5) ||
      !backdrop.vote_average
  );

  return backdrops;
}

// note: END helpers for Media Component

export function movieMaxPages(totalPages) {
  // note: movies restricted to 20 items/page | max 500 pages
  const max_pages = 500;

  let p;

  const rawTotalPages = totalPages;

  if (rawTotalPages > max_pages) {
    p = max_pages;
  } else {
    p = rawTotalPages;
  }

  return p;
}

export function movieMaxResults(totalResults) {
  // note: movies restricted to 20 items/page | max 10k items
  const max_items = 10000;

  let r;

  const rawTotalResults = totalResults;

  if (rawTotalResults > max_items) {
    r = max_items;
  } else {
    r = rawTotalResults;
  }

  return r;
}

// note: pagination effect
export function scrollTop() {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  window.innerHeight;
  anime({
    targets: [html, body],
    scrollTop: 0,
    duration: 300,
    easing: 'easeInSine',
  });
}

// note: filter person credits cast popularity
export function filterCreditsCast(credits) {
  const movies = credits.cast
    .filter((movie) => movie.popularity >= 2)
    .slice(0, 9)
    .sort((a, b) => (a.popularity > b.popularity ? -1 : 1));

  return movies;
}

// note: filter person credits crew popularity
export function filterCreditsCrew(credits) {
  const movies = credits.crew
    .filter((movie) => movie.popularity >= 2)
    .slice(0, 9)
    .sort((a, b) => (a.popularity > b.popularity ? -1 : 1));

  return movies;
}

// note: format gender
export function formatGender(gender) {
  let m;
  let f;
  if (gender === 1) return (f = 'Female');
  else return (m = 'Male');
}

export function filterKnownAs(d) {
  // const aka = d.filter((d, i) => {
  //   return i < 4;
  // });
  // return aka;
  const aka = d.slice(0, 4);

  return aka;
}

export function capitalizeFirstLetter(d) {
  const foo = d[0].toUpperCase() + d.slice(1);

  return foo;
}
