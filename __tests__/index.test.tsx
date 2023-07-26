import { render, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

describe('Home', () => {
  window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));

  it('input invalid triangle text', async () => {
    const { container } = render(<Home />);

    const file = new File(['0 5\n9 6\n4 6 8\n0 7 1 5\n8 3 1 1 2'], 'triangle.txt', { type: 'text/plain' });
    const input = container.querySelector('input[type="file"]');

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    if (input) {
      fireEvent.change(input);
    }

    await waitFor(() => {
      expect(container).toHaveTextContent('Invalid File');
    });
  });

  it('get correct max total', async () => {
    const { container } = render(<Home />);

    const file = new File(['5\n9 6\n4 6 8\n0 7 1 5\n8 3 1 1 2'], 'triangle.txt', { type: 'text/plain' });
    const input = container.querySelector('input[type="file"]');
    const maxTotal = container.querySelector('#max-total');

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    if (input) {
      fireEvent.change(input);
    }

    await waitFor(() => {
      expect(maxTotal).toHaveTextContent('30');
    });
  });
});
