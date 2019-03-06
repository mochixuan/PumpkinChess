import { observable,action } from 'mobx'
import {theme_colors} from '../../styles/colors'

class SettingStore {
  @observable themeColor = theme_colors[0]
  @observable curLanguageIndex = 0
  @observable isShowSettingModal = false

  @action
  changeSettingModal = () => {
    this.isShowSettingModal = !this.isShowSettingModal
  }

  @action
  changeThemeColor = (index) => {
    this.themeColor = theme_colors[index]
  }

  @action
  changeLanguage = () => {
    if (this.curLanguageIndex === 0) {
      this.curLanguageIndex = 1
    } else {
      this.curLanguageIndex = 0
    }
  }

}

const settingStore = new SettingStore()

export default settingStore
