import { render, screen } from '@testing-library/react';
import FloorPlanManager from './FloorPlanManager';

test('renders learn react link', () => {
  render(<FloorPlanManager />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
