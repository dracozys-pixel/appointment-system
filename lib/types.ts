export type ServiceType = '唇腺活检' | '术后拆线';

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceType: ServiceType;
  completed: boolean;
  createdAt: number;
}

export type FilterType = 'all' | 'completed' | 'incomplete';
