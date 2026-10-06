import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Data Display/DataTable',
  component: DataTable,
};
export default meta;

type Story = StoryObj<typeof DataTable>;

/* -- Basic text table -- */

export const Default: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
    rows: [
      { name: 'Alice Martin', email: 'alice@example.com', role: 'Admin' },
      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
      { name: 'Clara Lee', email: 'clara@example.com', role: 'Viewer' },
    ],
  },
};

/* -- Striped rows -- */

export const Striped: Story = {
  args: {
    striped: true,
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
    rows: [
      { name: 'Alice Martin', email: 'alice@example.com', role: 'Admin' },
      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
      { name: 'Clara Lee', email: 'clara@example.com', role: 'Viewer' },
      { name: 'Daniel Kim', email: 'daniel@example.com', role: 'Admin' },
      { name: 'Eva Torres', email: 'eva@example.com', role: 'Viewer' },
    ],
  },
};

/* -- Avatar cells -- */

export const AvatarCells: Story = {
  args: {
    columns: [
      { key: 'avatar', label: '', cellType: 'avatar' as const },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
    ],
    rows: [
      { avatar: 'AM', name: 'Alice Martin', email: 'alice@example.com' },
      { avatar: 'BJ', name: 'Bob Johnson', email: 'bob@example.com' },
      { avatar: 'CL', name: 'Clara Lee', email: 'clara@example.com' },
    ],
  },
};

/* -- Tag cells -- */

export const TagCells: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status', cellType: 'tag' as const },
      { key: 'role', label: 'Role', cellType: 'tag' as const },
    ],
    rows: [
      { name: 'Alice Martin', status: 'Active', role: 'Admin' },
      { name: 'Bob Johnson', status: 'Pending', role: 'Editor' },
      { name: 'Clara Lee', status: 'Inactive', role: 'Viewer' },
    ],
  },
};

/* -- Rating cells -- */

export const RatingCells: Story = {
  args: {
    columns: [
      { key: 'product', label: 'Product' },
      { key: 'rating', label: 'Rating', cellType: 'rating' as const },
      { key: 'reviews', label: 'Reviews' },
    ],
    rows: [
      { product: 'Widget A', rating: 5, reviews: '128 reviews' },
      { product: 'Widget B', rating: 3, reviews: '56 reviews' },
      { product: 'Widget C', rating: 4, reviews: '312 reviews' },
      { product: 'Widget D', rating: 1, reviews: '7 reviews' },
    ],
  },
};

/* -- CTA cells -- */

export const CtaCells: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Document' },
      { key: 'size', label: 'Size' },
      { key: 'action', label: '', cellType: 'cta' as const },
    ],
    rows: [
      { name: 'Report Q1.pdf', size: '2.4 MB', action: 'Download' },
      { name: 'Invoice #1234', size: '540 KB', action: 'Download' },
      { name: 'Contract.docx', size: '1.1 MB', action: 'Download' },
    ],
    onCtaClick: (rowIndex: number, columnKey: string) => {
      console.log(`CTA clicked: row ${rowIndex}, column ${columnKey}`);
    },
  },
};

/* -- Blank cells -- */

export const BlankCells: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'spacer', label: '', cellType: 'blank' as const },
      { key: 'email', label: 'Email' },
    ],
    rows: [
      { name: 'Alice Martin', spacer: '', email: 'alice@example.com' },
      { name: 'Bob Johnson', spacer: '', email: 'bob@example.com' },
    ],
  },
};

/* -- Mixed cell types -- */

export const MixedCellTypes: Story = {
  args: {
    striped: true,
    columns: [
      { key: 'avatar', label: '', cellType: 'avatar' as const },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'status', label: 'Status', cellType: 'tag' as const },
      { key: 'rating', label: 'Rating', cellType: 'rating' as const },
      { key: 'action', label: '', cellType: 'cta' as const },
    ],
    rows: [
      { avatar: 'AM', name: 'Alice Martin', status: 'Active', rating: 5, action: 'View' },
      { avatar: 'BJ', name: 'Bob Johnson', status: 'Pending', rating: 3, action: 'View' },
      { avatar: 'CL', name: 'Clara Lee', status: 'Inactive', rating: 4, action: 'View' },
      { avatar: 'DK', name: 'Daniel Kim', status: 'Active', rating: 2, action: 'View' },
    ],
    onCtaClick: (rowIndex: number) => {
      console.log(`View clicked for row ${rowIndex}`);
    },
  },
};

/* -- Loading state -- */

export const Loading: Story = {
  args: {
    loading: true,
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
    rows: [],
  },
};

/* -- Empty state -- */

export const Empty: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
    ],
    rows: [],
    emptyState: 'No data available.',
  },
};
