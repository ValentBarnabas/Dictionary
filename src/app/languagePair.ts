/**
 * Class for easy handling of language pairs.
 * Contains a source (from) and a target (to) language.
 */
export class LanguagePair{

    constructor(from: string, to: string) {
        this.from = from
        this.to = to
    }

    from: string
    to: string
}

