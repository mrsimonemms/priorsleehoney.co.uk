<script lang="ts">
	import Hero from '$lib/components/hero.svelte';

	export let data;

	const { title, subtitle, image, slug, imageSize } = data.content.content;

	let heroImage = '/index/img_6090.jpg';
	if (image) {
		heroImage = `${slug}/${image}`;
	}
</script>

<Hero {title} {subtitle} img="/img/{heroImage}" size={imageSize} />

<div class="container">
	<slot />
</div>
