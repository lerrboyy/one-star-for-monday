# One Star for Monday

[![Competition](https://make.fun/badge/u-clever-harbor-75-one-star-for-monday-9ead4a61.svg)](https://make.fun/bounty/u-clever-harbor-75-one-star-for-monday-9ead4a61)
[![Rank](https://make.fun/badge/u-clever-harbor-75-one-star-for-monday-9ead4a61/lerrboyy/one-star-for-monday/rank.svg)](https://make.fun/bounty/u-clever-harbor-75-one-star-for-monday-9ead4a61)
[![Reward](https://make.fun/badge/u-clever-harbor-75-one-star-for-monday-9ead4a61/lerrboyy/one-star-for-monday/reward.svg)](https://make.fun/bounty/u-clever-harbor-75-one-star-for-monday-9ead4a61)

A one-star review of Monday, written as if Monday were a restaurant — one line, 22 words, no explanation attached. Entry for the [One Star for Monday](https://make.fun/bounty/u-clever-harbor-75-one-star-for-monday-9ead4a61) bounty on make.fun.

## The line

> One star. Monday's waiter is my alarm clock: it woke me, served yesterday's weekend cold, and billed me for the whole week.

The waiter is the alarm clock, the dish is yesterday's weekend served cold, and the bill is the whole week.

## How it works

`main.ts` writes the line to `entry.txt` in the output directory (`/output` by default, or `$OUTPUT_DIR`). Before writing it validates the line: one line of plain text, 1–180 characters, at most 25 words, no leading/trailing whitespace, no control or invisible characters — then reads the file back and proves it is byte-for-byte identical. The output directory itself is never removed, only its contents are cleared.

Run it:

```sh
OUTPUT_DIR=./out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
