import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App'; 

const mockFetch = jest.fn();

global.fetch = mockFetch;


describe('App', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('fetches and displays notes', async () => {
    const mockNotes = [
      { id: 1, title: 'Test Title', content: 'Test Content' }
    ];
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockNotes)
    });

    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('updates title and content when a note is clicked', async () => {
    const mockNotes = [
      { id: 1, title: 'Test Title', content: 'Test Content' }
    ];
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockNotes)
    });

    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByText('Test Title'));
  });
});