import React from 'react';
import type { Schedule as ScheduleType } from '../calendar-data';
import { hexToRgba } from '../shared/color-utils';

interface ScheduleProps {
  schedule: ScheduleType;
}

export function Schedule({ schedule }: ScheduleProps) {
  const bgColor = hexToRgba(schedule.color, 0.1);
  const startTime = schedule.isAllDay
    ? '종일'
    : schedule.time?.split('-')[0]?.trim() ?? '';

  return (
    <div
      className="border-l-[0.25em] px-[0.4em] py-[0.3em] overflow-hidden"
      style={{ backgroundColor: bgColor, borderColor: schedule.color }}
    >
      <p className="flex items-center gap-[0.4em] text-[0.75em] text-black min-w-0" style={{ fontWeight: 800 }}>
        <span className="shrink-0" style={{ color: schedule.color}}>
          {startTime}
        </span>
        <span className="truncate min-w-0">{schedule.title}</span>
      </p>
    </div>
  );
}
