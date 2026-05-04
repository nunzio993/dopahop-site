import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    locale: z.enum(['it', 'en', 'es', 'de', 'fr']),
    draft: z.boolean().default(false),
    author: z.string().default('DopaHop'),
    translationKey: z.string().optional(),
  }),
});

export const collections = { blog };
