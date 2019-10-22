import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { featureAdapter, State } from '@app/root-store/refill/state';
import { Refill } from '@shared/models';


export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectMyFeatureState: MemoizedSelector<object,
  State> = createFeatureSelector<State>('myFeature');

export const selectAllMyFeatureItems: (
  state: object,
) => Refill[] = featureAdapter.getSelectors(selectMyFeatureState).selectAll;

export const selectMyFeatureById = (id: string) =>
  createSelector(this.selectAllMyFeatureItems, (allMyFeatures: Refill[]) => {
    if (allMyFeatures) {
      return allMyFeatures.find(p => p.providerId === id);
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
