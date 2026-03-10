import React from 'react';
import type { Schedule } from '../calendar-data';

interface ScheduleCardProps {
  schedule: Schedule;
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
  return (
    <div
      className="bg-white border-l-4 p-2"
      style={{ borderColor: schedule.color, minHeight: 60 }}
    >
      <p className="text-[1em] text-black" style={{ fontWeight: 800 }}>
        {schedule.title}
      </p>
      <p className="text-[0.833em] mt-0.5" style={{ color: schedule.color, fontWeight: 400 }}>
        {schedule.isAllDay ? '하루종일' : schedule.time}
      </p>
      {schedule.memo && (
        <p className="text-[0.833em] text-[#94a3b8] mt-0.5" style={{ fontWeight: 400 }}>
          {schedule.memo}
        </p>
      )}
    </div>
  );
}
