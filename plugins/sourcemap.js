import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { parseSync } from "oxc-parser";
import { ScopeTracker, walk } from "oxc-walker";
import MagicString from "magic-string";

/**@type {import("rolldown").Plugin}*/
export const babelMagicString = {
	name: "babel+magicString",
	transform(code, id) {
		if (!id.endsWith(".jsx")) return null;

		// Parse JSX code into AST
		const ast = parse(code, {
			sourceType: "module",
			plugins: ["jsx"],
		});

		let ms = new MagicString(code);
		// Traverse the AST
		traverse.default(ast, {
			JSXAttribute(path) {
				const node = path.node;
				if (
					node.value?.type === "JSXExpressionContainer" &&
					node.value.expression?.type === "Identifier" &&
					node.value.expression.name === "I"
				) {
					// Get the binding for "I"
					const binding = path.scope.getBinding("I");
					if (binding) {
						// extract icon type from `@iconify-icons/material-symbols/mark-email-read-outline-rounded.js`
						let reg = /import I from '(@iconify-icons\/([^']+)\.js)'/;
						let match = code.match(reg)?.[2];

						ms.appendRight(
							node.start,
							`  
onClick={() => {
  console.log('icon: ${match}')
}}
`,
						);
					}
				}
			},
		});

		return {
			code: ms.toString(),
			map: ms.generateMap({ hires: true }),
		};
	},
};

export const oxcMagicString = {
	name: "oxc+magicString",
	transform(code, id) {
		if (!id.endsWith(".jsx")) return null;

		const res = parseSync(id, code, {
			experimentalRawTransfer: true,
			experimentalLazy: false,
		});

		const scopeTracker = new ScopeTracker({
			preserveExitedScopes: true,
		});
		let ms = new MagicString(code);
		// main pass to analyze references
		walk(res.program, {
			scopeTracker,
			enter(node, parent, ctx) {
				if (
					node.type === "JSXAttribute" &&
					node.value.type === "JSXExpressionContainer" &&
					node.value.expression.type === "Identifier" &&
					node.value.expression.name === "I"
				) {
					let decl = scopeTracker.getDeclaration("I");
					// extract icon type from `@iconify-icons/material-symbols/mark-email-read-outline-rounded.js`
					ms.appendRight(
						node.start,
						`  
onClick={() => {
  console.log('icon: ${decl.importNode.source.value}')
}}
`,
					);
				}
			},
		});

		return {
			code: ms.toString(),
			map: ms.generateMap({ hires: true }),
		};
	},
};

export const oxcNative = {
	name: "oxc+nativeMagicString",
	transform(code, id, meta) {
		if (id.endsWith(".jsx")) return null;

		let { magicString: ms, ast } = meta;

		const scopeTracker = new ScopeTracker({
			preserveExitedScopes: true,
		});
		// main pass to analyze references
		walk(ast, {
			scopeTracker,
			enter(node, parent, ctx) {
				if (
					node.type === "JSXAttribute" &&
					node.value.type === "JSXExpressionContainer" &&
					node.value.expression.type === "Identifier" &&
					node.value.expression.name === "I"
				) {
					let decl = scopeTracker.getDeclaration("I");
					// extract icon type from `@iconify-icons/material-symbols/mark-email-read-outline-rounded.js`
					ms.appendRight(
						node.start,
						`  
onClick={() => {
  console.log('icon: ${decl.importNode.source.value}')
}}
`,
					);
				}
			},
		});

		return {
			code: ms,
		};
	},
};

export const noopTransform = {
	name: "noop",
	transform(code, id, meta) {},
};
