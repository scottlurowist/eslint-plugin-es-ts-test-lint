---
title: no-try-catch-finally
layout: doc
edit_link: https://github.com/eslint/eslint/edit/main/docs/src/rules/semi.md
rule_type: layout
related_rules:

further_reading:

---

Disallows `try-catch-finally` logic in unit tests.

Unit tests must not contain logic. We test code in part because code has logic. So if you
add logic to a test then you shold write a test to test your test. Where does that end?

Unit tests should be modelled after mathematical proofs in which only `definitions`(requirements), `setup`, `previously proven results`, the `act`, and `expectations` are in the test.


## Rule Details

This rule enforces no try-catch-finally logic in unit tests. A unit test is defined as a test file that terminates with `.test.js` or `.spec.js` in the filename. 

If a test uses a utility method and that utility method is tested, then `try-catch-finally` is permissible in the utility method.

## Options

This rule has no options.

## When Not To Use It

You should not disable this rule. It is a bad testing practice to introduce `try-catch-finally` logic into a unit test.