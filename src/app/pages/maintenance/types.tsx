export interface Maintenance {
  id: number;
  orderNumber: string;
  openingDate: string;
  completionDeadline: string;
  responsibleTeam: string;
  status: string;
  machine?: string;  
}

export interface ServiceSupplier {
  id: number;
  name: string;
  code: string;
  type: 'service';
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  serviceDescription: string;
  notes: string;
}

export interface OrderService {
  id: number;
  name: string;
  description: string;
}

export interface MaintenanceOrder {
  id: number;
  name: string;
  supplierName: string;
  description: string;
  services: OrderService[];
}

export type Service = {
  id: number;
  name: string;
  description: string;
  duration: string; // 
  cost: number;
  requiredMaterials: string[]; 
};

  
