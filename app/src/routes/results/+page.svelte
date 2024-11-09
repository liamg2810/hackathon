<script lang="ts">
  import { onMount } from "svelte";
  import { formattedDiagnosticAnswers, formattedPersonalityAnswers } from "$lib/ts/stores";

    let result: string[] = [];

    onMount(async () => {
        console.log($formattedPersonalityAnswers)
        try {
            const response = await fetch('/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ $formattedPersonalityAnswers, $formattedDiagnosticAnswers })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);  // Output the server response
                result = data.message.split('\n');
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }); 
</script>

<main>
    <h1>Results</h1>
    {#if result.length === 0}
        <p>Loading...</p>
    {:else}
        {#each result as line}
        {@html line.replace(/\n/g, '<br>')}
            <p>{line}</p>
        {/each}
    {/if}
    <span>{result}</span>
</main>

<style>
    main {
        text-align: center;
        color: #dddddd;
        height: 75vh;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
</style>