import type { Meta, StoryObj } from '@storybook/react';
import { Search } from 'lucide-react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Primitives/TextInput',
  component: TextInput,
  args: {
    placeholder: 'Enter text...',
  },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address.',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    hint: 'Must be at least 8 characters.',
  },
};

export const WithPrefix: Story = {
  args: {
    placeholder: 'Search...',
    prefix: <span style={{ display: 'flex', alignItems: 'center' }}><Search size={16} /></span>,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};
