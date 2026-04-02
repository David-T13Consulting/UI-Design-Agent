import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { fn } from '@storybook/test';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    onClose: fn(),
    duration: 60000,
  },
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'Your session will expire in 5 minutes.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Saved',
    message: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Storage is almost full. Please free up some space.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'Failed to upload file. Please try again.',
  },
};

export const WithAction: Story = {
  args: {
    variant: 'info',
    title: 'Update available',
    message: 'A new version is ready to install.',
    action: {
      label: 'Update now',
      onClick: fn(),
    },
  },
};
