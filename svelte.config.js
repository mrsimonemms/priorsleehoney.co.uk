/*
 * Copyright 2024 Simon Emms <simon@simonemms.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import fm from 'front-matter';
import fs from 'fs';
import { globSync as glob } from 'glob';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const content = glob('./src/content/**/*.md');
const entries = content
	.filter((item) => {
		// Don't include unpublished posts in final build
		const data = fs.readFileSync(item, 'utf-8');
		const { attributes } = fm(data);

		return attributes.publish ?? true;
	})
	.map((item) =>
		item
			.replace(/^src\/content\//, '/')
			.replace(/\.md$/, '')
			.replace('index', ''),
	);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({}), mdsvex(mdsvexConfig)],

	extensions: ['.svelte', ...mdsvexConfig.extensions],

	prerender: {
		crawl: true,
	},

	alias: {
		$content: 'src/content',
	},

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			fallback: '404.html',
			strict: true,
		}),

		prerender: {
			entries,
		},
	},
};

export default config;
