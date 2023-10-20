import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders main page content', () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const mainPageContent = getByText(/Main Page Content/i);
  expect(mainPageContent).toBeInTheDocument();
});

test('renders drag and drop demo', () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const dragDropDemo = getByText(/Drag and Drop Demo/i);
  expect(dragDropDemo).toBeInTheDocument();
});
