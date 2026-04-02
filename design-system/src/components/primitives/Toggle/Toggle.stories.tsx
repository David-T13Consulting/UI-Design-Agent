import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

export const On: Story = {
  args: {
    label: 'Enable notifications',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
    disabled: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Compact toggle',
    checked: true,
    size: 'sm',
  },
};
