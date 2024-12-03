// Definindo o tipo para o item do estoque (StockItem)
export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

// Definindo o tipo para o serviço relacionado à manutenção
export interface Service {
  id: string;
  description: string;
  price: number;
}

// Definindo o tipo para a manutenção (Maintenance)
export interface Maintenance {
  id: string;                  // ID único da manutenção
  orderNumber: string;         // Número da ordem de serviço
  machine: string;             // Nome ou ID da máquina
  openingDate: string;         // Data de abertura da manutenção
  completionDeadline: string;  // Prazo de conclusão
  responsibleTeam: string;     // Equipe responsável pela manutenção
  status: string;              // Status da manutenção (Ex: "Em andamento", "Concluída")
  description?: string;        // Descrição (opcional)
  priority?: string;           // Prioridade (opcional)
  maintenanceType?: string;    // Tipo da manutenção (ex: preventiva, corretiva)
  comments?: string;           // Comentários adicionais
  stockItems: StockItem[];     // Lista de itens de estoque envolvidos
  services: Service[];         // Lista de serviços relacionados à manutenção
  maintenanceHistory?: string[]; // Histórico de manutenções (opcional)
}

// Tipagem do componente de gerenciamento de status da manutenção
interface MaintenanceStatusManagerProps {
  isOpen: boolean;  // Se o modal está aberto ou fechado
  onClose: () => void;  // Função de fechamento do modal
  onSave: (maintenance: Omit<Maintenance, "id"> & { files: File[] | null }) => Promise<void>;  // Função para salvar os dados da manutenção
  initialData: Maintenance | null;  // Dados iniciais para edição (caso não seja criação)
  mode: 'create' | 'edit';  // Modo de operação, podendo ser 'create' ou 'edit'
}
