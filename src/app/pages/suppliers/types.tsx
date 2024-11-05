export interface PartSupplier {
  id: number;
  name: string;
  code: string;
  type: 'part';
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  notes?: string;
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
  website?: string;
  serviceDescription: string;
  notes?: string;
}

export type SupplierItem = PartSupplier | ServiceSupplier;

