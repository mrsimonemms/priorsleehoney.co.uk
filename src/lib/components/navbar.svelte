<script lang="ts">
	import type { IMenuLinks } from '$lib/interface/menu';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	let displayNav = false;

	const menuLinks: IMenuLinks[] = [
		{
			name: 'Home',
			url: '/',
		},
	];

	afterNavigate(() => {
		displayNav = false;
	});
</script>

<div class="container is-flex-grow-0">
	<nav class="navbar" aria-label="main navigation">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
				<img src="/img/brand/logo.png" alt="Priorslee Honey" />
			</a>

			<button
				class="navbar-burger"
				aria-label="menu"
				aria-expanded={displayNav}
				data-target="navbar-menu"
				on:click={() => (displayNav = !displayNav)}
				tabindex="0"
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</button>
		</div>

		<div id="navbar-menu" class="navbar-menu" class:is-active={displayNav}>
			<div class="navbar-start"></div>
			<div class="navbar-start">
				{#each menuLinks as item}
					<a
						class="navbar-item is-tab"
						class:is-active={item.exactMatch !== false
							? $page.url.pathname === item.url
							: $page.url.pathname?.startsWith(item.url)}
						href={item.url}
						target={item.external ? '_blank' : undefined}
					>
						{item.name}
					</a>
				{/each}
			</div>
			<div class="navbar-end"></div>
		</div>
	</nav>
</div>
