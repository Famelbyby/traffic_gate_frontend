<script lang="ts">
	import type { CreateMetric } from "~/types/metric";
	import Button from "../button/button.svelte";
	import Modal from "./modal.svelte";

    type Props = {
        closeModal: () => void;
        addMetric: (data: CreateMetric) => void;
    }

    let {closeModal, addMetric}: Props = $props();
</script>

{#snippet header()}
    <div class="add-metric-header">
        Добавить новую метрику
    </div>
{/snippet}

{#snippet footerButtons()}
    <div class="add-metric-footer">
        <Button text="Добавить" confirm pink onClick={() => {
            addMetric({
                title: 'Jopa',
                type: 'CPU',
                url: '/jopa',
            });
        }} />
    </div>
{/snippet}

<Modal {header} {footerButtons} closeModal={closeModal}>
    <div class="jopa">jopa</div>
</Modal>