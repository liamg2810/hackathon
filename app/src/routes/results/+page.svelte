<script lang="ts">
  import { onMount } from "svelte";
  import { formattedDiagnosticAnswers, formattedPersonalityAnswers } from "$lib/ts/stores";

    let result: string = '';

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
                result = data.message;
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
    {#if result === ''}
        <p>Loading...</p>
    {:else}
        
        {@html result.replace(/\n/g, '<br>')}
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