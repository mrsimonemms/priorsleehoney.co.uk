<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import {
		PUBLIC_DOMAIN_NAME as domainName,
		PUBLIC_TWITTER_USER as twitterUser,
	} from '$env/static/public';

	const siteTitle = 'Site title';

	// @todo(sje): add in sensible defaults

	// eslint-disable-next-line no-undef
	export let description = __DESCRIPTION__;
	export let title = 'Untitled Page';
	export let type: 'article' | 'website' = 'website';
	export let image = '/img/logo.png';
	export let norobots = false;
	export let keywords: string[] = ['tag1', 'tag2'];
	export let useTwitterSummaryImage = true;
</script>

<svelte:head>
	<title>{title} | {siteTitle}</title>
	<meta name="keywords" content={keywords.join(', ')} />
	<meta name="description" content={description} />

	{#if norobots}
		<meta name="robots" content="noindex" />
	{/if}

	<!-- https://ogp.me -->
	<meta property="og:image" content="{domainName}{base}{image}" />
	<meta property="og:description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content="{domainName}{$page.url.pathname}" />

	<!-- https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup -->
	<meta
		name="twitter:card"
		content={useTwitterSummaryImage ? 'summary' : 'summary_large_image'}
	/>
	<meta name="twitter:site" content="@{twitterUser}" />
	<meta name="twitter:creator" content="@{twitterUser}" />
	<meta name="twitter:image" content="{domainName}{base}{image}" />
</svelte:head>
