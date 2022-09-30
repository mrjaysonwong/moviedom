import { fetchData } from '@utils/apis/config';

// function to fetch the homepage data
export async function homeDataPage() {
  const popular = await fetchData('/movie/popular', 1);
  const toprated = await fetchData('/movie/top_rated', 1);
  const upcoming = await fetchData('/movie/upcoming', 1);

  return { popular, toprated, upcoming };
}
