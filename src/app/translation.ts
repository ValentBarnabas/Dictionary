/**
 * Class for handling necessary translation parts.
 * Contains the translation, its part-of-speach and meanings.
 */
export class Translation {
    constructor(text: string, pos: string) {
        this.meanings = []
        this.text = text
        this.pos = pos
    }

    meanings: string[];
    text: string;
    pos: string;

    addMeaning(mean: string) {
        this.meanings.push(mean)
    }
}