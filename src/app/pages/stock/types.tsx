export interface StockItem {
    id: number;
    name: string;
    code: string;
    supplier: string;
    quantity: number;
    unitPrice: number;
    
  }
  
  export interface StockMovement {
    id: number;
    itemId: number; 
    movementType: 'in' | 'out'; 
    quantity: number;
    date: string; 
    notes?: string; 
  }