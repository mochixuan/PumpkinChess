import {zhrCN} from './zh-rCN'
import {enrCN} from './en-rUS'

export const getString = (key, curLanguageIndex) => {
  if (curLanguageIndex === 0) {
    return zhrCN[key]
  } else {
    return enrCN[key]
  }
}
