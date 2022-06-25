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
		type: "problem",

		docs: {
			description: "disallow try-catch-finally in unit tests",
			recommended: false,
			url: ""
		},

		schema: {},
	},

	create: function (context) {

		const numberType = "number";

		//--------------------------------------------------------------------------
		// Helpers
		//--------------------------------------------------------------------------

		function isThisFileATestFile() {
			const testRegExPattern = /(\.spec\.js|\.specs\.js|\.test\.js|\.tests\.js)$/;

			return testRegExPattern.test(context.getFilename().toLowerCase());
		}

		//--------------------------------------------------------------------------
		// Public API
		//--------------------------------------------------------------------------
		return {
			CallExpression(node) {
				if (isThisFileATestFile()) {
					node.arguments.forEach(argument => {
						if (typeof argument.value === "number") {
							context.report(argument, "No magic numbers in tests.");
						}
                        
						if (typeof argument.value === "string") {
							context.report(argument, "No magic strings in tests.");
						}                           
					});
				}
			}
		};
	}
};
