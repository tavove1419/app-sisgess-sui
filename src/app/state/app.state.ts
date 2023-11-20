import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { Predialffects } from './effects/predial.effects';
import { PredialState } from './interfaces';
import * as localStorage from './localstorage'

import { predialReducer } from './reducers/predial.reducer';


export interface AppState {
  readonly predial: PredialState
}

export const AppReducers: ActionReducerMap<AppState> = {
  predial: predialReducer
}

export const AppMetaReducers: MetaReducer<AppState>[] = [
  localStorage.Management
]

export const AppEffects = [
  Predialffects
]
