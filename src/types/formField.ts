export type Props = {
    label: string;
    name: string;
    value: string;
    type: FormField;
    placeholder?: string;
    id: string;
    selectOptions?: string[];
    updateValue: (newValue: string) => void;
}

export type FormField = 'input' | 'select';