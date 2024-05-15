<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import DateFormat from '$lib/components/date-format.svelte';
	import { DateTime } from 'luxon';

	// Types aren't supported by mdsvex
	export let data;

	const heroImagePath = `/img/${data.content.content.slug}/${
		data.content.content.image ?? 'banner.jpg'
	}`;

	$: contentIndex = data.blogMetadata.findIndex(
		({ slug }) => slug === data.content.content.slug,
	);
	$: next = data.blogMetadata[contentIndex + 1] ?? null;
	$: previous = data.blogMetadata[contentIndex - 1] ?? null;
</script>

<Hero
	title={data.content.content.title}
	subtitle={data.content.content.subtitle}
	img={heroImagePath}
	size={data.content.content.imageSize ?? 'medium'}
/>

<section class="section">
	<div class="container">
		<div class="columns">
			<div class="column is-two-thirds">
				<p class="is-size-7 has-text-grey has-text-right">
					Published:
					<DateFormat
						date={data.content.content.date}
						format={DateTime.DATE_FULL}
					/>
				</p>

				<div class="content">
					<slot />
				</div>

				{#if previous || next}
					<hr />

					<div class="columns">
						{#if previous}
							<div class="column is-half">
								<p class="title is-6">
									<span class="icon">
										<i class="mdi mdi-18px mdi-arrow-left"></i>
									</span>
									Previous
								</p>
								<p>
									<a href="/{previous.slug}">{previous.title}</a>
								</p>
							</div>
						{/if}

						{#if next}
							<div
								class="column is-half has-text-right"
								class:is-offset-half={!previous}
							>
								<p class="title is-6">
									Next
									<span class="icon">
										<i class="mdi mdi-18px mdi-arrow-right"></i>
									</span>
								</p>

								<p>
									<a href="/{next.slug}">{next.title}</a>
								</p>
							</div>
						{/if}
					</div>
				{/if}
			</div>

			<div class="column is-one-third">
				<div class="card">
					<header class="card-header">
						<p class="card-header-title">About the author</p>
					</header>
					<div class="card-content">@todo</div>
				</div>

				{#if (data.content.content.tags ?? []).length > 0}
					<div class="card">
						<header class="card-header">
							<p class="card-header-title">Tags</p>
						</header>
						<div class="card-content">
							<div class="tags are-medium">
								{#each data.content.content.tags as tag}
									<a href="/blog?tag={tag}" class="tag">{tag}</a>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
