import getConfig from 'next/config';

// API https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&page=1

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const url = 'https://api.themoviedb.org/3';
const api_key = `api_key=${serverRuntimeConfig.apiKey}`;
const language = 'en-US';

export async function fetchData(route, page, genre) {
  let tmdbUrl = `${url}${route}?${api_key}&page=${page}&language=${language}`;

  return await requestData(tmdbUrl);
}

export async function requestData(url) {
  const res = await fetch(url);
  const data = await res.json();

  return data;
}
