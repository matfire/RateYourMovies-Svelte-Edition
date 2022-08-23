<script>
import MovieCard from "../components/MovieCard.svelte";

import client from "../utils/client";

    let movies = client.movies.getNowPlaying()
</script>

<div class="w-full flex justify-evenly flex-wrap gap-4">
    
    {#await movies}
        <p>loading movies...</p>
    {:then movies} 
        {#each movies.results as movie}
            <MovieCard  {movie} />
        {/each}
    {/await}

</div>
