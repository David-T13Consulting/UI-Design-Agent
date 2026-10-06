import type { Meta, StoryObj } from '@storybook/react';
import { MessagePreview } from './MessagePreview';

const meta: Meta<typeof MessagePreview> = {
  title: 'Data Display/MessagePreview',
  component: MessagePreview,
};
export default meta;

type Story = StoryObj<typeof MessagePreview>;

/* ── Read Message ── */

export const ReadMessage: Story = {
  args: {
    sender: 'Dr. Sophie Martin',
    subject: 'Lab results review',
    preview:
      'Hi David, I have reviewed the latest lab results and everything looks within normal range. Let me know if you have questions.',
    timestamp: '10:30 AM',
  },
};

/* ── Unread Message ── */

export const UnreadMessage: Story = {
  args: {
    sender: 'Dr. Philippe Laurent',
    subject: 'Urgent: Patient follow-up needed',
    preview:
      'Please review the attached notes from yesterday\'s consultation. The patient requires a follow-up appointment this week.',
    timestamp: '9:15 AM',
    unread: true,
  },
};

/* ── Selected ── */

export const Selected: Story = {
  args: {
    sender: 'Marie Dupont',
    subject: 'Meeting rescheduled',
    preview: 'The team meeting has been moved to Thursday at 2 PM. Please update your calendars accordingly.',
    timestamp: 'Yesterday',
    selected: true,
  },
};

/* ── With Avatar ── */

export const WithAvatar: Story = {
  args: {
    sender: 'Jean-Pierre Blanc',
    subject: 'New protocol documentation',
    preview: 'Attached is the updated protocol for the new treatment plan. Please review before our next meeting.',
    timestamp: 'Mar 28',
    avatarSrc: 'https://i.pravatar.cc/40?u=jpblanc',
  },
};

/* ── With Initials ── */

export const WithInitials: Story = {
  args: {
    sender: 'Alice Bernard',
    subject: 'Quarterly report',
    preview: 'The quarterly report is ready for review. Key metrics are highlighted in section 3.',
    timestamp: 'Mar 25',
    avatarInitials: 'AB',
  },
};

/* ── With Tags ── */

export const WithTags: Story = {
  args: {
    sender: 'System Notification',
    subject: 'Prescription renewal reminder',
    preview: 'Patient Jean Duval has a prescription that expires in 7 days. Please review and renew if appropriate.',
    timestamp: '8:00 AM',
    unread: true,
    tags: [
      { label: 'Urgent', color: '#DC2626' },
      { label: 'Prescription' },
    ],
  },
};

/* ── In a List Context ── */

export const ListContext: Story = {
  name: 'In a List',
  render: () => (
    <div style={{ maxWidth: 480, border: '1px solid var(--color-border-default)', borderRadius: 8, overflow: 'hidden' }}>
      <MessagePreview
        sender="Dr. Sophie Martin"
        subject="Lab results review"
        preview="Hi David, I have reviewed the latest lab results and everything looks within normal range."
        timestamp="10:30 AM"
        unread
        onClick={() => {}}
      />
      <MessagePreview
        sender="Dr. Philippe Laurent"
        subject="Urgent: Patient follow-up"
        preview="Please review the attached notes from yesterday's consultation."
        timestamp="9:15 AM"
        unread
        selected
        tags={[{ label: 'Urgent', color: '#DC2626' }]}
        onClick={() => {}}
      />
      <MessagePreview
        sender="Marie Dupont"
        subject="Meeting rescheduled"
        preview="The team meeting has been moved to Thursday at 2 PM."
        timestamp="Yesterday"
        onClick={() => {}}
      />
      <MessagePreview
        sender="Jean-Pierre Blanc"
        subject="New protocol documentation"
        preview="Attached is the updated protocol for the new treatment plan."
        timestamp="Mar 28"
        avatarSrc="https://i.pravatar.cc/40?u=jpblanc"
        onClick={() => {}}
      />
      <MessagePreview
        sender="Alice Bernard"
        subject="Quarterly report"
        preview="The quarterly report is ready for review. Key metrics are highlighted."
        timestamp="Mar 25"
        onClick={() => {}}
      />
    </div>
  ),
};
