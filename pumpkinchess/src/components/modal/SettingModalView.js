import Taro, { Component } from '@tarojs/taro'
import {
  View,Button,Image
} from '@tarojs/components'
import {AtModal,AtModalHeader,AtModalContent,AtModalAction,AtSwitch} from 'taro-ui'
import {inject, observer} from "@tarojs/mobx";
import {getString} from "../../data/const/I18n";
import {languageItems} from '../../data/const/baseString'
import {color_e0, theme_colors} from '../../styles/colors'

@inject('settingStore')
@observer
export default class SettingModalView extends Component{

  render() {

    const {themeColor,curLanguageIndex,isShowSettingModal} = this.props.settingStore

    let selectedView = <Image src={require('../../data/img/selected.png')} style={styles.select_icon} />
    let itemViews = theme_colors
      .map((item,index)=>{
        const viewStyles = {...styles.theme_item}
        viewStyles.backgroundColor = item
        return (
          <View style={viewStyles} key={item} onClick={()=>{this.onChangeThemeColor(index)}}>
            {item === themeColor ? selectedView : undefined}
          </View>
        )
      })

    return (
      <AtModal isOpened={isShowSettingModal} onClose={this.onSure}>
        <AtModalHeader>{getString('setting',curLanguageIndex)}</AtModalHeader>
        <AtModalContent>
          <View style={styles.row_item}>
            {itemViews}
          </View>
          <AtSwitch title={languageItems[curLanguageIndex]} border={false} checked={curLanguageIndex === 0} onChange={this.onChangeLanguage} />
        </AtModalContent>
        <AtModalAction>
          <Button style={{color: themeColor}} onClick={this.onSure}>{getString('sure',curLanguageIndex)}</Button>
        </AtModalAction>
      </AtModal>
    )
  }

  onSure = () => {
    this.props.settingStore.changeSettingModal()
  }

  onChangeLanguage = () => {
    this.props.settingStore.changeLanguage()
  }

  onChangeThemeColor = (index) => {
    this.props.settingStore.changeThemeColor(index)
  }

}

const styles = {
  row_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: `10px`
  },
  theme_item: {
    backgroundColor: color_e0,
    width: `36px`,
    height: `36px`,
    borderRadius: `18px`,
    padding: `0`,
    margin: `0`,
    fontSize: `14px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  select_icon: {
    width: `20px`,
    height: `20px`,
    resizeMode: 'contain'
  }
}
