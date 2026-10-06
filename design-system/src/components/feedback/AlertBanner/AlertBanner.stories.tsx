import type { Meta, StoryObj } from '@storybook/react';
import { AlertBanner } from './AlertBanner';

const meta: Meta<typeof AlertBanner> = {
  title: 'Feedback/AlertBanner',
  component: AlertBanner,
  args: {
    title: 'Alert title',
    message: 'This is an alert message with additional details.',
  },
};
export default meta;

type Story = StoryObj<typeof AlertBanner>;

/* ── Canonical variant names ── */

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'This is an informational alert for the user.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Your session is about to expire in 5 minutes.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
  },
};

/* ── Figma alias variant names ── */

export const Informative: Story = {
  args: {
    variant: 'informative',
    title: 'Informative (Figma alias)',
    message: 'This uses the "informative" variant name, mapped to "info".',
  },
};

export const Validation: Story = {
  args: {
    variant: 'validation',
    title: 'Validation (Figma alias)',
    message: 'This uses the "validation" variant name, mapped to "success".',
  },
};

export const Problem: Story = {
  args: {
    variant: 'problem',
    title: 'Problem (Figma alias)',
    message: 'This uses the "problem" variant name, mapped to "warning".',
  },
};

export const Negative: Story = {
  args: {
    variant: 'negative',
    title: 'Negative (Figma alias)',
    message: 'This uses the "negative" variant name, mapped to "error".',
  },
};

/* ── Interactive variants ── */

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    message: 'You can dismiss this alert by clicking the close button.',
    dismissible: true,
    onDismiss: () => {},
  },
};

export const WithAction: Story = {
  args: {
    variant: 'warning',
    title: 'Update Available',
    message: 'A new version is available. Please update to get the latest features.',
    action: {
      label: 'Update Now',
      onClick: () => {},
    },
  },
};
