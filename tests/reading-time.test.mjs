import { test } from "node:test";
import assert from "node:assert/strict";
import { readingTime } from "../src/lib/reading-time.mjs";

const words = (n) => Array.from({ length: n }, () => "word").join(" ");

test("rounds up at 150 words per minute", () => {
  assert.equal(readingTime(words(150)), "1min");
  assert.equal(readingTime(words(151)), "2min");
  assert.equal(readingTime(words(705)), "5min");
});

test("never returns less than 1min", () => {
  assert.equal(readingTime(""), "1min");
  assert.equal(readingTime("   \n\t "), "1min");
  assert.equal(readingTime(undefined), "1min");
});

test("splits on any whitespace, including CRLF", () => {
  assert.equal(readingTime(`${words(150)}\r\n\r\n${words(100)}`), "2min");
});
