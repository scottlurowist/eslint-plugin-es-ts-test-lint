/**
 * @fileoverview Tests for try-catch-finally in a unit test.
 * @author Scott Lurowist
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
 
const rule = require("../../../es-ts-test-lint/lib/rules/no-try-catch-finally"),
	{ RuleTester } = require("../../../node_modules/eslint/lib/rule-tester"); //lib/rule-tester");
 
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
 
const ruleTester = new RuleTester();
 
ruleTester.run("Try-catch may appear in a non-test file.", rule, {
	valid: [
		{
			code: "const x = 4;",
			filename: "foo.js",  // Not a test file
		},        
		{
			code: "try{ throw new Error(); } catch(error) { }",
			filename: "foo.js",  // Not a test file
		}
	],
	invalid: [
		{
			code: "try{ throw new Error(); } catch(error) { }",
			filename: "foo.test.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 43 }]
		},
		{
			code: "try{ throw new Error(); } finally{ }",
			filename: "foo.test.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 37 }]
		},
		{
			code: "try{ throw new Error(); } catch(error) {} finally{ }",
			filename: "foo.test.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 53 }]
		},              
		{
			code: "try{ throw new Error(); } catch(error) { }",
			filename: "foo.spec.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 43 }]
		},
		{
			code: "try{ throw new Error(); } finally{ }",
			filename: "foo.spec.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 37 }]
		},
		{
			code: "try{ throw new Error(); } catch(error) {} finally{ }",
			filename: "foo.spec.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 53 }]
		},         
	]
});