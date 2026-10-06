import type { Meta, StoryObj } from '@storybook/react';
import { Mail } from 'lucide-react';
import { Icon } from '@/icons';
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
    label: 'Full name',
    placeholder: 'Enter your name...',
  },
};

export const Optional: Story = {
  args: {
    label: 'Nickname',
    variant: 'optional',
    placeholder: 'Enter a nickname...',
    hint: 'This field is optional.',
  },
};

export const Mandatory: Story = {
  args: {
    label: 'Email address',
    variant: 'mandatory',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const SearchVariant: Story = {
  args: {
    label: 'Search',
    variant: 'search',
    placeholder: 'Search patients...',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Email',
    variant: 'withIcon',
    prefix: <Icon icon={Mail} size="sm" />,
    placeholder: 'you@example.com',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    variant: 'mandatory',
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

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
      <TextInput label="Standard" variant="standard" placeholder="Standard input..." />
      <TextInput label="Optional field" variant="optional" placeholder="Optional..." />
      <TextInput label="Required field" variant="mandatory" placeholder="Mandatory..." />
      <TextInput label="Search" variant="search" placeholder="Search..." />
      <TextInput label="With Icon" variant="withIcon" prefix={<Icon icon={Mail} size="sm" />} placeholder="Icon prefix..." />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
      <TextInput label="Default" placeholder="Default state" />
      <TextInput label="With hint" placeholder="Has hint" hint="Helpful hint text" />
      <TextInput label="Error" placeholder="Error state" error="Something went wrong" />
      <TextInput label="Disabled" placeholder="Disabled" disabled />
      <TextInput label="With value" placeholder="..." defaultValue="Pre-filled value" />
    </div>
  ),
};
