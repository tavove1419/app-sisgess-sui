import { createAction, props } from '@ngrx/store';
import { Predial } from 'src/app/views/predial/interfaces/predial.interface';

export const predialListActions = createAction(
  '[Predial-PredialList] Cargando Listado Predios',
  props<{cod_mcp: string | undefined | null; cod_bar: string | undefined | null; manzana: string |  undefined | null}>()
)

export const predialListSuccessActions = createAction(
  '[Predial-PredialListSuccess] Listado de Predios obtenidos',
  props<{listPredial: Predial[]}>()
)

export const predialListErrorActions = createAction(
  '[Predial-PredialListError] Error al obterner listado de Predios',
  props<{error: string}>()
)

export const prediaInfoActions = createAction(
  '[Predial-PredialInfo] Informacion Predio',
  props<Predial>()
)

export const prediaInfoSuccessActions = createAction(
  '[Predial-PredialInfoSuccess] Informacion Predio obtenido correctamente',
  props<Predial>()
)

export const predialInfoErrorActions = createAction(
  '[Predial-PRedialInfoError] Error Información predio',
  props<{error: string}>()
)
