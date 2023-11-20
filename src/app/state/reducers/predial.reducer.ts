import { createReducer, on } from '@ngrx/store'
import {PredialState} from '../interfaces'
import * as predialActions from '../actions'
import { Predial } from 'src/app/views/predial/interfaces/predial.interface';
import { state } from '@angular/animations';

export const initialPredialState: PredialState = {
  isLoading: false,
  messageError: null,
  messageLoading: null,
  data: null,
  listPredial: []
}

export const predialReducer = createReducer (
  initialPredialState,
  on(predialActions.predialListActions, (state) => ({
    ...state,
    isLoading: true,
    messageError: null,
    messageLoading: 'Cargando información...'
  })),
  on(predialActions.predialListSuccessActions, (state, predial) => ({
    ...state,
    isLoading: false,
    messageError: null,
    messageLoading: 'Fin',
    data: null,
    listPredial: predial.listPredial
  })),
  on(predialActions.predialListErrorActions, (state, {error}) => ({
    ...state,
    isLoading:false,
    messageError: error,
    messageLoading: null,
    listPredial: []
  })),
  on(predialActions.prediaInfoActions, (state) => ({
    ...state,
    isLoading: true,
    messageError: null,
    messageLoading: 'Cargando información...',
  })),
  on(predialActions.prediaInfoSuccessActions, (state, infoPredial) => ({
    ...state,
    isLoading: false,
    messageError: null,
    messageLoading: 'Fin',
    data: infoPredial
  })),
  on(predialActions.predialInfoErrorActions, (state, {error}) => ({
    ...state,
    isLoading:false,
    messageError: error,
    messageLoading: null,
    data: null
  })),
)
