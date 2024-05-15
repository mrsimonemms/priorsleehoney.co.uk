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

import { error } from '@sveltejs/kit';
import type { Content, MdsvexImport } from './interface/content';

function normaliseSlug(slug: string): string {
	// Remove the trailing slash
	slug = slug.replace(/\/$/, '');

	if (slug === '') {
		// If nothing set, default to "index"
		slug = 'index';
	}

	return slug;
}

export async function fetchAll() {
	const list = import.meta.glob('../content/**/*.*');

	const out: Record<string, () => Promise<unknown>> = {};
	for (const key in list) {
		const newKey = key.replace('../content/', '').replace(/\..*$/, '');

		out[newKey] = list[key];
	}
	return out;
}

export async function fetchBlogMetadata() {
	const list = import.meta.glob<Content>('../content/blog/*.*', {
		eager: true,
		import: 'metadata',
	});

	return parseReadContent(list);
}

export function parseReadContent<
	T extends { date?: string; publish?: boolean },
>(data: Record<string, T>): T[] {
	return Object.entries(data)
		.filter(([, { publish }]) => publish ?? true)
		.map(([file, data]) => ({
			slug: mdPathToSlug(file),
			...data,
		}))
		.sort(dateSort);
}

export function dateSort<T extends { date?: string }>(a: T, b: T): number {
	return Date.parse(b.date ?? '') - Date.parse(a.date ?? '');
}

export function mdPathToSlug(slug: string) {
	return normaliseSlug(
		([...slug.split('/')].slice(-2) ?? '').join('/').replace(/\.\w+$/, ''),
	);
}

export async function fetch(slug: string) {
	try {
		slug = normaliseSlug(slug);

		const contentList = await fetchAll();

		const content = contentList[slug];

		const data: MdsvexImport<Content> =
			(await content()) as MdsvexImport<Content>;

		return {
			content: { ...data.metadata, slug },
			Component: data.default,
		};
	} catch (err) {
		throw error(404, `Unable to find "${slug}"`);
	}
}
