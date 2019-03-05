import Taro, { Component } from '@tarojs/taro'
import {
  View,Image,Text
} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import {color_e0,main_color} from "../styles/colors";
import {getString} from "../data/const/I18n";
import {AtModal} from 'taro-ui'
import SelectChessModalView from './modal/SelectChessModalView'
import SettingModalView from "./modal/SettingModalView";


@inject('settingStore','chessStore')
@observer
export default class ChessBottomView extends Component{

  constructor(props) {
    super(props)

    this.state = {
      commonModalState: -1, // NONE: -1, 重新开始: 0, 悔棋: 1, 复盘: 2
    }
  }

  render() {

    const chessState = this.props.chessStore.chessState
    const curLanguageIndex = this.props.settingStore.curLanguageIndex

    let isHasStart = true
    if (chessState === 'NO_START') {
      isHasStart = false
    }

    //warm_reminder
    let isOpened = false
    let content = ''
    this.onConfirm
    switch (this.state.commonModalState) {
      case 0:
        isOpened = true
        content = getString('restart_tip',curLanguageIndex)
        this.onConfirm = this.onResetChess
        break
      case 1:
        isOpened = true
        content = getString('repent_tip',curLanguageIndex)
        this.onConfirm = this.onRepentChess
        break
      case 2:
        isOpened = true
        content = getString('compound_tip',curLanguageIndex)
        this.onConfirm = this.onCompoundChess
        break
    }

    return (
      <View style={styles.container}>
        <AtModal
          isOpened={isOpened}
          title={getString('warm_reminder',curLanguageIndex)}
          cancelText={getString('cancel',curLanguageIndex)}
          confirmText={getString('sure',curLanguageIndex)}
          onConfirm={this.onConfirm}
          onClose={this.onCloseCommonModal}
          onCancel={this.onCloseCommonModal}
          content={content}
        />
        <SelectChessModalView />
        <SettingModalView />
        <View style={styles.top_line} />
        <View style={styles.content}>
          <View style={styles.content_item} onClick={this.onClickStart}>
            <Image style={styles.content_item_icon} src={isHasStart ? require('../data/img/pause.png') : require('../data/img/player.png')}/>
            <Text style={styles.content_item_text}>{getString(isHasStart ? 'end' : 'start',curLanguageIndex)}</Text>
          </View>
          <View style={styles.content_item} onClick={this.onShowRepentModal}>
            <Image style={styles.content_item_icon} src={require('../data/img/repent.png')} />
            <Text style={styles.content_item_text}>{getString('repent',curLanguageIndex)}</Text>
          </View>
          <View style={styles.content_item} onClick={this.onShowCompoundModal}>
            <Image style={styles.content_item_icon} src={require('../data/img/see.png')} />
            <Text style={styles.content_item_text}>{getString('compound',curLanguageIndex)}</Text>
          </View>
          <View style={styles.content_item} onClick={this.onShowSettingModal}>
            <Image style={styles.content_item_icon} src={require('../data/img/setting.png')} />
            <Text style={styles.content_item_text}>{getString('setting',curLanguageIndex)}</Text>
          </View>
        </View>
      </View>
    )
  }

  onClickStart = () => {
    const curLanguageIndex = this.props.settingStore.curLanguageIndex
    const {setSelectModalState,chessState,isHasCompound} = this.props.chessStore

    if (isHasCompound) {
      Taro.showToast({title: getString('waiting_compound_tip',curLanguageIndex),icon: 'none'})
      return
    }

    if (chessState == 'WHITE' || chessState == 'BLACK') {
      Taro.showToast({title: getString('has_start_tip',curLanguageIndex),icon: 'none'})
      return
    } else if (chessState == 'NO_START') {
      setSelectModalState(0)
    } else if (chessState == 'WHITE_END' || chessState == 'BLACK_END' || 'TIE') {
      this.setState({commonModalState: 0})
    }
  }
  onShowRepentModal = () => {
    const curLanguageIndex = this.props.settingStore.curLanguageIndex
    const isHasCompound = this.props.chessStore.isHasCompound
    if (isHasCompound) {
      Taro.showToast({title: getString('waiting_compound_tip',curLanguageIndex),icon: 'none'})
      return
    }

    this.setState({commonModalState: 1})
  }
  onShowCompoundModal = () => {
    const curLanguageIndex = this.props.settingStore.curLanguageIndex
    const isHasCompound = this.props.chessStore.isHasCompound
    if (isHasCompound) {
      Taro.showToast({title: getString('waiting_compound_tip',curLanguageIndex),icon: 'none'})
      return
    }

    this.setState({commonModalState: 2})
  }
  onShowSettingModal = () => {
    const {curLanguageIndex,changeSettingModal} = this.props.settingStore
    const isHasCompound = this.props.chessStore.isHasCompound
    if (isHasCompound) {
      Taro.showToast({title: getString('waiting_compound_tip',curLanguageIndex),icon: 'none'})
      return
    }

    changeSettingModal()
  }

  onCloseCommonModal = () => this.setState({commonModalState: -1})
  onResetChess = () => {
    this.props.chessStore.resetChess()
    this.setState({commonModalState: -1})
  }
  onRepentChess = () => {
    this.props.chessStore.repentChess()
    this.setState({commonModalState: -1})
  }
  onCompoundChess = () => {
    this.props.chessStore.compoundChess()
    this.setState({commonModalState: -1})
  }

}

const styles = {
  container: {
    height: 60,
    flexDirection: 'column'
  },
  top_line: {
    height: 1,
    width: '100vw',
    backgroundColor: color_e0
  },
  content: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  content_item: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  content_item_icon: {
    width: 24,
    height: 24
  },
  content_item_text: {
    fontSize: 16,
    color: main_color,
    marginTop: 1
  },
}
