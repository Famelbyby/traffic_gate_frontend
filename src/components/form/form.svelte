<script lang="ts">
    import type {Props as Field} from '~/types/formField';
	import FormField from './formField.svelte';

    export type Props = {
        fields: Field[];
    }

    let {fields}: Props = $props();
</script>

<div class="form">
    {#each fields as field(field.id)}
        <FormField {...field} />
    {/each}
</div>

<style lang="scss" scoped>
    .form {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }
</style>