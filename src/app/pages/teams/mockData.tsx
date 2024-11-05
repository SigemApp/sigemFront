import { Team } from '../collaborator/types';  
import { mockCollaborators } from '../collaborator/mockData';

// Define os times com o líder como string
export const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Equipe de Manutenção Geral',
    description: 'Equipe responsável pela manutenção geral dos equipamentos.',
    leader: 'Daniel Costa', 
    identifier: 'team-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-08-17T00:00:00Z',
  },
  {
    id: 2,
    name: 'Equipe de Equipamentos',
    description: 'Equipe focada na manutenção e reparos de equipamentos.',
    leader: 'Eliane Pereira', 
    identifier: 'team-2',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-08-17T00:00:00Z',
  },
  {
    id: 3,
    name: 'Equipe de Processos',
    description: 'Equipe responsável pelos processos de manutenção e otimização.',
    leader: 'Felipe Santos', 
    identifier: 'team-3',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-08-17T00:00:00Z',
  },
  {
    id: 4,
    name: 'Equipe de Engenharia de Manutenção',
    description: 'Equipe especializada em engenharia e manutenção avançada.',
    leader: 'Bruno Oliveira', 
    identifier: 'team-4',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-08-17T00:00:00Z',
  },
];

// Relacionando colaboradores com equipes
export const teamCollaboratorsMap = {
  1: mockCollaborators.filter(c => c.teamId === 1),
  2: mockCollaborators.filter(c => c.teamId === 2),
  3: mockCollaborators.filter(c => c.teamId === 3),
  4: mockCollaborators.filter(c => c.teamId === 4),
};
