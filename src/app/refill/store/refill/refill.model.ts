import { RefillForm } from '@refill/intefaces';

export interface RefillStateModel extends RefillForm {
  errorMessage?: string;
  successMessage?: string;
}
