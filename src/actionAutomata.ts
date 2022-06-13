import { Automata } from "./Automata";
import { allNodes } from "./commonAutomata";
import { parseTemplate } from "./parseTemplate";

const template = `
actionDevice => natter
actionDevice => action
actionDevice => device
actionDevice => modifier
actionDevice => preposition
actionDevice => location

natter => action

action => parameter
action => device
action => it
action => modifier
action => article

article => device
article => location

parameter => article
parameter => modifier
parameter => device
parameter => preposition

modifier => article
modifier => device

it => parameter
it => preposition
it => polite
it => and

device => parameter
device => preposition
device => polite
device => and

preposition => article
preposition => location
preposition => device

location => parameter
location => action
location => and

and => location
and => device
and => article
and => action

polite => polite
`;

let root = new Automata("actionDevice");
root = parseTemplate(template, [root, ...allNodes], root);
export { root as actionAutomata };
