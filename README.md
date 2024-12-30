# Work Example for Solace Application by Spencer Schoeneman

## Overview

The code I have included in this repo is an excerpt from a project I built with a group of colleagues earlier this year. To protect our intellectual property, I have included only a few component and constants files that will function as my work example. This repo is not meant to be spun up using `npm` or `yarn`. I have also removed any project specific language from the files (see use of Lorem Ipsum in `Into.tsx`).

## The Motivation and Goal

Through my experience working in multiple different code bases, I have repeatedly seen the following pattern: An object containing key-value data used to define application routes, select input element content, or other dynamicaly generated list content. Frequently, I see this primary object paired with a 'reverse key-value' object used to translate the value from the first object back into the key of the first object.

This pattern has always felt suboptimal to me. It requires the maintenance of two separate groups of data that need to be kept in perfect sync. It also feels like a violation of the principle of DRY (Don't repeat yourself).

During an episode of my weekly stream "Upskill and Chill" my co-host and I encountered exactly one of these situations in the app we were building. This inspired us to search for a solution that would involve one source-of-truth from which any other data structure could be derived and therefore allowing for changes to the data set to be made in only one location which would then be reflected in all other derived data sets.

## What I Built

### Version 1

Version 1 of the pattern is found in `constants.ts` under the comment "Original project code pattern". This pattern involves using a Map as the source-of-truth. For a master list of routes in the project see `routeNamesMap1` in `constants.ts`. For a master list of FAQs see `itemsMap` in `Info.tsx`.

I then derive any needed data structures from this master list using methods like `Array.from()` or `Object.fromEntries()`.

This pattern really shined for me while I was building the FAQ section in the `Info.tsx` component. I started with an initial `itemsMap` of four FAQs. I wanted to the first FAQ to default to open on desktop screens but default to closed on mobile screens. I got this functionality working with a hard coded object of `{1: false, 2: false, 3: false, 4: false}` in place as the initial state for `checkedItems` state. I then added two more FAQs to `itemsMap` and the component broke. I eventually realized I had forgotten to add items 5 and 6 to the hard coded object used to initialize the state. So, I replaced the hard coded object with `itemsBoolObj` which is derived from `itemsMap`. This allows for free addition or removal of FAQs from `itemsMap` without requiring updates to any other pieces of data.

The `routeNamesMap1` is used in `Header.tsx`. The `routeNamesArr1` are used in `SidedrawerNav.tsx`.

### Version 2

I recently found a use for this same pattern in another project but was curious if there was a better way to get the same effect. So, I passed my Version 1 code into Claude.ai and asked it to improve on my system. The result was Version 2.

Version 2 of the pattern is found in `constants.ts` under the comment "Recently discoved improvement to pattern". This pattern involves using an object as the source-of-truth. This pattern is not fully implemented in this example repo as it was discovered after completing the project from which these examples were taken. I wanted to include it here to show how I will be using this pattern moving forward.

This Version 2 includes type safety and accurate auto-complete in the IDE when interacting with the data structures. The type `RouteName` is also derived from the master object which is also very useful.

## Why I Think This Is Worth Sharing

I think this code is worth sharing for a few reasons.

First, I have found this pattern to be a very useful solution to a problem I have encountered multiple times. Perhaps you will too.

Second, when I was first learning JavaScript and exploring available methods within the language, it was not obvious to me when or why one would use methods like `Array.from()` and `Object.fromEntries()`. I believe this pattern would make a great example of the practical application of these powerful methods within a realistic context a student is likely to encounter in their future work. For this reason, it has been a goal of mine to write an article on this very subject at some point in the future.

Third, it always feels good to find a way to follow the principle of DRY, reduce the lines of code, and remain type safe!

rubber duck
