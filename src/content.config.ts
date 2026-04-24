import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string(),
		author: z.string().default('Uyanga'),
		coverImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		featured: z.boolean().default(false),
		draft: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		year: z.coerce.number(),
		client: z.string(),
		description: z.string(),
		role: z.string(),
		services: z.array(z.string()).default([]),
		outcome: z.string(),
		featured: z.boolean().default(false),
		projectUrl: z.string().url().optional(),
	}),
});

export const collections = { blog, projects };
