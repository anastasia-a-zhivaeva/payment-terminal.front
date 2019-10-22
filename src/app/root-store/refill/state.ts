import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Refill } from '@shared/models';


export const featureAdapter: EntityAdapter<Refill> = createEntityAdapter<Refill>({
  selectId: model => model.providerId,
  sortComparer: (a: Refill, b: Refill): number =>
    b.phoneNumber.localeCompare(a.phoneNumber),
});

export interface State extends EntityState<Refill> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
  },
);
