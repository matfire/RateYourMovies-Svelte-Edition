<script>
import client from "../utils/client";
import {fade} from "svelte/transition"

    export /**
* @type import("@matfire/the_movie_wrapper/lib/types/movie").Movie
*/
     let movie;
</script>

<a href="/movies/{movie.id}">

    <div transition:fade class="w-96 h-auto cursor-pointer" on:click={() => {
    
    }}>
        <img src="{client.getImageUrl(movie.poster_path, "w500")}" alt="{movie.title} poster">
        <h4 class="text-center font-bold">
            {movie.title}
        </h4>
    </div>
</a>