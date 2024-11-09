<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';


    type Answer = {
        word: string;
        answer: string;
    };

    interface PersonalityData {
        words: string[];
    }

    type button = {
        color: string;
        text: string;
    }

    const buttons: button[] = [{ color: 'btn-not', text: 'Not me at all' }, { color: 'btn-notreally', text: 'Not really me' }, { color: 'btn-kinda', text: 'Kinda me' }, { color: 'btn-mostly', text: 'Mostly me' }, { color: 'btn-totally', text: 'Totally me' }];

    let answers: Answer[] = [];

    let personalityData: PersonalityData = { words: [] };
    let currentIndex = 0;

    let debounce = false;

    let started = false

    function ToTitleCase(str: string) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function nextQuestion(answer: string) {
        if (debounce) return;
        
        answers = [...answers, { word: personalityData.words[currentIndex], answer }];
        currentIndex++;
        if (currentIndex === personalityData.words.length) {
            window.location.href = '/diagnostic';
        }

        debounce = true;
        setTimeout(() => {
            debounce = false;
        }, 500);
    }

    onMount(async () => {
        const response = await fetch('/personality.json');
        personalityData = await response.json();
    });
</script>

{#if !started}
    <div class="welcome">
        <h2>Welcome to the Personality Diagnostic Quiz</h2>
        <p>You will see a series of words and images. You must answer the question with the answer that is as close to you as possible.</p>
        <h3>Click the button below to start</h3>
        <button class="btn-start" on:click={() => { started = true }}>Start</button>
    </div>
{:else}
<main>

        <div class="top-bar">
            <h2>Personality Quiz</h2>
            <h3>Question {currentIndex+1} of {personalityData.words.length}</h3>

        </div>
        {#if personalityData.words.length > 0}
            <div class="img-box">
                <h1>{ToTitleCase(personalityData.words[currentIndex])}</h1>
                <img src={`/personalityimgs/${personalityData.words[currentIndex]}.PNG`} alt={personalityData.words[currentIndex]} />
            </div>
        {/if}
        <div class="btns-container">
            {#each buttons as button}
                <button class="btn {button.color}" on:click={() => { nextQuestion(button.text) }}>{button.text}</button>
            {/each}
        </div>
    </main>
    {/if}


<style>
    main {
        display: grid;
        place-items: center;
        grid-template-rows: 0.2fr 0.7fr 0.2fr;
        gap: 5px;
        height: 90vh;
        color: #ddd;
    }
    

    .welcome {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: #ddd;
        text-align: center;
    }

    .btn-start {
        padding: 0.5rem 1rem;
        background-color: var(--secondary);
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 1rem;
    }

    .btn-start:hover {
        scale: 1.05;
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

    .top-bar {
        display: flex;
        justify-content: left;
        align-items: baseline;
        width: 90%;
        padding: 10px;
        gap: 10px;
        height: 100%;
        font-size: 1.5rem;
        text-align: center;
    }

    .top-bar h2 {
        font-size: 2rem;
        color: #ddd;
        text-align: left;
    }

    .top-bar h3 {
        font-size: 1.5rem;
        color: #ddd;
        text-align: right;
    }

    
</style>