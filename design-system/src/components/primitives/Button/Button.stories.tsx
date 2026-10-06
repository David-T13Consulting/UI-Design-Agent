import type { Meta, StoryObj } from '@storybook/react';
import { Plus, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  args: {
    children: 'Button',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

/* ── Default ── */

export const Default: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'md',
    children: 'Button',
  },
};

/* ── Variant × Color Grid ── */

export const VariantColorGrid: Story = {
  name: 'Variants × Colors',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '1rem', alignItems: 'center', justifyItems: 'start' }}>
      <Button variant="filled" color="primary">Filled Primary</Button>
      <Button variant="filled" color="destructive">Filled Destructive</Button>
      <Button variant="filled" color="neutral">Filled Neutral</Button>

      <Button variant="outlined" color="primary">Outlined Primary</Button>
      <Button variant="outlined" color="destructive">Outlined Destructive</Button>
      <Button variant="outlined" color="neutral">Outlined Neutral</Button>

      <Button variant="text" color="primary">Text Primary</Button>
      <Button variant="text" color="destructive">Text Destructive</Button>
      <Button variant="text" color="neutral">Text Neutral</Button>
    </div>
  ),
};

/* ── All Sizes ── */

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/* ── States ── */

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button pressed>Pressed</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="outlined">Default</Button>
        <Button variant="outlined" disabled>Disabled</Button>
        <Button variant="outlined" loading>Loading</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="text">Default</Button>
        <Button variant="text" disabled>Disabled</Button>
        <Button variant="text" loading>Loading</Button>
      </div>
    </div>
  ),
};

/* ── Disabled ── */

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

/* ── Loading ── */

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

/* ── Icons ── */

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button iconLeft={Plus}>Add Item</Button>
      <Button iconRight={ArrowRight}>Continue</Button>
      <Button iconLeft={Plus} iconRight={ArrowRight}>Both Icons</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button iconLeft={Plus} aria-label="Add" />
      <Button variant="outlined" iconLeft={Plus} aria-label="Add" />
      <Button variant="text" iconLeft={Plus} aria-label="Add" />
      <Button variant="filled" color="destructive" iconLeft={Trash2} aria-label="Delete" />
    </div>
  ),
};

/* ── Destructive with Icon ── */

export const DestructiveActions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="filled" color="destructive" iconLeft={Trash2}>Delete</Button>
      <Button variant="outlined" color="destructive" iconLeft={Trash2}>Delete</Button>
      <Button variant="text" color="destructive" iconLeft={Trash2}>Delete</Button>
    </div>
  ),
};

/* ── Full Width ── */

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};
