import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { featureAdapter, State } from '@app/root-store/providers/state';
import { Provider } from '@shared/models';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectMyFeatureState: MemoizedSelector<object,
  State> = createFeatureSelector<State>('myFeature');

export const selectAllMyFeatureItems: (
  state: object,
) => Provider[] = featureAdapter.getSelectors(selectMyFeatureState).selectAll;

export const selectMyFeatureById = (id: string) =>
  createSelector(this.selectAllMyFeatureItems, (allMyFeatures: Provider[]) => {
    if (allMyFeatures) {
      return allMyFeatures.find(p => p.id === id);
    } else {
      return null;
    }
  });

export const selectMyFeatureError: MemoizedSelector<object, any> = createSelector(
  selectMyFeatureState,
  getError,
);

export const selectMyFeatureIsLoading: MemoizedSelector<object,
  boolean> = createSelector(selectMyFeatureState, getIsLoading);
