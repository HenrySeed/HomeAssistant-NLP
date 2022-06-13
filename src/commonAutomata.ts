import { Automata } from "./Automata";

const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "brown",
    "white",
];
const rooms = [
    "kitchen",
    "living room",
    "dining room",
    "basement",
    "bed room",
    "study",
    "office",
    "hallway",
    "workshop",
    "garage",
];

const temp = ["cold", "warm", "high", "low", "temp", "temperature"];

export const allNodes = [
    new Automata("natter", [
        "please",
        "would you",
        "can you",
        "would you mind awfully",
    ]),
    new Automata("action", [
        "turn",
        "hit",
        "switch",
        "make",
        "do",
        "toggle",
        "flick",
        "turning",
    ]),
    new Automata("parameter", ["up", "on", "off", "down", ...colors]),
    new Automata("and", ["and"]),
    new Automata("it", ["it"]),
    new Automata("device", [
        "light",
        "lights",
        "volume",
        "tv",
        ...temp,
        "motion",
    ]),
    new Automata("article", ["the", "a", "an"]),
    new Automata("polite", ["please", "hank"]),
    new Automata("preposition", ["on", "for", "in"]),
    new Automata("modifier", ["all"]),
    new Automata("location", [...rooms]),
    new Automata("time", ["last night", "yesterday", "tomorrow", "today"]),
    new Automata("question", ["what", "whats", "where", "when", "how"]),
    new Automata("questionVerb", [
        "did",
        "is",
        "was",
        "be",
        "did",
        "get",
        "last have",
        "will",
    ]),
];
