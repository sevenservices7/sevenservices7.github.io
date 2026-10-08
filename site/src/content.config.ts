import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog / notícias: um arquivo .md por artigo em src/content/blog/.
// draft: true → a página é gerada com noindex e aviso de rascunho, mas não aparece
// na listagem nem no sitemap (para revisão antes de publicar).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Slugs de soluções relacionadas (src/data/solucoes). */
    related: z.array(z.string()).default([]),
    author: z.string().default('Equipe SEVEN'),
    draft: z.boolean().default(false),
  }),
});

// SEVEN Cast: um arquivo .md por episódio em src/content/podcast/.
// O corpo do arquivo é a descrição + a transcrição completa (## Transcrição).
const podcast = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/podcast' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    /** ID do vídeo no YouTube (o que vem depois de watch?v=). */
    youtubeId: z.string(),
    episode: z.number().optional(),
    duration: z.string().optional(),
    guests: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, podcast };
