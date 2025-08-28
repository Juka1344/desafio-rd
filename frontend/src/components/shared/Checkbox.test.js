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

  test('aplica classes CSS corretas', () => {
    render(<Checkbox>Test Label</Checkbox>);

    const label = screen.getByText('Test Label').closest('label');
    const checkbox = screen.getByRole('checkbox');
    const span = screen.getByText('Test Label');

    expect(label).toHaveClass(
      'flex',
      'items-center',
      'p-3',
      'rounded-lg',
      'border',
      'border-gray-200',
      'hover:border-blue-300',
      'hover:bg-blue-50',
      'transition-all',
      'duration-200',
      'cursor-pointer',
      'group'
    );

    expect(checkbox).toHaveClass(
      'w-5',
      'h-5',
      'text-blue-600',
      'bg-gray-100',
      'border-gray-300',
      'rounded',
      'focus:ring-blue-500',
      'focus:ring-2',
      'transition-all',
      'duration-200'
    );

    expect(span).toHaveClass(
      'ml-3',
      'text-gray-700',
      'group-hover:text-blue-700',
      'transition-colors',
      'duration-200',
      'select-none'
    );
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

  test('renderiza corretamente sem ref', () => {
    render(<Checkbox>No Ref Label</Checkbox>);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renderiza corretamente com strings vazias', () => {
    render(<Checkbox></Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('aplica estilos hover correctly através de CSS', () => {
    render(<Checkbox>Hover Test</Checkbox>);

    const label = screen.getByText('Hover Test').closest('label');

    expect(label).toHaveClass('hover:border-blue-300', 'hover:bg-blue-50');

    const span = screen.getByText('Hover Test');
    expect(span).toHaveClass('group-hover:text-blue-700');
  });
});
