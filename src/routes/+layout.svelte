<script>
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';

	import '../app.scss';
</script>

<Navbar />

<div class="is-flex-grow-1">
	<slot />
</div>

<Footer />
