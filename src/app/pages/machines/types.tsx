export interface MaintenanceHistory {
    date: string;
    description: string;
    partsUsed?: string[];
    materialsUsed?: string[];
  }
  
  export interface Machine {
    id: number;
    name: string;
    type: string;
    model: string;
    manufacturingDate: string;
    serialNumber: string;
    location: string;
    maintenanceHistory: MaintenanceHistory[];
  }
  