import React from 'react';
import { ProjectIcon, DDayBadge } from '../icons';
import type { Project } from '../calendar-data';

interface WeeklyEventLabelProps {
  project: Project;
}

export function WeeklyEventLabel({ project }: WeeklyEventLabelProps) {
  return (
    <>
      <ProjectIcon type={project.icon} />
      <span
        className="text-[1em] text-black whitespace-nowrap"
        style={{ fontWeight: 400, letterSpacing: '0.6px' }}
      >
        {project.name}
      </span>
      <DDayBadge dDay={project.dDay} color={project.color} />
    </>
  );
}
