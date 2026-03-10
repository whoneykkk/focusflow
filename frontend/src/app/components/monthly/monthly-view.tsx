import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import { calendarEvents, getEventsForWeek } from '../calendar-data';
import { CalendarDayHeader } from '../shared/calendar-day-header';
import { VerticalGridLines } from '../shared/vertical-grid-lines';
import { DayNumber } from '../shared/day-number';
import { MonthlyEventBar } from './monthly-event-bar';
import { DayStats } from './day-stats';

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

          return (
            <div
              key={weekIdx}
              className="flex-1 grid grid-cols-7 relative"
              style={{ minHeight: '10em', borderBottom: weekIdx < weeks.length - 1 ? '1px dashed rgba(0,0,0,0.3)' : 'none' }}
            >
              <VerticalGridLines />

              {/* Date numbers */}
              {week.map((day, dayIdx) => (
                <div key={dayIdx} className="relative px-1 pt-1 z-10">
                  <DayNumber day={day} currentDate={currentDate} today={today} />
                </div>
              ))}

              {/* Event bars */}
              {eventRows.map(({ event, row }) => (
                <MonthlyEventBar key={event.id} event={event} row={row} weekDays={week} />
              ))}

              {/* Schedule labels (컴퓨팅적 사고) */}
              {weekIdx === 0 && (
                <div
                  className="absolute flex items-center gap-1 z-20"
                  style={{ left: `${(2 / 7) * 100}%`, top: '5em', paddingLeft: '0.6em' }}
                >
                  <span className="text-[0.833em] text-black bg-white/80 px-1 rounded" style={{ fontWeight: 700 }}>
                    컴퓨팅적 사고
                  </span>
                </div>
              )}
              {weekIdx === 1 && (
                <div
                  className="absolute flex items-center gap-1 z-20"
                  style={{ left: `${(1 / 7) * 100}%`, top: '2.9em', paddingLeft: '0.6em' }}
                >
                  <span className="text-[0.833em] text-black bg-white/80 px-1 rounded" style={{ fontWeight: 700 }}>
                    컴퓨팅적 사고
                  </span>
                </div>
              )}

              {/* Stats icons */}
              {weekIdx === 0 && (
                <>
                  <div
                    className="absolute flex items-center gap-1.5 z-20"
                    style={{ left: `${(1 / 7) * 100}%`, bottom: '0.6em', paddingLeft: '0.3em' }}
                  >
                    <DayStats eye={3} chat={2} />
                  </div>
                  <div
                    className="absolute flex items-center gap-1.5 z-20"
                    style={{ left: `${(4 / 7) * 100}%`, bottom: '0.6em', paddingLeft: '0.3em' }}
                  >
                    <DayStats chat={2} />
                  </div>
                </>
              )}
              {weekIdx === 1 && (
                <div
                  className="absolute flex items-center gap-1.5 z-20"
                  style={{ left: `${(2 / 7) * 100}%`, bottom: '0.6em', paddingLeft: '0.3em' }}
                >
                  <DayStats move={2} eye={3} chat={2} cal={3} />
                </div>
              )}
              {weekIdx === 2 && (
                <div
                  className="absolute flex items-center gap-1.5 z-20"
                  style={{ left: `${(3 / 7) * 100}%`, bottom: '0.6em', paddingLeft: '0.3em' }}
                >
                  <DayStats eye={3} chat={2} cal={3} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
