import type { Meta, StoryObj } from '@storybook/react';
import { DollarSign } from 'lucide-react';
import { StatBlock } from './StatBlock';

const meta: Meta<typeof StatBlock> = {
  title: 'Data Display/StatBlock',
  component: StatBlock,
};
export default meta;

type Story = StoryObj<typeof StatBlock>;

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$48,200',
    icon: DollarSign,
  },
};

export const PositiveDelta: Story = {
  args: {
    label: 'Total Revenue',
    value: '$48,200',
    icon: DollarSign,
    delta: {
      value: 12.5,
      direction: 'up',
    },
  },
};

export const NegativeDelta: Story = {
  args: {
    label: 'Churn Rate',
    value: '3.2%',
    delta: {
      value: 0.8,
      direction: 'down',
    },
  },
};

export const Loading: Story = {
  args: {
    label: 'Total Revenue',
    value: '',
    loading: true,
  },
};
