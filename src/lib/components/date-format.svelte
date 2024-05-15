<script lang="ts">
	import { DateTime } from 'luxon';

	export let date: string;

	export let format: Intl.DateTimeFormatOptions = DateTime.DATETIME_SHORT;

	function parseDate(date?: string): Date {
		if (!date) {
			// Date not set - set to start of unix epoch
			return new Date(0);
		}

		return new Date(Date.parse(date));
	}
</script>

<time datetime={parseDate(date).toISOString()}>
	{DateTime.fromJSDate(parseDate(date)).toLocaleString(format)}
</time>
