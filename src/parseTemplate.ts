import { Automata } from "./Automata";

export function parseTemplate(
    template: string,
    nodes: Automata[],
    entry: Automata
) {
    const lineReeg = /([A-z]+) *((?:<=)|(?:=>)|(?:<=>)) *([A-z]+)/g;
    for (let line of template.split("\n")) {
        line = line.trim();
        if (line) {
            if (line.startsWith("//")) {
                continue;
            }
            const [source, direction, target] = [
                ...line.matchAll(lineReeg),
            ][0].slice(1);
            const sourceNode = nodes.find((node) => node.name === source);
            const targetNode = nodes.find((node) => node.name === target);
            if (!sourceNode) {
                console.error(`Failed to parse, cannot find node ${source}`);
            }
            if (!targetNode) {
                console.error(`Failed to parse, cannot find node ${target}`);
            }

            if (direction === "<=" || direction === "<=>") {
                targetNode.outLinks.push(sourceNode);
            }
            if (direction === "=>" || direction === "<=>") {
                sourceNode.outLinks.push(targetNode);
            }
        }
    }
    return entry;
}
