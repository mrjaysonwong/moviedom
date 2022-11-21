import { fetchPageData } from '@utils/apis/config';

// function to fetch the Homepage data
export async function homeDataPage() {
  const popular = await fetchPageData('/movie/popular', 1);
  const upcoming = await fetchPageData('/movie/upcoming', 1);
  const toprated = await fetchPageData('/movie/top_rated', 1);

  return { popular, upcoming, toprated };
}

// function to fetch the Tv-shows page data
export async function tvDataPage() {
  const popular = await fetchPageData('/tv/popular', 1);
  const toprated = await fetchPageData('/tv/top_rated', 1);
  const onair = await fetchPageData('/tv/airing_today', 1);

  return { popular, toprated, onair };
}

// function to fetch the trending page data
export async function trendingDataPage() {
  const movies_trending = await fetchPageData('/trending/movie/day', 1);
  const tv_trending = await fetchPageData('/trending/tv/day', 1);

  return { movies_trending, tv_trending };
}

// function to fetch movie/tv genres
export async function genreDataPage() {
  const movie = await fetchPageData('/genre/movie/list', 1);
  const tv = await fetchPageData('/genre/tv/list', 1);

  return { movie, tv };
}

//function to fetch data for each movie route
export async function getDataPage(route, page, genre) {
  const data = await fetchPageData(route, page, genre);

  return { data };
}
