import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  args: {
    size: 32,
    shape: 'circle',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/80?img=1',
    alt: 'User avatar',
  },
};

const SIZES = [16, 20, 24, 28, 32, 40, 52, 80] as const;
const SHAPES = ['circle', 'rounded', 'square'] as const;
const STATUSES = ['online', 'offline', 'busy', 'away'] as const;

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {SIZES.map((size) => (
        <Avatar
          key={size}
          src={`https://i.pravatar.cc/${size * 2}?img=3`}
          alt={`${size}px avatar`}
          size={size}
        />
      ))}
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {SHAPES.map((shape) => (
        <div
          key={shape}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontSize: 12, color: '#6b7280' }}>{shape}</span>
          <Avatar
            src="https://i.pravatar.cc/80?img=5"
            alt={`${shape} avatar`}
            size={52}
            shape={shape}
          />
        </div>
      ))}
    </div>
  ),
};

export const WithInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {SIZES.map((size) => (
        <Avatar key={size} initials="DD" size={size} alt="David Duchesne" />
      ))}
    </div>
  ),
};

export const IconFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {SIZES.map((size) => (
        <Avatar key={size} size={size} />
      ))}
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {STATUSES.map((status) => (
        <div key={status} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#6b7280', width: 50 }}>{status}</span>
          {SIZES.map((size) => (
            <Avatar
              key={size}
              src={`https://i.pravatar.cc/${size * 2}?img=8`}
              alt={`${status} user`}
              size={size}
              status={status}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const FallbackVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#6b7280' }}>Image</span>
        <Avatar src="https://i.pravatar.cc/80?img=12" alt="Photo" size={52} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#6b7280' }}>Initials</span>
        <Avatar initials="AB" alt="Alice Brown" size={52} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#6b7280' }}>Fallback icon</span>
        <Avatar size={52} />
      </div>
    </div>
  ),
};

export const RoundedWithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/80?img=15" size={40} shape="rounded" status="online" />
      <Avatar initials="JK" size={40} shape="rounded" status="busy" />
      <Avatar size={40} shape="rounded" status="away" />
    </div>
  ),
};
