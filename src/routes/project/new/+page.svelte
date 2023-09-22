<script lang="ts">
    import { goto } from "$app/navigation";

    let name: string;

    const handleSend= (event: SubmitEventInit) => {
        goto(`${name}`)
    }
</script>


<form on:submit|preventDefault={handleSend}>
    <input type="text" bind:value={name} name="name" id="name">

    <button type="submit">
        Create new Project
    </button>
</form>