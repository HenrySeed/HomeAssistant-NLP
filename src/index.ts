import { actionAutomata } from "./actionAutomata";
import { queryAutomata } from "./queryAutomata";

export function parse(input: string) {
    input = input.toLowerCase().replace(/[^A-z ]/g, "");
    return input.split(" ");
}

function testActionAutomataMatch(text: string) {
    console.log(actionAutomata.match(parse(text)));
}

testActionAutomataMatch("Turn on the lights");
testActionAutomataMatch("Turn on the lights please hank");
testActionAutomataMatch("Please turn the volume up");
testActionAutomataMatch("can you please turn the lights on");
testActionAutomataMatch("turn up the volume on the tv");
testActionAutomataMatch("turn up the volume on the tv in the living room");
testActionAutomataMatch("make the lights in the living room blue");
testActionAutomataMatch("Turn on all the lights");
testActionAutomataMatch("Make all the lights in the living room orange");
testActionAutomataMatch("In the living room turn on all the lights");
testActionAutomataMatch("Living room on");
testActionAutomataMatch("Living room off");
testActionAutomataMatch("Lights on");
testActionAutomataMatch("all Lights off");
testActionAutomataMatch("lights blue");
testActionAutomataMatch("do the lights");
testActionAutomataMatch("toggle the lights in the dining room");
testActionAutomataMatch("Turn the volume up in the basement");
testActionAutomataMatch("Turn up the volume in the basement");
testActionAutomataMatch("flick the lights on in the study");
testActionAutomataMatch(
    "Would you mind awfully turning on the tv in the office"
);
testActionAutomataMatch("turn on the lights and the tv");
testActionAutomataMatch("turn on the lights and turn off the tv");
testActionAutomataMatch("hit the lights and turn on the tv and turn it up");
testActionAutomataMatch("Turn up the lights");
testActionAutomataMatch("Turn on the lights and tv");
testActionAutomataMatch("Turn on the lights and turn off tv");

function testQueryAutomataMatch(text: string) {
    console.log(queryAutomata.match(parse(text)));
}

testQueryAutomataMatch("How cold was it last night");
testQueryAutomataMatch("How cold did the living room get last night");
testQueryAutomataMatch("When did the living room last have motion");
testQueryAutomataMatch("How warm will it be tomorrow");
testQueryAutomataMatch("What is the temperature");
testQueryAutomataMatch("How cold is it");
testQueryAutomataMatch("Whats the low tomorrow");
testQueryAutomataMatch("what temperature is it in the study");
