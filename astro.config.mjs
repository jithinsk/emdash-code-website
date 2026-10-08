// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const repo = "https://github.com/jithinsk/emdash-header-footer-code";

export default defineConfig({
	site: "https://emdash-code.jithins.dev",
	integrations: [
		starlight({
			title: "Header & Footer Code",
			description:
				"An EmDash plugin that adds analytics, verification tags, chat widgets and custom CSS/JS to the head or body of your pages, with no theme edits.",
			logo: { src: "./src/assets/logo.svg", alt: "Header & Footer Code" },
			favicon: "/favicon.svg",
			social: [
				{ icon: "github", label: "GitHub", href: repo },
				{ icon: "npm", label: "npm", href: "https://www.npmjs.com/package/emdash-header-footer-code" },
			],
			editLink: { baseUrl: "https://github.com/jithinsk/emdash-code-website/edit/main/" },
			customCss: ["./src/styles/custom.css"],
			lastUpdated: true,
			head: [
				{ tag: "meta", attrs: { property: "og:image", content: "https://emdash-code.jithins.dev/og.png" } },
			],
			sidebar: [
				{
					label: "Start here",
					items: [
						{ label: "Introduction", slug: "introduction" },
						{ label: "Installation", slug: "installation" },
						{ label: "Theme setup", slug: "theme-setup" },
					],
				},
				{
					label: "Guides",
					items: [
						{ label: "Managing snippets", slug: "guides/snippets" },
						{ label: "Targeting pages", slug: "guides/targeting" },
						{ label: "Kill switch & change log", slug: "guides/kill-switch" },
						{ label: "Caching & freshness", slug: "guides/caching" },
						{ label: "Extending with transforms", slug: "guides/transforms" },
						{ label: "Recipes", slug: "guides/recipes" },
					],
				},
				{
					label: "Reference",
					items: [
						{ label: "Snippet fields", slug: "reference/fields" },
						{ label: "Path patterns", slug: "reference/path-patterns" },
						{ label: "Permissions", slug: "reference/permissions" },
						{ label: "Limits", slug: "reference/limits" },
						{ label: "API & types", slug: "reference/api" },
						{ label: "Data model", slug: "reference/data-model" },
					],
				},
				{
					label: "Project",
					items: [
						{ label: "Security", slug: "security" },
						{ label: "Versioning", slug: "versioning" },
						{ label: "Contributing", slug: "contributing" },
					],
				},
			],
		}),
	],
});
