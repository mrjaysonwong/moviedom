import getConfig from 'next/config';

// api_key config
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// tmdb images config
export const IMAGES_API_w500 = 'https://image.tmdb.org/t/p/w500';
export const IMAGES_API_original = 'https://image.tmdb.org/t/p/original';

// tmdb api url
export const url = 'https://api.themoviedb.org/3';
export const api_key = `api_key=${serverRuntimeConfig.apiKey}`;

// Dynamic route segments for movies api
export async function fetchPageData(route, page, genre) {
  let tmdbUrl = `${url}${route}?${api_key}&include_adult=false&page=${page}&with_genres=${genre}`;

  return await requestData(tmdbUrl);
}

// Dynamic route segments for movie details api
export async function fetchMovieDetails(id, route) {
  let detailsUrl = `${url}${id}?${api_key}`;

  return await requestData(detailsUrl);
}
// function to fetch incoming request
export async function requestData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function searchUrl(query, page, route) {
  if (route === 'multi') {
    return `${url}/search/multi?${api_key}&query=${query}&page=${page}`;
  } else if (route === 'movie') {
    return `${url}/search/movie?${api_key}&query=${query}&page=${page}`;
  } else if (route === 'tv') {
    return `${url}/search/tv?${api_key}&query=${query}&page=${page}`;
  } else if (route === 'person') {
    return `${url}/search/person?${api_key}&query=${query}&page=${page}`;
  }
}
