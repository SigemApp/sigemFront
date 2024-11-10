export interface PartSupplier {
  id: string;
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
  id: string;
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


