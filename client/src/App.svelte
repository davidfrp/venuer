<script lang="ts">
	import { Router } from "@roxi/routify";
	import { routes } from "../.routify/routes";

	console.log(routes);
	
</script>

<Router {routes} />

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>