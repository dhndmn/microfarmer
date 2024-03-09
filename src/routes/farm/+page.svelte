<script>
	import { farmerName } from '$lib/stores/farmer';
	const getDayTime = () => {
		const hour = new Date().getHours();
		if (hour < 12) return 'morning';
		if (hour < 18) return 'afternoon';
		return 'evening';
	};
	const dayTime = getDayTime();
</script>

<p>Good {dayTime}, farmer {$farmerName}!</p>

[Dashboard goes here]
