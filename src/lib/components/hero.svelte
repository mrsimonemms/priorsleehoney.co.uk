<script lang="ts">
	import type { Content } from '$lib/interface/content';

	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let img: string;
	export let size: Content['imageSize'] = 'medium';
	export let backgroundPosition = 'center center';
	export let backgroundSize = 'cover';
</script>

<section
	class="hero is-{size}"
	style="background-image: url('{img}'); background-position: {backgroundPosition}; background-size: {backgroundSize};"
>
	<div class="container">
		<div class="hero-body">
			<div class="has-background-black-ter is-inline-block p-5">
				<h1 class="title has-text-white-ter">{title}</h1>
				{#if subtitle}
					<h2 class="subtitle has-text-white-ter pt-2">{subtitle}</h2>
				{/if}
			</div>
		</div>
	</div>
</section>
