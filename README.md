## Heuristic Automata matching of NLP with Home Assistant Applications

The general theory is as such:

-   Handle speech to text elsewhere (maybe an upcoming project of mine).
-   Take the text transcription, remove punctuation and make lowercase.
-   Run it through a DFA (Deterministic Finite Automata) to process it
-   The DFA system needs to be easy to make and change, it needs to be a graph (with cycles) and easy to understand
-   The DFA will "process" the words by matching them to word combinations it understands. It will then take that "stack" of matches and process them hunting for matches of actions and devices eg:

```
Text:
turn on the lights

DFA:
entry => action // turn ...
action => parameter // ... turn on ...
parameter => preposition // ... on the ...
preposition => device. // ... the lights ...

Stack:
turn (action)
on (parameter)
the (preposition)
lights (device)
```

Now that DFA does look simple and easy to understand but it's just pseudocode right?, we will have to turn it into an OO graph structure. Urgh that sounds like work. Instead let's just build a regex based parser to do the work for us, keeping the template easy to read, understand and modify and most importantly avoiding the hard work of implementation.

The above DFA can handle some different actions, but not many different wordings. So we can change the DFA to

```
entry => action // turn ...
entry => device // lights ...
action => parameter // ... turn on ...
parameter => preposition // ... on the ...
preposition => device // ... the lights ...
device => parameter // ... lights on ...
```

With just a few more lines of "code", what could previously only handle turn on the lights this can now handle the following cases: turn the lights on, lights on, turn on the lights

This is imperfect but an acceptable solution for now, one possible downside is that is easy to match very open cases that don't make much sense.
