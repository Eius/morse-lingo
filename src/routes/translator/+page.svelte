<script lang="ts">
	import { onMount } from "svelte";
	import { parseLatin, parseMorse, removeWhitespace } from "$lib/scripts/utils";
    import { morse, latin } from "$lib/scripts/data";
	import { debug } from "svelte/internal";

    let targetIndex: number;

    let delimiter: string = "|";
    let _delimiter: string = " " + delimiter + " ";
    let morseString: string = "";
    let latinString: string = "";

    let morseTextArea: HTMLTextAreaElement;
    let latinTextArea: HTMLTextAreaElement;

    onMount(() => {

    })

    $: {
        if (delimiter)
        {
            if (delimiter.length > 1) { delimiter = delimiter[0] }
            _delimiter = " " + delimiter + " ";
        } else {
            _delimiter = " ";
        }

        if (latinString)
        {
            latinString = parseLatin(latinString);
            const latinInput = removeWhitespace(latinString);
            morseString = "";

            for (let i = 0; i < latinInput.length; i++) {
                const charToFind = latinInput[i].toLowerCase();
                const foundIndex = latin.findIndex((latinChar) => latinChar === charToFind);
                if (foundIndex === -1) { break; }
                morseString = morseString.concat(morse[foundIndex], i === latinInput.length - 1 ? "" : _delimiter);
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
    <label class="flex items-center gap-4">
        Delimiter
        <textarea cols="1" rows="1" class="resize-none" bind:value={delimiter} />
    </label>
    <div class="flex flex-col gap-4">
        <label class="flex flex-col">
            Latin
            <textarea cols="75" rows="5" bind:this={latinTextArea} placeholder="Latin..." bind:value={latinString} />
        </label>
        <label class="flex flex-col">
            Morse
            <textarea cols="75" rows="5" bind:this={morseTextArea} placeholder="Morse code..." bind:value={morseString} />
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