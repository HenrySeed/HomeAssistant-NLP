import { Automata } from "./Automata";
import { allNodes } from "./commonAutomata";
import { parseTemplate } from "./parseTemplate";

const template = `
query => question
question => questionVerb
question => device
question => article

device => time
device => questionVerb

questionVerb => it
questionVerb => article
questionVerb => location

article => location
article => device

location => questionVerb
it => questionVerb

questionVerb => time
questionVerb => device
it => time
`;

let root = new Automata("query");
root = parseTemplate(template, [root, ...allNodes], root);
export { root as queryAutomata };
