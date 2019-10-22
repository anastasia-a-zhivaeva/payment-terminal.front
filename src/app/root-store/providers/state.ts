import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Provider } from '@shared/models';


export const featureAdapter: EntityAdapter<Provider> = createEntityAdapter<Provider>({
  selectId: model => model.id,
  sortComparer: (a: Provider, b: Provider): number =>
    b.name.localeCompare(a.name),
});

export interface State extends EntityState<Provider> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
  },
);
