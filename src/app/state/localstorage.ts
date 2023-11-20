import { ActionReducer } from '@ngrx/store'
import { environment } from 'src/environments/environment'
import { localStorageSync } from 'ngrx-store-localstorage';

export function Management(reducer: ActionReducer<any>): ActionReducer<any>  {
  return localStorageSync(
    {
        keys: [{
            encrypt: (state: any) => state,
            decrypt: (state: any) => state
        }],
        rehydrate: true,
        storageKeySerializer: (key: any) => `${environment.sigessApi}_${key}`
    }
)(reducer)
}
