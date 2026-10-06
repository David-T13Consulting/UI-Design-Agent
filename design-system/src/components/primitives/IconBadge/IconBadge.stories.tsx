import type { Meta, StoryObj } from '@storybook/react';
import { Heart, Star, AlertTriangle, CheckCircle, Info, Settings } from 'lucide-react';
import { IconBadge } from './IconBadge';

const meta: Meta<typeof IconBadge> = {
  title: 'Primitives/IconBadge',
  component: IconBadge,
  args: {
    icon: Heart,
    variant: 'filled',
    shape: 'circle',
    size: 'sm',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof IconBadge>;

export const Default: Story = {};

const COLORS = ['primary', 'success', 'warning', 'danger', 'info', 'neutral'] as const;
const VARIANTS = ['filled', 'outline'] as const;
const SHAPES = ['circle', 'square', 'normal'] as const;
const SIZES = ['sm', 'lg'] as const;

export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SIZES.map((size) => (
        <div key={size}>
          <h3 style={{ marginBottom: 8 }}>Size: {size}</h3>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ marginBottom: 16 }}>
              <h4 style={{ marginBottom: 8 }}>Variant: {variant}</h4>
              <div style={{ display: 'flex', gap: 12 }}>
                {SHAPES.map((shape) => (
                  <div
                    key={shape}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 12, color: '#6b7280' }}>{shape}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {COLORS.map((color) => (
                        <IconBadge
                          key={color}
                          icon={Heart}
                          variant={variant}
                          shape={shape}
                          size={size}
                          color={color}
                          label={`${variant} ${shape} ${size} ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const FilledCircle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {COLORS.map((color) => (
        <IconBadge key={color} icon={Star} variant="filled" shape="circle" size="lg" color={color} />
      ))}
    </div>
  ),
};

export const OutlineSquare: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {COLORS.map((color) => (
        <IconBadge
          key={color}
          icon={Settings}
          variant="outline"
          shape="square"
          size="lg"
          color={color}
        />
      ))}
    </div>
  ),
};

export const NormalIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconBadge icon={CheckCircle} shape="normal" color="success" size="sm" />
      <IconBadge icon={AlertTriangle} shape="normal" color="warning" size="sm" />
      <IconBadge icon={Info} shape="normal" color="info" size="lg" />
    </div>
  ),
};
