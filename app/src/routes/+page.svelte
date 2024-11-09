<script lang="ts">
    import {ResetAnswers} from "$lib/ts/stores"

    function Start() {
        ResetAnswers()
        window.location.href = "/personality"
    }
</script>

<main>
    <h1>Welcome to the Personality Diagnostic Quiz for Individual Learner Experiences</h1>
    <button on:click={Start}>Start</button>
</main>

<style>
    main {
        text-align: center;
        color: #dddddd;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 75vh;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: var(--secondary);
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 1rem;
    }

    button:hover {
        scale: 1.05;
    }
</style>
