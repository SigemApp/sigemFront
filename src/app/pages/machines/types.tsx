export interface MaintenanceHistory {
  id: string;  
  orderNumber: string;
  openingDate: string;
  completionDeadline: string;
  date: string;
  description: string;
  partsUsed?: string[];
  materialsUsed?: string[];
  responsibleTeam: string;
  status: string;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  machineModel: string;
  serialNumber: string;
  location: string;
  manufacturingDate: string;
  maintenanceHistory?: any[]; 
  image: File | null; 
}

