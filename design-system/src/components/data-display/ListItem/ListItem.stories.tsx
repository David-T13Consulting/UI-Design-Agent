import type { Meta, StoryObj } from '@storybook/react';
import { User, Star, ChevronRight, Mail, Bell } from 'lucide-react';
import { Icon } from '@/icons';
import { Badge } from '../../primitives/Badge';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Data Display/ListItem',
  component: ListItem,
};
export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    children: 'List item label',
    size: 'medium',
    type: 'primary',
  },
};

export const AllSizesAndTypes: Story = {
  name: 'All Sizes x Types',
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {(['primary', 'secondary'] as const).map((type) => (
        <div key={type} style={{ flex: 1 }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: 600, fontSize: 14, textTransform: 'capitalize' }}>{type}</p>
          {(['short', 'medium', 'large'] as const).map((size) => (
            <ListItem key={size} size={size} type={type} onClick={() => {}}>
              {size} — {type}
            </ListItem>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ListItem size="medium" description="Secondary line of text" onClick={() => {}}>
        Medium with description
      </ListItem>
      <ListItem size="large" description="A longer description line for the large variant" onClick={() => {}}>
        Large with description
      </ListItem>
    </div>
  ),
};

export const WithLeadingAndTrailing: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ListItem
        size="short"
        leading={<Icon icon={Mail} size="sm" />}
        trailing={<Icon icon={ChevronRight} size="sm" />}
        onClick={() => {}}
      >
        Inbox
      </ListItem>
      <ListItem
        size="medium"
        leading={<Icon icon={Bell} size="sm" />}
        trailing={<Badge label="3" />}
        description="You have 3 unread"
        onClick={() => {}}
      >
        Notifications
      </ListItem>
      <ListItem
        size="large"
        leading={<Icon icon={User} size="md" />}
        trailing={<Icon icon={ChevronRight} size="sm" />}
        description="View and edit your profile"
        onClick={() => {}}
      >
        Profile
      </ListItem>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ListItem size="medium" onClick={() => {}}>
        Default
      </ListItem>
      <ListItem size="medium" selected onClick={() => {}}>
        Selected
      </ListItem>
      <ListItem size="medium" disabled onClick={() => {}}>
        Disabled
      </ListItem>
      <ListItem size="medium" error onClick={() => {}}>
        Error
      </ListItem>
    </div>
  ),
};

export const VisualGrid: Story = {
  name: 'Size x Type x State Grid',
  render: () => {
    const sizes = ['short', 'medium', 'large'] as const;
    const types = ['primary', 'secondary'] as const;
    const states = [
      { label: 'Default', props: {} },
      { label: 'Selected', props: { selected: true } },
      { label: 'Disabled', props: { disabled: true } },
      { label: 'Error', props: { error: true } },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {states.map((state) => (
          <div key={state.label}>
            <p style={{ marginBottom: '0.5rem', fontWeight: 600, fontSize: 13 }}>{state.label}</p>
            {types.map((type) =>
              sizes.map((size) => (
                <ListItem
                  key={`${size}-${type}-${state.label}`}
                  size={size}
                  type={type}
                  leading={<Icon icon={Star} size="sm" />}
                  description={size !== 'short' ? `${type} ${size}` : undefined}
                  onClick={() => {}}
                  {...state.props}
                >
                  {size} {type}
                </ListItem>
              ))
            )}
          </div>
        ))}
      </div>
    );
  },
};
