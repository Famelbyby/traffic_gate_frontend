import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, beforeEach } from '@jest/globals';
import Button from '../../components/button/button.svelte';

jest.mock('~/helpers/theme.svelte', () => ({
	getTheme: jest.fn(),
}));

import { getTheme } from '~/helpers/theme.svelte';

describe('Button Component', () => {
	beforeEach(() => {
		(getTheme as jest.Mock).mockReturnValue('light');
	});

	it('вызывает onClick при клике', async () => {
		const onClick = jest.fn();
		render(Button, { text: 'Click', onClick });

		const button = screen.getByText('Click');
		await fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('не вызывает onClick, если кнопка disabled', async () => {
		const onClick = jest.fn();
		render(Button, { text: 'Disabled', onClick, disabled: true });

		const button = screen.getByText('Disabled');
		expect(button).toBeDisabled();
		await fireEvent.click(button);
		expect(onClick).not.toHaveBeenCalled();
	});

	it('применяет класс confirm', () => {
		render(Button, { text: 'Confirm', confirm: true });
		const button = screen.getByText('Confirm');
		expect(button).toHaveClass('base-button_confirm');
	});

	it('применяет класс cancel', () => {
		render(Button, { text: 'Cancel', cancel: true });
		const button = screen.getByText('Cancel');
		expect(button).toHaveClass('base-button_cancel');
	});

	it('применяет класс pink', () => {
		render(Button, { text: 'Pink', pink: true });
		const button = screen.getByText('Pink');
		expect(button).toHaveClass('base-button_pink');
		expect(button).not.toHaveClass('base-button_pink_dark');
	});
	it('применяет класс disabled', () => {
		render(Button, { text: 'Disabled', disabled: true });
		const button = screen.getByText('Disabled');
		expect(button).toHaveClass('base-button_disabled');
	});
});
