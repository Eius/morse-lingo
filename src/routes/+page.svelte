<script lang="ts">
	import { onMount } from "svelte";
	import { parseInput } from "$lib/scripts/utils";
	import { fly } from "svelte/transition";

    
    const morse: string[] = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-",
                            "..-", "...-", ".--", "-..-", "-.--", "--.."]

    const latin: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

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
            currentString = parseInput(currentString);
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

<div class="flex flex-col gap-2 justify-center items-center min-h-screen">
    <h3 class="text-xl uppercase">
        {targetString}
    </h3>
    <div>
        <input bind:this={inputRef} type="text" placeholder="Your answer..." accept=".-" bind:value={currentString} disabled={correct}>
    </div>
    {#if correct}
    <p class="font-semibold text-lg text-green-500">Correct!</p>
    {:else}
    <p>‎</p>
    {/if}
</div>