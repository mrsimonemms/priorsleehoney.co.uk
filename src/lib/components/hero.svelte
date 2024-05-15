<script lang="ts">
	import type { Content } from '$lib/interface/content';

	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let img: string;
	export let size: Content['imageSize'] = 'medium';
</script>

<section class="hero is-{size}" style="background-image: url('{img}');">
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

<style lang="scss">
	.hero {
		background: {
			position: center center;
			size: cover;
		}
	}
</style>
