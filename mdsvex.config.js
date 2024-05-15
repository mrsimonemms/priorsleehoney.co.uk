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

import { globSync as glob } from 'glob';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

const layoutsPath = './src/layouts';
const ext = '.svelte';

// Get all the defined layouts
const layout = glob(`${layoutsPath}/*${ext}`)
	.map((filepath) => ({
		filepath,
		name: path.basename(filepath, ext),
	}))
	.reduce((result, { filepath, name }) => {
		if (name === 'default') {
			name = '_';
		}

		result[name] = filepath;

		return result;
	}, {});

export default defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	layout,
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'append',
				content: {
					type: 'element',
					tagName: 'span',
					properties: { className: ['icon'] },
					children: [
						{
							type: 'element',
							tagName: 'span',
							properties: {
								className: ['mdi', 'mdi-link-variant', 'mdi-18px'],
							},
						},
					],
				},
				properties: { className: ['has-text-grey-light'] },
			},
		],
	],
});
