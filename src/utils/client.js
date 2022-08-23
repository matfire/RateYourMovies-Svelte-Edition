import API from "@matfire/the_movie_wrapper"

const client = new API(import.meta.env.VITE_TMDB_KEY)

export default client
