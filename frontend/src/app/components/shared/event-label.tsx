import React from 'react';
import { ProjectIcon, DDayBadge } from '../icons';
import type { Project } from '../calendar-data';

interface EventLabelProps {
  project: Project;
  textSize?: 'sm' | 'md';
}

export function EventLabel({ project, textSize = 'sm' }: EventLabelProps) {
  const fontSize = textSize === 'sm' ? 'text-[0.833em]' : 'text-[1em]';
  return (
    <>
      <ProjectIcon type={project.icon} />
      <span
        className={`${fontSize} text-black whitespace-nowrap`}
        style={{ fontWeight: 400, letterSpacing: '0.6px' }}
      >
        {project.name}
      </span>
      <DDayBadge dDay={project.dDay} color={project.color} />
    </>
  );
}
