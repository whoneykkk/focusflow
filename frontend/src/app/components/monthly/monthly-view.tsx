import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from 'date-fns';
import { calendarEvents, getEventsForWeek, schedules } from '../calendar-data';
import { CalendarDayHeader } from '../shared/calendar-day-header';
import { VerticalGridLines } from '../shared/vertical-grid-lines';
import { DayNumber } from '../shared/day-number';
import { MonthlyEventBar } from './monthly-event-bar';
import { ScheduleCard } from './monthly-schedule-card';

interface MonthlyViewProps {
  currentDate: Date;
}

export function MonthlyView({ currentDate }: MonthlyViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const allDays = eachDayOfInterval({ start: calStart, end: calEnd });

  const weeks: Date[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  const today = new Date();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <CalendarDayHeader viewType="monthly" />

      {/* Calendar Grid */}
      <div className="flex-1 flex flex-col">
        {weeks.map((week, weekIdx) => {
          const eventRows = getEventsForWeek(week, calendarEvents);
          const maxEventRow = eventRows.reduce((max, { row }) => Math.max(max, row), -1);
          const scheduleAnchorTop = maxEventRow >= 0 ? 36 + maxEventRow * 20 : 26;
          const scheduleTop = `calc(${scheduleAnchorTop}px + 0.5em)`;

          return (
            <div
              key={weekIdx}
              className="flex-1 grid grid-cols-7 relative"
              style={{ minHeight: '10em', borderBottom: weekIdx < weeks.length - 1 ? '1px dashed rgba(0,0,0,0.3)' : 'none' }}
            >
              <VerticalGridLines />

              {/* Date numbers */}
              {week.map((day, dayIdx) => (
                <div key={dayIdx} className="relative px-1 pt-1 z-0">
                  <DayNumber day={day} currentDate={currentDate} today={today} />
                </div>
              ))}

              {/* Event bars */}
              {eventRows.map(({ event, row }) => (
                <MonthlyEventBar key={event.id} event={event} row={row} weekDays={week} />
              ))}

              {/* Schedules (same layer as event bars, below with margin) */}
              {week.map((day, dayIdx) => {
                const daySchedules = schedules.filter((schedule) => isSameDay(schedule.date, day));
                if (daySchedules.length === 0) return null;

                const leftPct = (dayIdx / 7) * 100;

                return (
                  <div
                    key={`day-schedules-${weekIdx}-${dayIdx}`}
                    className="absolute z-20"
                    style={{
                      left: `calc(${leftPct}% + 0.35em)`,
                      width: `calc(${(1 / 7) * 100}% - 0.7em)`,
                      top: scheduleTop,
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      {daySchedules.map((schedule) => (
                        <ScheduleCard key={schedule.id} schedule={schedule} />
                      ))}
                    </div>
                  </div>
                );
              })}


            </div>
          );
        })}
      </div>
    </div>
  );
}
