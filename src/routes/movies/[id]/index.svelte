<script>
import { page } from "$app/stores";
import Play from "../../../icons/play.svelte";
import {fly, fade} from "svelte/transition"
import client from "../../../utils/client";
const id = parseInt($page.params.id)

const movie = client.movies.getMovie(id, ["videos", "keywords", "credits"])

</script>

{#await movie}
    <p>loading movie data, please wait...</p>
{:then movie}
    {@const director = movie.credits?.crew.find((e) => e.job === "Director")}
    {@const screenwriters = movie.credits?.crew.filter((e) => e.job === "Writer") || []}
    {@const producers = movie.credits?.crew.filter((e) => e.job === "Producer") || []}

    <div class="w-full">
        <div class="mx-auto container">
            <div in:fade="{{delay:400}}" class="flex justify-between text-2xl mb-3 items-center">
                <div>
                    <h1 class="font-bold text-3xl">{movie.title}</h1>
                    <p>
                        {#each movie.genres as genre, index}
                            {#if index !== 0}, {/if}<a href="/movie/genre/{genre.id}">{genre.name}</a>
                        {/each}
                    </p>
                </div>
                <p class=""><span class=" text-blue-500 font-bold">{movie.vote_average}</span>/10</p>
            </div>
            <div class="flex justify-evenly gap-6">
                <div class="w-auto">
                    <div class="w-auto">
                        <img class="w-96 h-auto" in:fly="{{y:-200, duration:1000}}" src="{client.getImageUrl(movie.poster_path, "w500")}" alt="{movie.title} poster" />
                        <div in:fade="{{delay:1010}}" class="w-full flex justify-between items-center mt-1">
                            <p class="font-semibold text-xl">${Intl.NumberFormat().format(movie.revenue)}</p>
                            <a class="border border-black rounded-lg px-4 py-1 uppercase hover:scale-110 hover:text-white hover:bg-black transition-all" href="/movie/{movie.id}/watch">Watch</a>
                        </div>
                    </div>
                </div>
                <div in:fade="{{delay:1500}}">
                    <h4 class="font-bold text-xl mb-2">About the Movie</h4>
                    <p>{movie.overview}</p>
                    <div class="w-full flex justify-between mt-3">
                        <div>
                            <h4 class="font-semibold mb-1">Actors</h4>
                            <ul>
                                {#each movie.credits?.cast.slice(0, 6) as person}
                                    <a class="text-blue-500 hover:underline transition" href="/person/{person.id}"><li>{person.name}</li></a>
                                {/each}
                            </ul>
                        </div>
                        <div class="flex flex-col justify-between">
                            <div>
                                <h4 class="font-semibold mb-1">Director</h4>
                                {director?.name}
                            </div>
                            <div>
                                <h4 class="font-semibold mb-1">Screenwriter{#if screenwriters.length > 1}s{/if}</h4>
                                {#each screenwriters as screenwriter}
                                    {screenwriter.name}
                                {/each}
                            </div>
                        </div>
                        <div>
                            <div>
                                <h4 class="font-semibold mb-1">Producer{#if producers.length > 1}s{/if}</h4>
                                <ul>
                                    {#each producers as producer}
                                        <li>{producer.name}</li>
                                    {/each}

                                </ul>
                            </div>  
                        </div>
                    </div>
                    <div class="w-full flex justify-end">
                        <button class="pl-4 py-1 bg-black text-white rounded-xl hover:scale-110 border-none border-black hover:bg-transparent hover:text-black hover:border transition-all"><div class="flex justify-between gap-2">
                            Watch Trailer <Play />
                        </div></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/await}