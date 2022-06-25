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

	create: function(context) {

		// const fileName = context.getFilename();

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
			TryStatement(node) {
				if (isThisFileATestFile()) {
					context.report(node, "No try-catch-finally logic in tests");
				} 
			}                 
		}; 
	}
};