import { defineAbility } from '@casl/ability';

export type AppActions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type AppSubjects = 'User' | 'Course' | 'Module' | 'Assessment' | 'Certificate' | 'FormSubmission' | 'all';

export function defineAbilityFor(role: string) {
  return defineAbility((can, cannot) => {
    if (role === 'ADMIN') {
      can('manage', 'all');
    } else if (role === 'RRHH') {
      can('read', 'User');
      can('read', 'Certificate');
      can('read', 'FormSubmission');
    } else if (role === 'CALIDAD') {
      can('manage', 'Assessment');
      can('manage', 'Certificate');
      can('read', 'Course');
    } else if (role === 'GESTOR') {
      can('manage', 'Course');
      can('manage', 'Module');
      can('read', 'Assessment');
    } else if (role === 'COLABORADOR') {
      can('read', 'Course');
      can('read', 'Module');
      can('read', 'Assessment');
      can('read', 'Certificate');
      can('create', 'FormSubmission');
    }
  });
}
