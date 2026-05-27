<script lang="ts">
	import Button from '../button/button.svelte';
	import Modal from './modal.svelte';
	import Form from '../form/form.svelte';
	import type { Props } from '~/types/addMetricModal';
	import type { Props as Field } from '~/types/formField';

	let { closeModal, addMetric }: Props = $props();

	let urlValue = $state('');
	let titleValue = $state('');
	let typeValue = $state('');

	const urlField: Field = $derived({
		label: 'URL',
		name: 'url',
		id: 'url',
		value: urlValue,
		type: 'input',
		placeholder: '/metric',
		updateValue: (value) => {
			urlValue = value;
		},
	});

	const titleField: Field = $derived({
		label: 'Название',
		name: 'title',
		id: 'title',
		value: titleValue,
		type: 'input',
		placeholder: 'Новая метрика',
		updateValue: (value) => {
			titleValue = value;
		},
	});

	const typeField: Field = $derived({
		label: 'Тип метрики',
		name: 'metric_type',
		id: 'metric_type',
		value: typeValue,
		type: 'input',
		placeholder: 'CPU',
		updateValue: (value) => {
			typeValue = value;
		},
	});

	const AddMetricFields: Field[] = $derived([
		titleField,
		urlField,
		typeField,
	]);

	function addMetricModal() {
		if (titleValue === '' || urlValue === '' || typeValue === '') {
			return;
		}

		addMetric({
			title: titleValue,
			type: typeValue,
			url: urlValue,
		});
	}
</script>

{#snippet header()}
	<div class="add-metric-header">Добавить новую метрику</div>
{/snippet}

{#snippet footerButtons()}
	<div class="add-metric-footer">
		<Button text="Добавить" confirm pink onClick={addMetricModal} />
	</div>
{/snippet}

<Modal {header} {footerButtons} {closeModal}>
	<Form fields={AddMetricFields} />
</Modal>

<style lang="scss" scoped>
	.add-metric-header {
		font-size: 22px;
	}

	.add-metric-footer {
		font-size: 20px;
	}
</style>
