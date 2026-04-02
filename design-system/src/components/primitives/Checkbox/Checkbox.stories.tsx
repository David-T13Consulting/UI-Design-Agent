import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    error: 'You must accept the terms to continue',
  },
};
