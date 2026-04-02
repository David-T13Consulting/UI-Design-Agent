import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  args: {
    children: 'This is the card content.',
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a basic card with default settings.',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <h3 style={{ margin: 0 }}>Card Title</h3>,
    footer: <button type="button">Action</button>,
    children: 'This card has a header and footer section.',
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    onClick: () => {},
    children: 'Click this card to trigger an action.',
  },
};

export const AllShadows: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      <Card shadow="sm">
        <p style={{ margin: 0 }}>Shadow: sm</p>
      </Card>
      <Card shadow="md">
        <p style={{ margin: 0 }}>Shadow: md</p>
      </Card>
      <Card shadow="lg">
        <p style={{ margin: 0 }}>Shadow: lg</p>
      </Card>
    </div>
  ),
};
