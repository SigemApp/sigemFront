// src/utils/reportUtils.ts
import { Collaborator } from '../pages/collaborator/types';

export const generateReportContent = (collaborator: Collaborator): string => {
  return `
    Relatório do Colaborador

    ID: ${collaborator.id}
    Nome: ${collaborator.name}
    Email: ${collaborator.email}
    Número de Funcionário: ${collaborator.employeeNumber}
    Equipe: ${collaborator.team ? collaborator.team.name : 'N/A'}
    Cargo: ${collaborator.position}
  `;
};
