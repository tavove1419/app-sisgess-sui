import { Predial } from 'src/app/views/predial/interfaces/predial.interface';

export interface PredialState {
  isLoading: boolean;
  messageError: string | null;
  data: Predial | null;
  listPredial:  Predial[] | null;
  messageLoading: string | null
}
