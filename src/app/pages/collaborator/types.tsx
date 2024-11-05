// Define a interface para o Team
export interface Team {
  id: number;
  name: string;
  description: string; 
  leader: string;
  identifier:string;
  createdAt: string; 
  updatedAt: string;
}

// Define a interface para o Collaborator
export interface Collaborator {
  id: number;
  name: string;
  email: string;
  employeeNumber: string;
  team?: Team; 
  teamId: number | null;
  position:string;
}

// Define a interface para o Service
export interface Service {
  id: number; 
  collaboratorId: number; 
  description: string; 
  status: string; 
  startDate: string; 
  endDate?: string; 
  supervisor?: string; 
}

export interface TeamDetailProps {
  team: Team | null;
  collaborators: Collaborator[];
  onUpdateTeam: (team: Omit<Team, 'id'>) => void;
  onClose: () => void;
}