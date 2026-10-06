import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  args: { options },
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const Selected: Story = {
  args: { value: 'b' },
};

export const Horizontal: Story = {
  args: { orientation: 'horizontal', value: 'a' },
};

export const Disabled: Story = {
  args: { value: 'a', disabled: true },
};

export const WithError: Story = {
  args: { error: 'Please select an option' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Default</p>
        <RadioGroup options={options} />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Selected</p>
        <RadioGroup options={options} value="b" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Disabled</p>
        <RadioGroup options={options} value="a" disabled />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Error</p>
        <RadioGroup options={options} error="Selection required" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Horizontal</p>
        <RadioGroup options={options} value="c" orientation="horizontal" />
      </div>
    </div>
  ),
};
