/**
 * @fileoverview Rule to flag try-catch-finally in test files.
 * @author Scott Lurowist
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// require statements here...
 
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		type: "layout",

		docs: {
			description: "disallow try-catch-finally in unit tests",
			recommended: false,
			url: "https://eslint.org/docs/rules/semi"
		},

		fixable: "code",

		schema: {
			anyOf: [
				{
					type: "array",
					items: [
						{
							enum: ["never"]
						},
						{
							type: "object",
							properties: {
								beforeStatementContinuationChars: {
									enum: ["always", "any", "never"]
								}
							},
							additionalProperties: false
						}
					],
					minItems: 0,
					maxItems: 2
				},
				{
					type: "array",
					items: [
						{
							enum: ["always"]
						},
						{
							type: "object",
							properties: {
								omitLastInOneLineBlock: { type: "boolean" }
							},
							additionalProperties: false
						}
					],
					minItems: 0,
					maxItems: 2
				}
			]
		},

		messages: {
			missingSemi: "Missing semicolon.",
			extraSemi: "Extra semicolon."
		}
	},

	create: function(context) {

		const fileName = context.getFilename();

		//--------------------------------------------------------------------------
		// Helpers
		//--------------------------------------------------------------------------
        
		function isTestFile(fileName) {
            const lower = fileName.toLowerCase();

            const testRegExPattern = /(\.spec\.js|\.test\.js)$/;

            return testRegExPattern.test(lower);
		};

		//--------------------------------------------------------------------------
		// Public API
		//--------------------------------------------------------------------------
		return {
			TryStatement(node) {
                const result = isTestFile(fileName);

				if (isTestFile(fileName)) {
					context.report(node, "No try-catch-finally logic in tests");
				} 
			}                 
		};
 
	}
};