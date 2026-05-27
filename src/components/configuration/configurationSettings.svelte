<script lang="ts">
	import type { Props as Field } from '~/types/formField';
	import Form from '../form/form.svelte';
	import { onMount } from 'svelte';
	import type { ConfigurationSettings } from '~/types/configuration';
	import { getConfigurationSettings, postConfigurationSettings } from '~/api/configurationPage/configuration';
	import ResultDisplay from './resultDisplay.svelte';

	let preSymbolValue = $state<ConfigurationSettings['preSymbol']>('');
	let postSymbolValue = $state<ConfigurationSettings['postSymbol']>('');
	let preComplexSymbolValue =
		$state<ConfigurationSettings['preComplexSymbol']>('');
	let postComplexSymbolValue =
		$state<ConfigurationSettings['postComplexSymbol']>('');
	let indentValue = $state<ConfigurationSettings['indent']>('');
	let divisionSymbolValue =
		$state<ConfigurationSettings['divisionSymbol']>('');
	let resultConfigMock = $derived('');

	async function getSettings() {
		const {
			preSymbol,
			preComplexSymbol,
			postComplexSymbol,
			postSymbol,
			indent,
			divisionSymbol,
		} = await getConfigurationSettings();

		preSymbolValue = preSymbol;
		postSymbolValue = postSymbol;
		preComplexSymbolValue = preComplexSymbol;
		postComplexSymbolValue = postComplexSymbol;
		indentValue = indent;
		divisionSymbolValue = divisionSymbol;
	}

	function updateSettings() {
		postConfigurationSettings({
			preSymbol: preSymbolValue,
			preComplexSymbol: preComplexSymbolValue,
			indent: indentValue,
			divisionSymbol: divisionSymbolValue,
			postSymbol: postSymbolValue,
			postComplexSymbol: postComplexSymbolValue,
		});
	}

	const preSymbolField: Field = $derived({
		label: 'Символ перед ключом',
		name: 'presymbol',
		id: 'presymbol',
		value: String(preSymbolValue),
		type: 'select',
		updateValue: (value) => {
			preSymbolValue = value;
			updateSettings();
		},
		selectOptions: ['-', '#', '$'],
	});

	const postSymbolField: Field = $derived({
		label: 'Символ после значения',
		name: 'postsymbol',
		id: 'postsymbol',
		value: String(postSymbolValue),
		type: 'select',
		updateValue: (value) => {
			postSymbolValue = value;
			updateSettings();
		},
		selectOptions: [',', ';', '!', '?'],
	});

	const preComplexSymbolField: Field = $derived({
		label: 'Символ, открывающий блок ключа',
		name: 'preComplexSymbol',
		id: 'preComplexSymbol',
		value: String(preComplexSymbolValue),
		type: 'select',
		updateValue: (value) => {
			preComplexSymbolValue = value;
			updateSettings();
		},
		selectOptions: ['{', '[', '('],
	});

	const postComplexSymbolField: Field = $derived({
		label: 'Символ, закрывающий блок ключа',
		name: 'postComplexSymbol',
		id: 'postComplexSymbol',
		value: String(postComplexSymbolValue),
		type: 'select',
		updateValue: (value) => {
			postComplexSymbolValue = value;
			updateSettings();
		},
		selectOptions: ['}', ')', ']'],
	});

	const indentField: Field = $derived({
		label: 'Количество отступов',
		name: 'indent',
		id: 'indent',
		value: String(indentValue),
		type: 'select',
		updateValue: (value) => {
			indentValue = value;
			updateSettings();
		},
		selectOptions: ['Нет', '1', '2'],
	});

	const divisionSymbolField: Field = $derived({
		label: 'Символ разделения ключа и значения',
		name: 'divisionSymbol',
		id: 'divisionSymbol',
		value: String(divisionSymbolValue),
		type: 'select',
		updateValue: (value) => {
			divisionSymbolValue = value;
			updateSettings();
		},
		selectOptions: [':', '_', '&'],
	});

	const settingsFields: Field[] = $derived([
		preSymbolField,
		postSymbolField,
		preComplexSymbolField,
		postComplexSymbolField,
		indentField,
		divisionSymbolField,
	]);

	onMount(async () => {
		await getSettings();
	});
</script>

<div class="configuration-settings">
	<div class="configuration-settings_form">
		<Form fields={settingsFields} />
	</div>
	<ResultDisplay configValue={resultConfigMock} />
</div>

<style lang="scss" scoped>
	.configuration-settings {
		display: flex;
		flex-grow: 1;
		width: 100%;
		margin-top: 30px;
		gap: 20px;
	}

	.configuration-settings_form {
		display: flex;
		flex-direction: column;
		min-width: 225px;
		width: 100%;
		max-width: 800px;
		row-gap: 20px;
	}
</style>
