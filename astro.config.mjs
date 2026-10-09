// @ts-check
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import starlightLlmsTxt from "starlight-llms-txt";

const site = "https://emdash-code.jithins.dev";
const repo = "https://github.com/jithinsk/emdash-header-footer-code";

/** Last git commit date of the doc behind a URL, or undefined (shallow clone, new file). */
function lastModified(url) {
	const slug = new URL(url).pathname.replace(/^\/|\/$/g, "") || "index";
	const file = [`src/content/docs/${slug}.mdx`, `src/content/docs/${slug}.md`].find((f) => existsSync(f));
	if (!file) return undefined;
	try {
		const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], { encoding: "utf8" }).trim();
		return iso || undefined;
	} catch {
		return undefined;
	}
}

export default defineConfig({
	site,
	integrations: [
		// Added explicitly (Starlight skips its own) so entries carry <lastmod>.
		sitemap({ serialize: (item) => ({ ...item, lastmod: lastModified(item.url) }) }),
		starlight({
			title: "EmDash Header & Footer Code",
			description:
				"An EmDash plugin that adds analytics, verification tags, chat widgets and custom CSS/JS to the head or body of your pages, with no theme edits.",
			logo: { src: "./src/assets/logo.svg", alt: "EmDash Header & Footer Code" },
			favicon: "/favicon.svg",
			social: [
				{ icon: "github", label: "GitHub", href: repo },
				{ icon: "npm", label: "npm", href: "https://www.npmjs.com/package/emdash-header-footer-code" },
			],
			editLink: { baseUrl: "https://github.com/jithinsk/emdash-code-website/edit/main/" },
			customCss: ["./src/styles/custom.css"],
			lastUpdated: true,
			components: {
				Head: "./src/components/Head.astro",
				Footer: "./src/components/Footer.astro",
			},
			plugins: [
				starlightLlmsTxt({
					projectName: "EmDash Header & Footer Code",
					description:
						"emdash-header-footer-code is a native EmDash plugin that outputs admin-managed HTML snippets (analytics, verification tags, chat widgets, CSS/JS) in the head, body start or body end of public pages, with path, page-kind and locale targeting.",
				}),
			],
			head: [
				{ tag: "link", attrs: { rel: "icon", href: "/favicon.ico", sizes: "32x32" } },
				{ tag: "meta", attrs: { property: "og:image", content: `${site}/og.png` } },
				{ tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
				{ tag: "meta", attrs: { property: "og:image:height", content: "630" } },
				{ tag: "meta", attrs: { property: "og:image:alt", content: "EmDash Header & Footer Code: analytics, verification tags, chat widgets and custom CSS/JS for EmDash" } },
				{
					tag: "script",
					attrs: {
						defer: true,
						src: "https://static.cloudflareinsights.com/beacon.min.js",
						"data-cf-beacon": '{"token": "3ba24b21ff3e4eca8c7b0da70032cbc2"}',
					},
				},
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
						{ label: "Troubleshooting", slug: "guides/troubleshooting" },
					],
				},
				{
					label: "How-to guides",
					items: [
						{ label: "Google Analytics 4", slug: "how-to/google-analytics" },
						{ label: "Google Tag Manager", slug: "how-to/google-tag-manager" },
						{ label: "Search Console verification", slug: "how-to/search-console-verification" },
						{ label: "Cookie consent banner", slug: "how-to/cookie-consent" },
						{ label: "Live chat widget", slug: "how-to/chat-widget" },
						{ label: "Custom CSS & JavaScript", slug: "how-to/custom-css-js" },
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
						{ label: "Changelog", slug: "changelog" },
						{ label: "Security", slug: "security" },
						{ label: "Contributing", slug: "contributing" },
					],
				},
			],
		}),
	],
});
