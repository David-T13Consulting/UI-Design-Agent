import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge label="Neutral" variant="neutral" />
      <Badge label="Info" variant="info" />
      <Badge label="Success" variant="success" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Danger" variant="danger" />
    </div>
  ),
};

export const WithDot: Story = {
  args: {
    label: 'Active',
    variant: 'success',
    dot: true,
  },
};

export const Dismissible: Story = {
  args: {
    label: 'Removable',
    variant: 'info',
    dismissible: true,
  },
};
