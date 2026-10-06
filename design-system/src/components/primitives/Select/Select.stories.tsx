import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Home, Settings, User, Mail, Bell } from 'lucide-react';
import { Select } from './Select';
import type { SelectOption } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3' },
      { value: 'opt4', label: 'Option 4' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

/* ── Basic ── */

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'opt2',
  },
};

export const WithHint: Story = {
  args: {
    hint: 'Select the option that best fits.',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'opt1',
  },
};

export const ErrorState: Story = {
  args: {
    error: 'This field is required.',
    value: '',
  },
};

/* ── Searchable ── */

const manyOptions: SelectOption[] = Array.from({ length: 20 }, (_, i) => ({
  value: `item-${i + 1}`,
  label: `Item ${i + 1}`,
}));

const SearchableTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <Select
      label="Searchable Select"
      placeholder="Search and select..."
      options={manyOptions}
      searchable
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Searchable: Story = {
  render: () => <SearchableTemplate />,
};

/* ── Checkbox Multi-Select ── */

const CheckboxTemplate = () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <Select
      label="Multi-select with Checkboxes"
      placeholder="Select items..."
      options={[
        { value: 'read', label: 'Read' },
        { value: 'write', label: 'Write' },
        { value: 'execute', label: 'Execute' },
        { value: 'admin', label: 'Admin' },
      ]}
      optionType="checkbox"
      multiple
      selectedValues={selected}
      onSelectedValuesChange={setSelected}
    />
  );
};

export const CheckboxMultiSelect: Story = {
  render: () => <CheckboxTemplate />,
};

/* ── Icon Options ── */

const IconTemplate = () => {
  const [value, setValue] = useState('');
  const iconOptions: SelectOption[] = [
    { value: 'home', label: 'Home', icon: Home },
    { value: 'settings', label: 'Settings', icon: Settings },
    { value: 'profile', label: 'Profile', icon: User },
    { value: 'messages', label: 'Messages', icon: Mail },
    { value: 'notifications', label: 'Notifications', icon: Bell },
  ];
  return (
    <Select
      label="Select with Icons"
      placeholder="Choose a section..."
      options={iconOptions}
      optionType="icon"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithIcons: Story = {
  render: () => <IconTemplate />,
};

/* ── Searchable + Checkbox ── */

const SearchableCheckboxTemplate = () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <Select
      label="Searchable Multi-Select"
      placeholder="Search and select..."
      options={manyOptions}
      searchable
      optionType="checkbox"
      multiple
      selectedValues={selected}
      onSelectedValuesChange={setSelected}
    />
  );
};

export const SearchableCheckboxMultiSelect: Story = {
  render: () => <SearchableCheckboxTemplate />,
};

/* ── Focused state (searchable, open by default for visual testing) ── */

export const SearchableDisabled: Story = {
  args: {
    label: 'Disabled Searchable',
    searchable: true,
    disabled: true,
    placeholder: 'Cannot interact',
  },
};

export const SearchableError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        label="Searchable with Error"
        placeholder="Select..."
        options={manyOptions}
        searchable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error="Please select at least one option."
      />
    );
  },
};
