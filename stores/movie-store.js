import create from 'zustand';


const useMovieStore= create((set) => ({
    searchResults: [],
}))


export default useMovieStore;