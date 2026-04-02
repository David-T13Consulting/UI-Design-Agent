import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    lines: 3,
  },
};

export const Heading: Story = {
  args: {
    variant: 'heading',
    width: '60%',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 48,
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
  },
};
