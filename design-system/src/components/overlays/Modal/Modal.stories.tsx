import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  args: {
    open: true,
    title: 'Modal Title',
    description: 'This is a description of the modal.',
    children: 'Modal body content goes here.',
    onClose: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Default Modal',
    description: 'This is a standard modal dialog.',
    children: 'Here is some content inside the modal.',
    footer: <button type="button">Confirm</button>,
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div>
      <Modal
        open={true}
        title="Large Modal"
        description="This modal uses the lg size."
        size="lg"
        onClose={args.onClose}
      >
        <p>This is the large size modal. Use the Storybook controls to close and reopen.</p>
      </Modal>
    </div>
  ),
  args: {
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Since modals render in a portal, only one can be displayed at a time. Toggle between sizes using the controls. Available sizes: sm, md, lg.',
      },
    },
  },
};
