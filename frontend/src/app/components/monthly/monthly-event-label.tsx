import React from 'react';
import { ProjectIcon, DDayBadge } from '../icons';
import type { Project } from '../calendar-data';

interface MonthlyEventLabelProps {
  project: Project;
}

export function MonthlyEventLabel({ project }: MonthlyEventLabelProps) {
  return (
    <>
      <ProjectIcon type={project.icon} />
      <span
        className="text-[0.833em] text-black whitespace-nowrap"
        style={{ fontWeight: 400, letterSpacing: '0.6px' }}
      >
        {project.name}
      </span>
      <DDayBadge dDay={project.dDay} color={project.color} />
    </>
  );
}
