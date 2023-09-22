<script lang="ts">
    import { page } from "$app/stores";


    let name = $page.params.project;
</script>

<div class="project-preview">
    <h2>
        {name}
    </h2>
</div>