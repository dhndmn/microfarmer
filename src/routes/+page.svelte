<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
import { getModalStore } from '@skeletonlabs/skeleton';
			
const modalStore = getModalStore();    

const modal = {
	type: 'prompt',
	// Data
	title: 'New farmer onboarding',
	body: 'Provide your first name in the field below.',
	// Populates the input value and attributes
	value: 'Skeleton',
	valueAttr: { type: 'text', minlength: 1, maxlength: 30, required: true },
	// Returns the updated response value
	response: (r) => console.log('response:', r),
};

onMount(() => {
    
    // If there is no user, show the onboarding modal

    modalStore.trigger(modal);
    
        // If there is a user, redirect to farm route
        // goto("/farm")
    }) 
        
</script>


