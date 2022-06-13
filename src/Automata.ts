interface Match {
    input: string;
    device: string;
    location: string;
    state: string;
    error?: string;
}

export class Automata {
    name: string;
    _inLinks: Automata[];
    _outLinks: Automata[];
    tokens: string[];

    constructor(
        name: string,
        tokens?: string[],
        inLinks?: Automata[],
        outLinks?: Automata[]
    ) {
        this.name = name;
        this.inLinks = inLinks || [];
        this.outLinks = outLinks || [];

        if (tokens && tokens.some((token) => token.split(" ").length > 1)) {
            this.outLinks.push(this);
            this.tokens = tokens.map((val) => val.split(" ")).flat();
        } else {
            this.tokens = tokens || [];
        }
    }

    clone() {
        return new Automata(
            this.name,
            this.tokens,
            this.inLinks,
            this.outLinks
        );
    }

    toAscii(visited: string[] = [], lastChild = false) {
        const out = [];
        const boxChars = ["│", "└", "├"];
        if (!visited.includes(this.name)) {
            out.push(`${this.name}`);
        } else {
            return `${this.name} - CYCLE`;
        }

        for (const link of this.outLinks) {
            const isLast =
                this.outLinks.indexOf(link) === this.outLinks.length - 1;
            const lines = link.toAscii([...visited, this.name]).split("\n");
            for (const line of lines) {
                // direct child
                if (line[0].match(/[A-z]/)) {
                    if (isLast) {
                        out.push(boxChars[1] + " " + line);
                    } else {
                        out.push(boxChars[2] + " " + line);
                    }
                }
                // last child
                else if (lastChild || isLast) {
                    out.push("  " + line);
                } else {
                    out.push(boxChars[0] + " " + line);
                }
            }
        }

        return out.join("\n");
    }

    parse(words: string[], index: number): { word: string; match: Automata }[] {
        const word = words[index];
        if (!word) {
            return [];
        }
        // Search outgoing links for one matching this word
        const nextNode = this.outLinks.find((link) =>
            link.tokens.includes(word)
        );

        if (nextNode) {
            // get the subsequent matches
            const matches = nextNode.parse(words, index + 1);
            if (index === 0) {
                return matches;
            } else {
                return [
                    {
                        word,
                        match: nextNode,
                    },
                    ...matches,
                ];
            }
        } else {
            console.error(`Failed to match ${word}`);
            return null;
        }
    }

    match(words: string[]): Match {
        // get the parse array
        const stack = this.parse(words, 0);
        const device =
            stack.find((node) => node.match.name === "device")?.word || "";
        const location =
            stack.find((node) => node.match.name === "location")?.word || "";
        const state =
            stack.find((node) => node.match.name === "parameter")?.word || "";

        return {
            input: words.join(" "),
            device,
            location,
            state,
        };
    }

    set outLinks(outLinks) {
        this._outLinks = outLinks;
    }
    get outLinks() {
        return this._outLinks;
    }
    set inLinks(inLinks) {
        this._inLinks = inLinks;
    }
    get inLinks() {
        return this._inLinks;
    }
}
