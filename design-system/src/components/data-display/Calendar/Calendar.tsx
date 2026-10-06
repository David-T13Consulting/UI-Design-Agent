import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Calendar.module.css';

type CalendarView = 'overview' | 'month' | 'year';

export interface CalendarProps {
  /** Currently selected date */
  value?: Date;
  /** Callback when a date is selected */
  onChange?: (date: Date) => void;
  /** Current view mode */
  view?: CalendarView;
  /** Callback when view changes */
  onViewChange?: (view: CalendarView) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Week starts on Monday (true) or Sunday (false) */
  mondayFirst?: boolean;
  /** Dates to highlight/mark */
  markedDates?: Date[];
  className?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const DAY_LABELS_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAY_LABELS_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate) {
    const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    if (date < min) return true;
  }
  if (maxDate) {
    const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    if (date > max) return true;
  }
  return false;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDayOfWeek(year: number, month: number, mondayFirst: boolean): number {
  const day = new Date(year, month, 1).getDay();
  if (mondayFirst) {
    return day === 0 ? 6 : day - 1;
  }
  return day;
}

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  view: controlledView,
  onViewChange,
  minDate,
  maxDate,
  mondayFirst = true,
  markedDates,
  className,
}) => {
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(
    value ? value.getMonth() : today.getMonth()
  );
  const [displayYear, setDisplayYear] = useState(
    value ? value.getFullYear() : today.getFullYear()
  );
  const [internalView, setInternalView] = useState<CalendarView>('overview');

  const currentView = controlledView ?? internalView;
  const setView = (v: CalendarView) => {
    if (onViewChange) {
      onViewChange(v);
    } else {
      setInternalView(v);
    }
  };

  const markedSet = useMemo(() => {
    if (!markedDates) return new Set<string>();
    return new Set(
      markedDates.map((d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)
    );
  }, [markedDates]);

  const isMarked = (date: Date) =>
    markedSet.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

  /* ── Navigation ── */

  const goToPrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const decadeStart = Math.floor(displayYear / 10) * 10;

  /* ── Day grid ── */

  const dayLabels = mondayFirst ? DAY_LABELS_MON : DAY_LABELS_SUN;

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(displayYear, displayMonth);
    const startDay = getStartDayOfWeek(displayYear, displayMonth, mondayFirst);
    const daysInPrevMonth = getDaysInMonth(
      displayMonth === 0 ? displayYear - 1 : displayYear,
      displayMonth === 0 ? 11 : displayMonth - 1
    );

    const cells: Array<{ date: Date; currentMonth: boolean }> = [];

    // Previous month fill
    for (let i = startDay - 1; i >= 0; i--) {
      const prevMonth = displayMonth === 0 ? 11 : displayMonth - 1;
      const prevYear = displayMonth === 0 ? displayYear - 1 : displayYear;
      cells.push({
        date: new Date(prevYear, prevMonth, daysInPrevMonth - i),
        currentMonth: false,
      });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        date: new Date(displayYear, displayMonth, i),
        currentMonth: true,
      });
    }

    // Next month fill
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const nextMonth = displayMonth === 11 ? 0 : displayMonth + 1;
      const nextYear = displayMonth === 11 ? displayYear + 1 : displayYear;
      cells.push({
        date: new Date(nextYear, nextMonth, i),
        currentMonth: false,
      });
    }

    return cells;
  }, [displayYear, displayMonth, mondayFirst]);

  /* ── Render overview (day grid) ── */

  const renderOverview = () => (
    <>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navButton}
          onClick={goToPrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <div className={styles.headerTitle}>
          <button
            type="button"
            className={styles.headerLabel}
            onClick={() => setView('month')}
          >
            {MONTH_NAMES[displayMonth]}
          </button>
          <button
            type="button"
            className={styles.headerLabel}
            onClick={() => setView('year')}
          >
            {displayYear}
          </button>
        </div>
        <button
          type="button"
          className={styles.navButton}
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className={styles.dayLabels}>
        {dayLabels.map((label) => (
          <span key={label} className={styles.dayLabel}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.dayGrid}>
        {calendarDays.map(({ date, currentMonth }, idx) => {
          const disabled =
            !currentMonth || isDateDisabled(date, minDate, maxDate);
          const selected = value ? isSameDay(date, value) : false;
          const isToday = isSameDay(date, today);
          const marked = isMarked(date);

          const cellClass = [
            styles.dayCell,
            !currentMonth ? styles.outsideMonth : '',
            disabled ? styles.disabled : '',
            selected ? styles.selected : '',
            isToday && !selected ? styles.today : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={idx}
              type="button"
              className={cellClass}
              disabled={disabled}
              onClick={() => {
                if (!disabled && onChange) {
                  onChange(date);
                }
              }}
              aria-label={date.toLocaleDateString()}
              aria-pressed={selected || undefined}
            >
              <span>{date.getDate()}</span>
              {marked && <span className={styles.marker} />}
            </button>
          );
        })}
      </div>
    </>
  );

  /* ── Render month selection ── */

  const renderMonthView = () => (
    <>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setDisplayYear(displayYear - 1)}
          aria-label="Previous year"
        >
          <ChevronLeft size={16} />
        </button>
        <div className={styles.headerTitle}>
          <button
            type="button"
            className={styles.headerLabel}
            onClick={() => setView('year')}
          >
            {displayYear}
          </button>
        </div>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setDisplayYear(displayYear + 1)}
          aria-label="Next year"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className={styles.monthGrid}>
        {MONTH_SHORT.map((name, idx) => {
          const selected =
            value &&
            value.getMonth() === idx &&
            value.getFullYear() === displayYear;

          return (
            <button
              key={name}
              type="button"
              className={`${styles.monthCell} ${selected ? styles.selected : ''}`}
              onClick={() => {
                setDisplayMonth(idx);
                setView('overview');
              }}
            >
              {name}
            </button>
          );
        })}
      </div>
    </>
  );

  /* ── Render year selection ── */

  const renderYearView = () => {
    const years: number[] = [];
    for (let y = decadeStart - 1; y <= decadeStart + 10; y++) {
      years.push(y);
    }

    return (
      <>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => setDisplayYear(displayYear - 10)}
            aria-label="Previous decade"
          >
            <ChevronLeft size={16} />
          </button>
          <div className={styles.headerTitle}>
            <span className={styles.headerLabelStatic}>
              {decadeStart} – {decadeStart + 9}
            </span>
          </div>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => setDisplayYear(displayYear + 10)}
            aria-label="Next decade"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className={styles.yearGrid}>
          {years.map((y) => {
            const selected = value && value.getFullYear() === y;
            const outside = y < decadeStart || y > decadeStart + 9;

            return (
              <button
                key={y}
                type="button"
                className={`${styles.yearCell} ${selected ? styles.selected : ''} ${outside ? styles.outsideMonth : ''}`}
                onClick={() => {
                  setDisplayYear(y);
                  setView('month');
                }}
              >
                {y}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  const rootClass = [styles.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={rootClass} role="group" aria-label="Calendar">
      {currentView === 'overview' && renderOverview()}
      {currentView === 'month' && renderMonthView()}
      {currentView === 'year' && renderYearView()}
    </div>
  );
};
