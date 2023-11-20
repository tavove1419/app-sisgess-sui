import { createSelector } from '@ngrx/store'
import { PredialState } from './../interfaces'
import { AppState } from '../app.state'

export const selectPredialFeature = (state: AppState) => state.predial

export const selectLoading = createSelector(
  selectPredialFeature,
  (state: PredialState) => state.isLoading
)

export const getPredialList = createSelector(
  selectPredialFeature,
  (state: PredialState) => state.listPredial
)

export const selectInfoPredial = createSelector(
  selectPredialFeature,
  (state: PredialState) => state.data
)

