<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    

    interface PersonalityData {
        words: string[];
    }

    let personalityData: PersonalityData = { words: [] };
    let currentIndex = 0;

    function ToTitleCase(str: string) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    onMount(async () => {
        const response = await fetch('/personality.json');
        personalityData = await response.json();
    });
</script>

<main>
    <div class="top-bar">
        <h2>Question 1 of 10</h2>

    </div>
    {#if personalityData.words.length > 0}
        <div class="img-box">
            <h1>{ToTitleCase(personalityData.words[currentIndex])}</h1>
            <img src={`/personalityimgs/${personalityData.words[currentIndex]}.PNG`} alt={personalityData.words[currentIndex]} />
        </div>
    {/if}
    <div class="btns-container">
        <button class="btn btn-not">Not me at all</button>
        <button class="btn btn-notreally">Not really me</button>
        <button class="btn btn-kinda">Kinda me</button>
        <button class="btn btn-totally">Mostly me</button>
        <button class="btn btn-mostly">Totally me</button>
    </div>
</main>

<style>
    main {
        display: grid;
        place-items: center;
        grid-template-rows: 1fr 0.8fr 0.2fr;
        gap: 10px;
        height: 100vh;
        padding-bottom: 1rem;
    }

    .img-box {
        display: flex;
        flex-direction: column;
        width: 90vw;
        height: 80vh;
        max-width: 900px;
        background-color: var(--secondary);
        border-radius: 20px;
    }

    .img-box h1 {
        font-size: 1.5rem;
        color: #222;
        text-align: left;
        padding: 10px;
    }

    .btns-container {
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 10px;
        width: 90vw;
        max-width: 900px;
        background-color: var(--secondary);
        border-radius: 12px;
    }

    .img-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }

    .btn {
        padding: 0.5rem 1rem;
        background-color: var(--secondary);
        color: #222;
        font-weight: 800;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.92rem;
    }

    .btn:hover {
        scale: 1.05;
    }

    .btn-not {
        background-color: var(--notcolor);
    }

    .btn-notreally {
        background-color: var(--notreallycolor);
    }

    .btn-kinda {
        background-color: var(--kindacolor);
    }

    .btn-totally {
        background-color: var(--mostlycolor);
    }

    .btn-mostly {
        background-color: var(--totallycolor);
    }

    .top-bar h2 {
        font-size: 1.5rem;
        color: #ddd;
    }

    
</style>