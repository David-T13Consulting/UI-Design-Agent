import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Data Display/Calendar',
  component: Calendar,
};
export default meta;

type Story = StoryObj<typeof Calendar>;

/* ── Default ── */

export const Default: Story = {
  args: {},
};

/* ── With Selected Date ── */

export const WithSelectedDate: Story = {
  render: () => {
    const Wrapper = () => {
      const [date, setDate] = useState(new Date(2026, 3, 15));
      return <Calendar value={date} onChange={setDate} />;
    };
    return <Wrapper />;
  },
};

/* ── With Marked Dates ── */

export const WithMarkedDates: Story = {
  args: {
    value: new Date(2026, 3, 10),
    markedDates: [
      new Date(2026, 3, 5),
      new Date(2026, 3, 12),
      new Date(2026, 3, 18),
      new Date(2026, 3, 25),
    ],
  },
};

/* ── Month View ── */

export const MonthView: Story = {
  args: {
    view: 'month',
    value: new Date(2026, 3, 15),
  },
};

/* ── Year View ── */

export const YearView: Story = {
  args: {
    view: 'year',
    value: new Date(2026, 3, 15),
  },
};

/* ── With Min/Max Constraints ── */

export const WithMinMaxConstraints: Story = {
  args: {
    value: new Date(2026, 3, 15),
    minDate: new Date(2026, 3, 5),
    maxDate: new Date(2026, 3, 25),
  },
};

/* ── Monday First ── */

export const MondayFirst: Story = {
  args: {
    mondayFirst: true,
    value: new Date(2026, 3, 15),
  },
};

/* ── Sunday First ── */

export const SundayFirst: Story = {
  args: {
    mondayFirst: false,
    value: new Date(2026, 3, 15),
  },
};
