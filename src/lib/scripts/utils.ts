export function parseInput(currentString: string): string {
    currentString = currentString.replaceAll("_", "-");
    for (let index = 0; index < currentString.length; index++) {
        const char: string = currentString[index];
        if (char === "." || char === "-" || char === "_") continue;
        currentString = currentString.replaceAll(char, "");
    }
    return currentString;
}