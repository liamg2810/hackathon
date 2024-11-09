<script lang="ts">
    import { onMount } from 'svelte';

    // Define types for the data structure
    type Question = {
        question: string;
        options: string[];
    };

    type DiagnosticData = {
        questions: Question[];
    };

    type Answer = {
        question: string;
        answer: string;
    };

    let answers: Answer[] = [];

    let diagnosticData: DiagnosticData | null = null;

    let currentQuestion = 0;

    function nextQuestion(answer: string) {
        if (!diagnosticData) return;

        answers = [...answers, { question: diagnosticData.questions[currentQuestion].question, answer }];

        currentQuestion++;

        if (currentQuestion === diagnosticData.questions.length) {
            window.location.href = '/results';
        }
    }

    // Fetch the JSON file when the component is mounted
    onMount(async () => {
        try {
        const response = await fetch('/diagnostic.json');  // Adjust the path if necessary
        if (response.ok) {
            diagnosticData = await response.json();
        } else {
            console.error('Failed to load diagnostic data');
        }
        } catch (error) {
        console.error('Error fetching diagnostic data:', error);
        }
    });
</script>


<main>
    <div class="top-bar">
        <h2>Diagnostic quiz</h2>
        <h3>Question {currentQuestion+1} of {diagnosticData?.questions.length}</h3>
    </div>

    {#if diagnosticData}
        <div class="question">
            <h2>{diagnosticData?.questions[currentQuestion].question}</h2>

            <div class="options">
                {#each diagnosticData.questions[currentQuestion].options as option}
                    <div class="btn-holder">
                        <button class="option" on:click={() => {nextQuestion(option)}}>{option}</button>
                    </div>
                {/each}
            </div>  
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</main>

<style>
    main {
        display: grid;
        place-items: center;
        grid-template-rows: 0.2fr 1fr 0.2fr;
        height: 100vh;
        padding: 1rem;
        color: #ddd;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .question {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;
    }

    .options {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }

    .btn-holder {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .option {
        padding: 0.5rem 1rem;
        background-color: var(--secondary);
        color: #222;
        font-weight: 800;
        width: 99%;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.92rem;
    }

    .option:hover {
        scale: 1.05;
    }
</style>