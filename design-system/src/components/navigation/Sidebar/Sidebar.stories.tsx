import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  Inbox,
  Calendar,
  Settings,
  Users,
  FileText,
  BarChart3,
  Bell,
  HelpCircle,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import type { SidebarItem } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <div style={{ height: 600, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

const basicItems: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

/* ── Large Mode ── */

export const LargeMode: Story = {
  args: {
    items: basicItems,
    activeId: 'home',
    mode: 'large',
  },
};

/* ── Short Mode ── */

export const ShortMode: Story = {
  args: {
    items: basicItems,
    activeId: 'inbox',
    mode: 'short',
  },
};

/* ── With Nested Items ── */

const nestedItems: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
    children: [
      { id: 'docs-recent', label: 'Recent' },
      { id: 'docs-shared', label: 'Shared with me' },
      { id: 'docs-archived', label: 'Archived' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    children: [
      { id: 'analytics-overview', label: 'Overview' },
      { id: 'analytics-reports', label: 'Reports' },
    ],
  },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const WithNestedItems: Story = {
  args: {
    items: nestedItems,
    activeId: 'home',
    mode: 'large',
  },
};

/* ── With Badges ── */

const badgeItems: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'inbox', label: 'Inbox', icon: Inbox, badge: 12 },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
  { id: 'users', label: 'Users', icon: Users, badge: '99+' },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const WithBadges: Story = {
  args: {
    items: badgeItems,
    activeId: 'inbox',
    mode: 'large',
  },
};

/* ── With Header and Footer ── */

export const WithHeaderFooter: Story = {
  args: {
    items: basicItems,
    activeId: 'home',
    mode: 'large',
    header: (
      <div style={{ fontWeight: 600, fontSize: 16 }}>My App</div>
    ),
    footer: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <HelpCircle size={16} />
        <span style={{ fontSize: 13 }}>Help & Support</span>
      </div>
    ),
  },
};

/* ── Collapsible ── */

export const Collapsible: Story = {
  args: {
    items: basicItems,
    activeId: 'home',
    collapsible: true,
  },
};
