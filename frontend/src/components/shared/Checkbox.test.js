import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';

describe('Checkbox Component', () => {
  test('renderiza checkbox com label corretamente', () => {
    render(<Checkbox>Test Label</Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByLabelText('Test Label');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test('passa props corretamente para o input', () => {
    const mockOnChange = jest.fn();

    render(
      <Checkbox
        value="test-value"
        checked={true}
        onChange={mockOnChange}
        name="test-name"
      >
        Test Label
      </Checkbox>
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('value', 'test-value');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('name', 'test-name');
  });

  test('chama onChange quando clicado', () => {
    const mockOnChange = jest.fn();

    render(<Checkbox onChange={mockOnChange}>Clickable Label</Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('pode ser clicado através do label', () => {
    const mockOnChange = jest.fn();

    render(<Checkbox onChange={mockOnChange}>Clickable Label</Checkbox>);

    const label = screen.getByText('Clickable Label');
    fireEvent.click(label);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('renderiza com estado não marcado por padrão', () => {
    render(<Checkbox>Unchecked Label</Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('renderiza com estado marcado quando checked=true', () => {
    const mockOnChange = jest.fn();
    render(
      <Checkbox checked={true} onChange={mockOnChange}>
        Checked Label
      </Checkbox>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('pode ser desabilitado', () => {
    render(<Checkbox disabled>Disabled Label</Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  test('suporta diferentes tipos de children', () => {
    render(
      <Checkbox>
        <span>Complex Label</span>
        <strong>with formatting</strong>
      </Checkbox>
    );

    expect(screen.getByText('Complex Label')).toBeInTheDocument();
    expect(screen.getByText('with formatting')).toBeInTheDocument();
  });

  test('mantém acessibilidade com aria-labels', () => {
    render(<Checkbox aria-label="Custom aria label">Visible Label</Checkbox>);

    const checkbox = screen.getByLabelText('Custom aria label');
    expect(checkbox).toBeInTheDocument();
  });
});
