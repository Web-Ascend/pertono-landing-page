import { defineCollection } from "astro:content";
// Astro deprecated re-exporting `z` from "astro:content"; `astro/zod` is the
// supported path and pins us to the same zod the content pipeline validates with.
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/**
 * Two collections, because they are two different jobs.
 *
 * `blog` answers questions a Vorstand actually types into a search engine —
 * "Kassenbuch Verein Pflicht", "SEPA Lastschrift Verein einrichten".
 *
 * `vergleich` holds the comparison pages that catch people already looking to
 * switch. They carry a competitor name, so the schema requires the fields that
 * keep such a page honest and legally safe: when it was last checked, and
 * against which version.
 */

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().max(70, "Longer than this is truncated in search results"),
    description: z.string().min(50).max(160, "Meta descriptions are cut off past 160 characters"),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default("Pertono"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const vergleich = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/vergleich" }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(50).max(160),
    competitor: z.string(),
    // A comparison page that goes stale becomes a false claim about a named
    // company. Requiring the date makes the staleness visible.
    checkedOn: z.coerce.date(),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, vergleich };
