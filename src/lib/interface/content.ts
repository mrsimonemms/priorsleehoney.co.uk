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

export interface Content extends MarkdownMetadata {
	date: string;
	excerpt?: string;
	image: string;
	imageSize?: 'small' | 'medium' | 'large';
	publish?: boolean;
	slug: string;
	tags: string[];
	subtitle?: string;
	title: string;
	useTwitterSummaryImage?: boolean;
}

export interface MarkdownHeading {
	title: string;
	slug: string;
	level: number;
	children: MarkdownHeading[];
}

export interface MarkdownMetadata {
	headings: MarkdownHeading[];
}

export interface MdsvexImport<T extends MarkdownMetadata = MarkdownMetadata> {
	// Technically not correct but needed to make language-tools happy
	default: ConstructorOfATypedSvelteComponent;
	metadata: T;
}
