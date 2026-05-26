# Semantic Confirmation Prompts

Use these only when code + docs are not enough to safely lock the local manifest direction.

## Owner boundary

> I currently read this directory as the long-term owner of **X**, while **Y** looks like an adjacent caller or integration edge. I recommend writing it that way. Does that match current truth?

## Term collision

> You called this **account**, but the code/docs seem to distinguish **Customer account** from **login user**. Which one should this directory contract speak about? I recommend **Customer account** here.

## Constraint confirmation

> I can write the manifest now, but one constraint still changes the direction: should this directory preserve the existing public contract exactly, or is boundary cleanup part of the intended scope? I recommend preserving the current contract and documenting the cleanup as follow-up.

## Decision drift signal

> This local contract looks clear enough to write, but it may now conflict with decision **X**. I recommend writing the manifest and marking a `decision_drift_signal` in the output. Someone else can resolve the authority question separately. Agreed?

## Use rule

- Ask one at a time.
- Include a recommendation.
- Stop asking once the manifest direction is safe.
