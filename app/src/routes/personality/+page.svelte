<script lang="ts">

</script>

<main>
    <div class="top-bar">
        <h2>Question 1 of 10</h2>

    </div>
    <div class="img-box"></div>
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
        grid-template-rows: 0.2fr 1fr 0.2fr;
        height: 100vh;
        padding: 1rem;
    }

    .img-box {
        width: 100%;
        height: 100%;
        background-color: var(--secondary);
        border-radius: 20px;
    }

    .btns-container {
        display: flex;
        gap: 1rem;
        padding: 10px;
        background-color: var(--secondary);
        border-radius: 12px;
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