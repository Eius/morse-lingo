export function parseMorse(morseString: string): string {
    morseString = morseString.replaceAll("_", "-");
    for (let index = 0; index < morseString.length; index++) {
        const char: string = morseString[index];
        if (char === "." || char === "-" || char === "_") continue;
        morseString = morseString.replaceAll(char, "");
    }
    return morseString;
}

export function parseLatin(latinString: string): string {
    latinString = latinString.toLowerCase().replace(/[^a-z]/g, "");
    return latinString;
}