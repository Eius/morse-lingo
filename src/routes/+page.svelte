<script lang="ts">
	import { onMount } from "svelte";
	import { parseMorse } from "$lib/scripts/utils";
	import { morse, latin } from "$lib/scripts/data";

    let targetIndex: number;

    let targetString: string = "‎";
    let currentString: string = "";

    let correct: boolean = false;
    let inputRef: HTMLInputElement;

    onMount(() => {
        pickRandom();
        inputRef.focus();
    })

    $: {
        if (currentString) {
            currentString = parseMorse(currentString);
            console.clear();
            console.log("Target: " + morse[targetIndex] + " | " + "Current: " + currentString);
            if (morse[targetIndex] === currentString)
            {
                correct = true
                setTimeout(() => {
                    pickRandom();
                    correct = false;
                    currentString = "";
                    console.clear();
                    console.log("Target: " + morse[targetIndex] + " | " + "Current: " + currentString);
                }, 1000);

                setTimeout(() => {
                    inputRef.focus();
                }, 1100);
            }
        }
    }

    function pickRandom()
    {
        const lastIndex = targetIndex;
        targetIndex = Math.floor(Math.random() * latin.length);
        if (targetIndex === lastIndex)
        {
            pickRandom();
            return;
        }
        targetString = latin[targetIndex];
    }

</script>

<div class="absolute top-4 right-4 bounce-animation">
    <a href="/translator" class="font-semibold text-xl">Translator {">"}</a>
</div>
<div class="flex flex-col gap-2 justify-center items-center min-h-screen">
    <h3 class="text-xl uppercase">
        {targetString}
    </h3>
    <div>
        <input bind:this={inputRef} type="text" placeholder="Your answer..." bind:value={currentString} disabled={correct}>
    </div>
    {#if correct}
    <p class="font-semibold text-lg text-green-500">Correct!</p>
    {:else}
    <p>‎</p>
    {/if}
</div>

<style lang="postcss">
    @keyframes bounce {
        0% {
            right: 16px;
        }
        100% {
            right: 32px;
        }
    }

    .bounce-animation {
        animation: bounce 1s infinite alternate;
    }
</style>