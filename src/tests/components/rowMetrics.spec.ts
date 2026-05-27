// rowMetrics.test.ts
import { render, screen, waitFor, fireEvent } from '@testing-library/svelte';
import {
	describe,
	it,
	expect,
	beforeEach,
	jest,
	afterEach,
} from '@jest/globals';
import RowMetrics from '../../components/rowMetrics/rowMetrics.svelte';

// Мокаем API
jest.mock('~/api/metricsPage/metrics', () => ({
	getMetrics: jest.fn(),
	createMetric: jest.fn(),
	removeMetric: jest.fn(),
}));

import {
	getMetrics,
	createMetric,
	removeMetric,
} from '~/api/metricsPage/metrics';

// Мокаем дочерние компоненты
jest.mock('../metricCard/metricCard.svelte', () => ({
	default: jest.fn().mockImplementation((options) => {
		// Отрисовываем заглушку с текстом метрики
		const div = document.createElement('div');
		div.textContent = `MetricCard: ${options.title || ''}`;
		div.setAttribute('data-testid', 'metric-card');
		if (options.removeMetric) {
			(div as any).removeMetricHandler = options.removeMetric;
		}
		return div;
	}),
}));

jest.mock('../metricCard/addMetricCard.svelte', () => ({
	default: jest.fn().mockImplementation((options) => {
		const div = document.createElement('div');
		div.textContent = 'AddMetricCard';
		div.setAttribute('data-testid', 'add-metric-card');
		if (options.addMetric) {
			(div as any).addMetricHandler = options.addMetric;
		}
		return div;
	}),
}));

jest.mock('svelte-portal', () => ({
	default: jest.fn().mockImplementation((options) => {
		return options.children;
	}),
}));

jest.mock('../modal/modal.svelte', () => ({
	default: jest.fn().mockImplementation((options) => {
		const div = document.createElement('div');
		div.setAttribute('data-testid', 'modal');

		if (options.content) {
			const contentNode = options.content();
			if (contentNode) div.appendChild(contentNode);
		}

		if (options.footerButtons) {
			const footerNode = options.footerButtons();
			if (footerNode) div.appendChild(footerNode);
		}

		if (options.closeModal) {
			(div as any).closeModalHandler = options.closeModal;
		}
		return div;
	}),
}));

describe('RowMetrics интеграционные тесты', () => {
	const mockMetrics = [
		{ id: '1', title: 'Metric 1', value: 10 },
		{ id: '2', title: 'Metric 2', value: 20 },
	];

	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
		(getMetrics as jest.Mock).mockResolvedValue(mockMetrics);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('загружает и отображает метрики при монтировании', async () => {
		render(RowMetrics, { updateInterval: 5000 });

		await waitFor(() => {
			expect(getMetrics).toHaveBeenCalledTimes(1);
		});

		const cards = await screen.findAllByTestId('metric-card');
		expect(cards).toHaveLength(2);
		expect(cards[0]).toHaveTextContent('Metric 1');
		expect(cards[1]).toHaveTextContent('Metric 2');

		expect(screen.getByTestId('add-metric-card')).toBeInTheDocument();
	});

	it('показывает AddMetricCard в состоянии pending, пока данные не загружены', () => {
		(getMetrics as jest.Mock).mockImplementation(
			() => new Promise(() => {}),
		);
		render(RowMetrics, { updateInterval: 5000 });

		const addCard = screen.getByTestId('add-metric-card');
		expect(addCard).toBeInTheDocument();
	});

	it('обновляет метрики по интервалу', async () => {
		render(RowMetrics, { updateInterval: 1000 });

		await waitFor(() => expect(getMetrics).toHaveBeenCalledTimes(1));

		const newMetrics = [{ id: '3', title: 'Metric 3', value: 30 }];
		(getMetrics as jest.Mock).mockResolvedValue(newMetrics);

		jest.advanceTimersByTime(1000);
		await waitFor(() => expect(getMetrics).toHaveBeenCalledTimes(2));

		const cards = await screen.findAllByTestId('metric-card');
		expect(cards).toHaveLength(1);
		expect(cards[0]).toHaveTextContent('Metric 3');
	});

	it('добавляет новую метрику через AddMetricCard', async () => {
		const newMetricData = { title: 'New Metric', description: 'desc' };
		const createdMetric = { id: '3', title: 'New Metric', value: 0 };
		(createMetric as jest.Mock).mockResolvedValue([
			...mockMetrics,
			createdMetric,
		]);

		render(RowMetrics, { updateInterval: 5000 });
		await waitFor(() => expect(getMetrics).toHaveBeenCalled());

		const addCard = screen.getByTestId('add-metric-card');
		const addMetricFn = (addCard as any).addMetricHandler;
		expect(addMetricFn).toBeDefined();

		await addMetricFn(newMetricData);

		expect(createMetric).toHaveBeenCalledWith(newMetricData);
		await waitFor(() => {
			const cards = screen.getAllByTestId('metric-card');
			expect(cards).toHaveLength(3);
			expect(cards[2]).toHaveTextContent('New Metric');
		});
	});

	it('открывает модальное окно при вызове removeMetric из MetricCard и удаляет метрику', async () => {
		const updatedMetrics = [mockMetrics[1]];
		(removeMetric as jest.Mock).mockResolvedValue(updatedMetrics);

		render(RowMetrics, { updateInterval: 5000 });
		await waitFor(() => expect(getMetrics).toHaveBeenCalled());

		const cards = screen.getAllByTestId('metric-card');
		const removeMetricHandler = (cards[0] as any).removeMetricHandler;
		expect(removeMetricHandler).toBeDefined();

		removeMetricHandler(mockMetrics[0]);

		const modal = await screen.findByTestId('modal');
		expect(modal).toBeInTheDocument();
		expect(modal).toHaveTextContent(
			'Вы уверены, что хотите удалить метрику Metric 1?',
		);

		const deleteButton = screen.getByText('Удалить');
		expect(deleteButton).toBeInTheDocument();

		await fireEvent.click(deleteButton);

		expect(removeMetric).toHaveBeenCalledWith('1');

		await waitFor(() => {
			expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
		});

		const remainingCards = screen.getAllByTestId('metric-card');
		expect(remainingCards).toHaveLength(1);
		expect(remainingCards[0]).toHaveTextContent('Metric 2');
	});

	it('не вызывает удаление, если модалка открыта, но удаление отменено (закрытие без удаления)', async () => {
		render(RowMetrics, { updateInterval: 5000 });
		await waitFor(() => expect(getMetrics).toHaveBeenCalled());

		const cards = screen.getAllByTestId('metric-card');
		const removeMetricHandler = (cards[0] as any).removeMetricHandler;
		removeMetricHandler(mockMetrics[0]);

		const modal = await screen.findByTestId('modal');
		expect(modal).toBeInTheDocument();

		const closeModalFn = (modal as any).closeModalHandler;
		expect(closeModalFn).toBeDefined();
		closeModalFn();

		await waitFor(() => {
			expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
		});
		expect(removeMetric).not.toHaveBeenCalled();

		expect(screen.getAllByTestId('metric-card')).toHaveLength(2);
	});

	it('очищает интервал при размонтировании', () => {
		const { unmount } = render(RowMetrics, { updateInterval: 1000 });
		const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
		unmount();
		expect(clearIntervalSpy).toHaveBeenCalled();
		clearIntervalSpy.mockRestore();
	});
});
