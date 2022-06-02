/**
 * @fileoverview Tests for try-catch-finally in a unit test.
 * @author Scott Lurowist
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
 
const rule = require("../../../es-ts-test-lint/lib/rules/no-try-catch-finally"),
	{ RuleTester } = require("../../../node_modules/eslint/lib/rule-tester");
 
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
 
const ruleTester = new RuleTester();
 
ruleTester.run("no-try-catch-finally", rule, {
	valid: [
		{
			name: "When the given an empty non-test file does not flag an error.",
			code: "",
			filename: "foo.js",  // Not a test file
		},        
		{
			name: "When the given an non-test file with try/catch logic does not flag an error.",            
			code: "try{ throw new Error(); } catch(error) { }",
			filename: "foo.js",  // Not a test file
		}
	],
	invalid: [
		{
			name: "When the given a 'test' file with try/catch logic flags an error.",            
			code: "try{ throw new Error(); } catch(error) { }",
			filename: "foo.test.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 43 }]
		},
		{
			name: "When the given a 'test' file with try/finally logic flags an error.",            
			code: "try{ throw new Error(); } finally{ }",
			filename: "foo.test.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 37 }]
		},
		{
			name: "When the given a 'test' file with try/catch/finally logic flags an error.",             
			code: "try{ throw new Error(); } catch(error) {} finally{ }",
			filename: "foo.test.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 53 }]
		},              
		{
			name: "When the given a 'spec' file with try/catch logic flags an error.",              
			code: "try{ throw new Error(); } catch(error) { }",
			filename: "foo.spec.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 43 }]
		},
		{
			name: "When the given a 'spec' file with try/finally logic flags an error.",              
			code: "try{ throw new Error(); } finally{ }",
			filename: "foo.spec.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 37 }]
		},
		{
			name: "When the given a 'spec' file with try/catch/finally logic flags an error.",             
			code: "try{ throw new Error(); } catch(error) {} finally{ }",
			filename: "foo.spec.js",
			errors: [{ line: 1, column: 1, endLine: 1, endColumn: 53 }]
		},         
	]
});