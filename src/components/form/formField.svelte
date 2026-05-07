<script lang="ts">
	import type { Props } from "~/types/formField";

    let {label, name, type, placeholder, value, updateValue, selectOptions}: Props = $props();

    function onInput(e: Event) {
        const target = e.target as HTMLInputElement;

        updateValue(target.value);
    }

    function onSelect(event: Event) {
        const target = event.target as HTMLSelectElement;

        updateValue(target.value);
    }
</script>

<div class="form-field">
    <label for={name}>{label}</label>
    {#if type === 'input'}
        <input class="form-field__input" {value} {name} placeholder={placeholder ?? label} oninput={onInput} maxlength="50" />
    {:else if type === 'select' && selectOptions !== undefined}
        <select class="form-field__select" onchange={onSelect}>
            {#each selectOptions as option(option)}
                <option value={option}>{option}</option>
            {/each}
        </select>
    {/if}
</div>

<style lang="scss" scoped>
    .form-field {
        display: flex;
        flex-direction: column;
        row-gap: 7px;
    }

    .form-field__input {
        padding: 5px 8px;
        border-radius: 7px;
        border: 1px solid gray;

        &:focus-visible {
            outline: none;
            border: 1px solid black;
        }
    }

    .form-field__select {
        padding: 5px;
        border: 1px solid gray;
        border-radius: 7px;

        &:focus-visible {
            border: 1px solid black;
        }
    }
</style>