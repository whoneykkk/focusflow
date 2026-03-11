import React from 'react';
import { DDayBadge } from '../icons';
import type { Project } from '../calendar-data';

interface EventLabelProps {
  project: Project;
}

export function EventLabel({ project }: EventLabelProps) {
  return (
    <span className="inline-flex items-center whitespace-nowrap gap-[0.5em]">
      <span className="text-[1em] text-black" style={{ fontWeight: 800 }}>
        {project.name}
      </span>
      <DDayBadge dDay={project.dDay} color={project.color} />
    </span>
  );
}