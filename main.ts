import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Star for Monday — a one-star review of Monday as if it were a restaurant.
// The waiter is the alarm clock, the dish is yesterday's weekend served cold,
// and the bill is the whole week. 22 words, one line, no trailing newline.
const ENTRY =
  "One star. Monday's waiter is my alarm clock: it woke me, served yesterday's weekend cold, and billed me for the whole week.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

function fail(message: string): never {
  throw new Error(`entry validation failed: ${message}`);
}

// The line must be exactly what the judge sees: one line, plain text.
if (ENTRY.length < 1 || ENTRY.length > 180) {
  fail(`length ${ENTRY.length} is outside the 1-180 character gate`);
}
if (ENTRY.trim().length === 0) {
  fail("entry is only whitespace");
}
if (/[\r\n]/.test(ENTRY)) {
  fail("entry must be a single line");
}
// Invisible characters would silently change what the judge reads: no BOM,
// no non-breaking or zero-width spaces, no other control characters, and no
// trailing or leading whitespace of any kind.
if (/^[\s\uFEFF]/.test(ENTRY) || /[\s\uFEFF]$/.test(ENTRY)) {
  fail("entry has leading or trailing whitespace");
}
if (/[\u0000-\u001F\u007F\u00A0\u2000-\u200B\u3000\uFEFF]/.test(ENTRY)) {
  fail("entry contains a control or invisible character");
}
const words = ENTRY.split(/\s+/).filter(Boolean);
if (words.length > 25) {
  fail(`entry has ${words.length} words, over the 25-word limit`);
}

// The output directory is the grader's mount point: create it if it is
// missing, and clear only its contents — never remove the directory itself.
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}
for (const child of readdirSync(outDir)) {
  rmSync(join(outDir, child), { recursive: true, force: true });
}

writeFileSync(outFile, ENTRY, "utf8");

const bytes = Buffer.byteLength(ENTRY, "utf8");

// Read the file back and prove it is exactly the validated line: strict
// UTF-8, byte-for-byte identical, still a single line with no trailing byte.
const roundTrip = readFileSync(outFile, "utf8");
if (roundTrip !== ENTRY) {
  fail("written file does not match the validated entry");
}
if (Buffer.byteLength(roundTrip, "utf8") !== bytes) {
  fail("written file byte length changed");
}

console.log(`wrote ${outFile}`);
console.log(`characters: ${ENTRY.length}, words: ${words.length}, bytes: ${bytes}`);
console.log("read-back verification passed");
