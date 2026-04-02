import { type LucideIcon } from 'lucide-react';
import { type ComponentProps } from 'react';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

interface IconProps extends Omit<ComponentProps<LucideIcon>, 'size'> {
  icon: LucideIcon;
  size?: IconSize;
  label?: string;
}

export function Icon({ icon: LucideIcon, size = 'md', label, ...props }: IconProps) {
  return (
    <LucideIcon
      size={SIZE_MAP[size]}
      aria-hidden={!label}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...props}
    />
  );
}
