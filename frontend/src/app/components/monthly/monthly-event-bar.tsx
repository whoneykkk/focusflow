import React from 'react';
import { differenceInDays } from 'date-fns';
import { MonthlyEventLabel } from './monthly-event-label';
import { projects } from '../calendar-data';
import type { CalendarEvent } from '../calendar-data';

interface MonthlyEventBarProps {
  event: CalendarEvent;
  row: number;
  weekDays: Date[];
}

export function MonthlyEventBar({ event, row, weekDays }: MonthlyEventBarProps) {
  const project = projects.find((p) => p.id === event.projectId);
  if (!project) return null;

  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];
  const barStart = event.startDate < weekStart ? weekStart : event.startDate;
  const barEnd = event.endDate > weekEnd ? weekEnd : event.endDate;

  const startIdx = differenceInDays(barStart, weekStart);
  const endIdx = differenceInDays(barEnd, weekStart);
  const span = endIdx - startIdx + 1;

  const leftPct = (startIdx / 7) * 100;
  const widthPct = (span / 7) * 100;
  const topOffset = 26 + row * 20;
  const endsThisWeek = event.endDate <= weekEnd;

  return (
    <React.Fragment>
      <div
        className="absolute flex items-center"
        style={{
          left: `calc(${leftPct}% + 2px)`,
          width: `calc(${widthPct}% - 4px)`,
          top: topOffset,
          height: 4,
          zIndex: 20,
          backgroundColor: project.color,
          borderRadius: 2,
        }}
      />
      {endsThisWeek && (
        <div
          className="absolute flex items-center gap-[0.5em] z-20"
          style={{
            left: `calc(${((endIdx + 1) / 7) * 100}% + 4px)`,
            top: topOffset - 6,
          }}
        >
          <MonthlyEventLabel project={project} />
        </div>
      )}
    </React.Fragment>
  );
}
