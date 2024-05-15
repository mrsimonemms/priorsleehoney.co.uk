<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import DateFormat from '$lib/components/date-format.svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Opengraph from '$lib/components/opengraph.svelte';
	import type { PageData } from './$types';
	import { DateTime } from 'luxon';

	export let data: PageData;

	const title = 'Blog';

	let filteredPosts = false;
	let { posts } = data;
	let filter: string | null = null;

	afterNavigate(() => {
		filter = $page.url.searchParams.get('tag');

		filteredPosts = filter !== null;
		posts = data.posts;

		if (filteredPosts) {
			posts = posts.filter(({ tags }) => tags.includes(filter!));
		}
	});
</script>

<Opengraph {title} />

{#if filteredPosts}
	<section class="section">
		<div class="container">
			<h2 class="is-size-2">Tags</h2>
			<span class="tag is-large">{filter}</span>

			<a class="button pb-2" href="/blog" data-sveltekit-noscroll>
				<span>Clear filters</span>
				<span class="icon is-small">
					<i class="mdi mdi-close" />
				</span>
			</a>

			<hr />
		</div>
	</section>
{/if}

<section class="section">
	<div class="container">
		<div class="columns is-multiline">
			{#each posts as post, key}
				<div
					class="column"
					class:is-half={key < 2}
					class:is-one-quarter={key >= 2}
				>
					<Card href="/{post.slug}" img="/img/{post.slug}/{post.image}">
						<h2 class="title">{post.title}</h2>
						{#if post.subtitle}
							<h3 class="subtitle">{post.subtitle}</h3>
						{/if}

						<div class="content">
							{post.excerpt}
						</div>

						<div class="tags are-medium">
							{#each post.tags ?? [] as tag}
								<a
									href="/blog{tag !== filter ? `?tag=${tag}` : ''}"
									class="tag"
									data-sveltekit-noscroll
								>
									{tag}
								</a>
							{/each}
						</div>

						<p class="is-size-7 has-text-grey has-text-right">
							Published:
							<DateFormat date={post.date} format={DateTime.DATE_FULL} />
						</p>
					</Card>
				</div>
			{/each}
		</div>
	</div>
</section>
