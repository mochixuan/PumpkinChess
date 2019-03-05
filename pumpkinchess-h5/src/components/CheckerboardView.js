import Taro, { Component } from '@tarojs/taro'
import {
  View ,Image
} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import {getString} from "../data/const/I18n";

@inject('settingStore','chessStore')
@observer
export default class CheckerboardView extends Component{

  render() {
    const {chessStore,settingStore} = this.props

    const itemStyle = {...styles.item}
    itemStyle.borderColor = settingStore.themeColor
    const itemContainerStyle = {...styles.item_container}
    itemContainerStyle.borderColor = settingStore.themeColor

    let chessItemsView = chessStore.chessItems.map((item,index)=>{

      const chessView = item.isFilled ? (
        <Image
          style={styles.item_icon}
          src={item.isWhite ? require('../data/img/chess2.png') : require('../data/img/chess1.png')}
        />
      ) : undefined

      return (
        <View style={itemStyle} key={item+index} onClick={()=> this.onChessGo(item,index)}>
          {chessView}
        </View>
      )
    })
    return (
      <View style={styles.container}>
        <View style={itemContainerStyle}>
          {chessItemsView}
        </View>
      </View>
    )
  }

  onChessGo = (item,index) => {
    const curLanguageIndex = this.props.settingStore.curLanguageIndex
    const {onChessGo,chessState,isHasCompound} = this.props.chessStore

    if (isHasCompound) {
      Taro.showToast({title: getString('waiting_compound_tip',curLanguageIndex),icon: 'none'})
      return
    }

    let isForbidGoTip = null
    switch (chessState) {
      case 'NO_START':
        isForbidGoTip = 'start_tip'
        break
      case 'BLACK_END':
        isForbidGoTip = 'blacker_win'
        break
      case 'WHITE_END':
        isForbidGoTip = 'whiter_win'
        break
      case 'TIE':
        isForbidGoTip = 'tie_tip'
        break
    }
    if(isForbidGoTip) {
      Taro.showToast({
        title: getString(isForbidGoTip,curLanguageIndex),
        icon: 'none'
      })
      return
    }

    if (item.isFilled) {
      Taro.showToast({
        title: getString('repeat_chess_tip',curLanguageIndex),
        icon: 'none'
      })
      return
    }

    onChessGo(index)
  }

}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vw',
  },
  item_container: {
    flexWrap: 'wrap',
    display: 'flex',
    width: '72vw',
    height: '72vw',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  item: {
    borderWidth: 1,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    width: '24vw',
    height: '24vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item_icon: {
    width: '16vw',
    height: '16vw'
  }
}
