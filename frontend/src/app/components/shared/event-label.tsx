import React from 'react';
import { DDayBadge } from '../icons';
import type { Project } from '../calendar-data';

interface EventLabelProps {
  project: Project;
  fontSize?: string;
}

export function EventLabel({ project, fontSize = '1em' }: EventLabelProps) {
  return (
    <span className="inline-flex items-center whitespace-nowrap gap-[0.5em]">
      <span className="text-black" style={{ fontWeight: 800, fontSize }}>
        {project.name}
      </span>
      <DDayBadge dDay={project.dDay} color={project.color} />
    </span>
  );
}