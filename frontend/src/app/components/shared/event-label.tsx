import React from 'react';
import { DDayBadge } from '../icons';
import type { Project } from '../calendar-data';

interface EventLabelProps {
  project: Project;
  variant?: 'weekly' | 'monthly';
}

export function EventLabel({ project, variant = 'monthly' }: EventLabelProps) {
  const gapClass = variant === 'weekly' ? 'gap-[0.5em]' : 'gap-[0.35em]';

  return (
    <span className={`inline-flex items-center whitespace-nowrap ${gapClass}`}>
      <span className="text-[1em] text-black" style={{ fontWeight: 400 }}>
        {project.name}
      </span>
      <DDayBadge dDay={project.dDay} color={project.color} />
    </span>
  );
}