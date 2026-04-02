import type { Meta, StoryObj } from '@storybook/react';
import { Inbox } from 'lucide-react';
import { fn } from '@storybook/test';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: Inbox,
    title: 'No messages',
    description: 'Your inbox is empty. New messages will appear here.',
  },
};

export const WithAction: Story = {
  args: {
    icon: Inbox,
    title: 'No messages',
    description: 'Your inbox is empty. New messages will appear here.',
    action: {
      label: 'Compose message',
      onClick: fn(),
    },
  },
};
