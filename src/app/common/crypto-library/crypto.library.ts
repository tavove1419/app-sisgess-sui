import { Injectable } from '@angular/core'
import * as crypto from 'crypto-js'
import { environment } from 'src/environments/environment.prod'


@Injectable()
export class CryptoLibrary {

  private readonly key: string = ''

  constructor() {
    this.key = environment.keyCrypto;
  }

  public encrypt(text: string): string {
    const encrypted = crypto.AES.encrypt(text, this.key).toString()
    return encrypted
  }

  public encryptObject(objectToEncrypt: object, encryptKey = false): {[key: string]: any} {
    const objectReturn: any = {}
    Object.entries(objectToEncrypt).forEach(([key, value]) => {
      const newValue = this.encrypt(value);
      objectReturn[encryptKey ? this.encrypt(key): key] = newValue
    })
    return objectReturn
  }

  public decrypt(decryptedValue: string): string {
    const decrypted = crypto.AES.decrypt(decryptedValue, this.key).toString(crypto.enc.Utf8)
    return decrypted
  }
}
