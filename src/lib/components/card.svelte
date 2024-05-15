<script lang="ts">
	export let href: string;
	export let img: string;
</script>

<a {href}>
	<div class="card">
		<div class="card-image">
			<figure class="image is-2by1" style="background-image: url('{img}')" />
		</div>
		<div class="card-content">
			<slot />
		</div>
	</div>
</a>

<style lang="scss">
	.image {
		background: {
			position: center center;
			size: cover;
		}
	}
</style>
