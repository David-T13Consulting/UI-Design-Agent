import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Copy, Trash2, Edit3, Share2, Download, Settings, Bell, Moon } from 'lucide-react';
import { Button } from '../../primitives/Button';
import { Dropdown, type DropdownOption } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Overlays/Dropdown',
  component: Dropdown,
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Simple: Story = {
  args: {
    trigger: <Button variant="outlined">Open menu</Button>,
    options: [
      { id: 'edit', label: 'Edit' },
      { id: 'duplicate', label: 'Duplicate' },
      { id: 'archive', label: 'Archive' },
      { id: 'div1', label: '', type: 'divider' },
      { id: 'delete', label: 'Delete' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    trigger: <Button variant="outlined">Actions</Button>,
    options: [
      { id: 'edit', label: 'Edit', type: 'icon', icon: Edit3 },
      { id: 'copy', label: 'Copy', type: 'icon', icon: Copy },
      { id: 'share', label: 'Share', type: 'icon', icon: Share2 },
      { id: 'download', label: 'Download', type: 'icon', icon: Download },
      { id: 'div1', label: '', type: 'divider' },
      { id: 'delete', label: 'Delete', type: 'icon', icon: Trash2 },
    ],
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [options, setOptions] = useState<DropdownOption[]>([
      { id: 'email', label: 'Email notifications', type: 'checkbox', checked: true },
      { id: 'sms', label: 'SMS notifications', type: 'checkbox', checked: false },
      { id: 'push', label: 'Push notifications', type: 'checkbox', checked: true },
      { id: 'marketing', label: 'Marketing emails', type: 'checkbox', checked: false },
    ]);

    return (
      <Dropdown
        trigger={<Button variant="outlined">Notification preferences</Button>}
        options={options}
        onToggle={(id, checked) => {
          setOptions((prev) =>
            prev.map((opt) => (opt.id === id ? { ...opt, checked } : opt))
          );
        }}
      />
    );
  },
};

export const WithToggles: Story = {
  render: () => {
    const [options, setOptions] = useState<DropdownOption[]>([
      { id: 'darkMode', label: 'Dark mode', type: 'toggle', checked: false, icon: Moon },
      { id: 'notifications', label: 'Notifications', type: 'toggle', checked: true, icon: Bell },
      { id: 'autoSave', label: 'Auto-save', type: 'toggle', checked: true, icon: Settings },
    ]);

    return (
      <Dropdown
        trigger={<Button variant="outlined">Settings</Button>}
        options={options}
        onToggle={(id, checked) => {
          setOptions((prev) =>
            prev.map((opt) => (opt.id === id ? { ...opt, checked } : opt))
          );
        }}
      />
    );
  },
};

export const Searchable: Story = {
  args: {
    trigger: <Button variant="outlined">Select country</Button>,
    searchable: true,
    options: [
      { id: 'be', label: 'Belgium' },
      { id: 'fr', label: 'France' },
      { id: 'de', label: 'Germany' },
      { id: 'it', label: 'Italy' },
      { id: 'lu', label: 'Luxembourg' },
      { id: 'nl', label: 'Netherlands' },
      { id: 'es', label: 'Spain' },
      { id: 'ch', label: 'Switzerland' },
      { id: 'gb', label: 'United Kingdom' },
      { id: 'us', label: 'United States' },
    ],
  },
};

export const MixedOptionTypes: Story = {
  render: () => {
    const [options, setOptions] = useState<DropdownOption[]>([
      { id: 'edit', label: 'Edit', type: 'icon', icon: Edit3, shortcut: 'Cmd+E' },
      { id: 'copy', label: 'Copy', type: 'icon', icon: Copy, shortcut: 'Cmd+C' },
      { id: 'share', label: 'Share', type: 'icon', icon: Share2, description: 'Share with team' },
      { id: 'div1', label: '', type: 'divider' },
      { id: 'notifications', label: 'Notifications', type: 'toggle', checked: true },
      { id: 'autoSave', label: 'Auto-save', type: 'checkbox', checked: false },
      { id: 'div2', label: '', type: 'divider' },
      { id: 'delete', label: 'Delete', type: 'icon', icon: Trash2, shortcut: 'Del' },
      { id: 'disabled', label: 'Archived action', disabled: true },
    ]);

    return (
      <Dropdown
        trigger={<Button variant="outlined">Mixed menu</Button>}
        options={options}
        onSelect={(id) => console.log('Selected:', id)}
        onToggle={(id, checked) => {
          setOptions((prev) =>
            prev.map((opt) => (opt.id === id ? { ...opt, checked } : opt))
          );
        }}
      />
    );
  },
};

export const WithShortcutsAndDescriptions: Story = {
  args: {
    trigger: <Button variant="outlined">File</Button>,
    width: 260,
    options: [
      { id: 'new', label: 'New file', shortcut: 'Cmd+N', description: 'Create a blank file' },
      { id: 'open', label: 'Open...', shortcut: 'Cmd+O' },
      { id: 'save', label: 'Save', shortcut: 'Cmd+S' },
      { id: 'saveAs', label: 'Save as...', shortcut: 'Shift+Cmd+S' },
      { id: 'div1', label: '', type: 'divider' },
      { id: 'export', label: 'Export', shortcut: 'Cmd+E', description: 'Export to PDF or CSV' },
      { id: 'print', label: 'Print', shortcut: 'Cmd+P', disabled: true },
    ],
  },
};
