<script lang="ts">
	import { onMount } from "svelte";
	import { parseLatin, parseMorse } from "$lib/scripts/utils";
    import { morse, latin } from "$lib/scripts/data";
	import { debug } from "svelte/internal";

    let targetIndex: number;

    let morseString: string = "";
    let latinString: string = "";

    let morseTextArea: HTMLTextAreaElement;
    let latinTextArea: HTMLTextAreaElement;

    onMount(() => {

    })

    $: {
        if (morseString) 
        {
            morseString = parseMorse(morseString);
            for (let i = 0; i < morseString.length; i++) {
                const char = morseString[i];

                
            }
        }

        if (latinString)
        {
            let latinInput = parseLatin(latinString);
            morseString = "";
            for (let i = 0; i < latinInput.length; i++) {
                const charToFind = latinInput[i];
                const foundIndex = latin.findIndex((latinChar) => latinChar === charToFind);
                if (foundIndex === -1) { break; }
                morseString = morseString.concat(morse[foundIndex], " ");
            }
        } else if (latinString.length <= 0)
        {
            morseString = "";
        }
    }

</script>

<div class="absolute top-4 right-4 bounce-animation">
    <a href="/" class="font-semibold text-xl">Challenge {">"}</a>
</div>
<div class="flex flex-col gap-2 justify-center items-center min-h-screen">
    <div class="flex flex-col gap-4">
        <label class="flex flex-col">
            Morse
            <textarea cols="75" rows="5" bind:this={morseTextArea} placeholder="Morse code..." bind:value={morseString} />
        </label>
        <label class="flex flex-col">
            Latin
            <textarea cols="75" rows="5" bind:this={latinTextArea} placeholder="Latin..." bind:value={latinString} />
        </label>
    </div>
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
        animation: bounce 1s infinite alternate ease-in-out;
    }
</style>