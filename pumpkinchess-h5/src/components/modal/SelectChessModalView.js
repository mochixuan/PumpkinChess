import Taro, { Component } from '@tarojs/taro'
import {
  View,Button
} from '@tarojs/components'
import {AtModal,AtModalHeader,AtModalContent,AtModalAction} from 'taro-ui'
import {inject, observer} from "@tarojs/mobx";
import {getString} from "../../data/const/I18n";
import {color_e0,color_44,color_ff} from '../../styles/colors'

@inject('settingStore','chessStore')
@observer
export default class SelectChessModalView extends Component{

  render() {

    const isSelectModalState = this.props.chessStore.isSelectModalState
    const {themeColor,curLanguageIndex} = this.props.settingStore

    let itemViews = [
      getString('blacker',curLanguageIndex),
      getString('whiter',curLanguageIndex),
      getString('random',curLanguageIndex)
    ].map((item,index)=>{

      const viewStyles = {...styles.item}
      if (index === isSelectModalState) {
        viewStyles.backgroundColor = themeColor
        viewStyles.color = color_ff
      }
      return (
        <Button style={viewStyles} key={item} onClick={()=>{this.props.chessStore.setSelectModalState(index)}}>{item}</Button>
      )
    })

    return (
      <AtModal isOpened={isSelectModalState != -1} onClose={this.onCancel}>
        <AtModalHeader>{getString('select_first_tip',curLanguageIndex)}</AtModalHeader>
        <AtModalContent>
          <View style={styles.item_container}>
            {itemViews}
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={this.onCancel}>{getString('cancel',curLanguageIndex)}</Button>
          <Button style={{color: themeColor}} onClick={this.onSure}>{getString('sure',curLanguageIndex)}</Button>
        </AtModalAction>
      </AtModal>
    )
  }

  onCancel = () => {
    this.props.chessStore.setSelectModalState(-1)
  }

  onSure = () => {
    this.props.chessStore.sureSelectModalState()
  }

}

const styles = {
  item_container: {
    display: 'flex',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  item: {
    backgroundColor: color_e0,
    width: 54,
    height: 54,
    borderRadius: 27,
    padding: 0,
    margin: 0,
    color: color_44,
    fontSize: 14
  }
}
