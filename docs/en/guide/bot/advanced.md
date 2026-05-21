# AWMC BOT Advanced Tutorial

::: tip
Use Ctrl+F to search for specific topics.
:::

## About "Poke"

The BOT responds to QQ's poke feature. For example:

```Scenario
User: (pokes the BOT)

BOT: @User You MISSed a Note...
```

If the BOT has admin privileges, the response might be a **mute**:

```Scenario
User: (pokes the BOT)

BOT: Why do you keep poking me? ... (User QQ ID) rolled 11 minutes and 45 seconds of mute!
```

The maximum mute duration can be up to **1 day**.

If a kind admin is online, they might unmute you. Poke with caution!

## xx Completion Table / xx Progress

Commands to check progress toward obtaining the Shogun/Goku/God/Dance plates.
The `xx completion table` command outputs an image, while the `xx progress` command outputs plain text information.

## Issue Ticket [x]

::: danger Warning
Issuing tickets carries risks. Proceed with caution.

AWMC TEAM is not responsible for any negative effects caused by ticket issuance.

See [AWMC BOT Terms of Service & Privacy Policy](/en/guide/bot/terms#10-disclaimer), Section 10.
:::

Issues a function ticket to your game account, where `[x]` is the desired ticket multiplier (integer from 2-6, defaults to 2 if not specified).

Tickets with multiplier 4x and above have a higher failure rate.

## I Want to Reach [x] Rating

Recommends 5 songs each from B35 and B15 that can help you push your rating, where `[x]` is your target rating (can be left blank).

## Skill Analysis

Generates a skill analysis chart based on chart tags and fitted constants from your B50. For reference only.

## What Song is [Song Name/Alias]

Generates a detailed song information image, including constants, charter, note count, and ID for each difficulty.

## What Aliases Does [Song Name/Alias] Have

Outputs a plain text list of all aliases for the song.
