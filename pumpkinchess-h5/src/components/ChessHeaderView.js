import Taro, { Component } from '@tarojs/taro'
import {
  View,Image,Text
} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { color_e0,color_00,color_ff } from '../styles/colors'
import {getString} from "../data/const/I18n";

@inject('settingStore','chessStore')
@observer
export default class CheckerboardView extends Component{

  constructor(props) {
    super(props)

    this.state = {
      textTip: 'no_start_tip'
    }
  }

  componentDidMount() {
    this.oldChessState = this.props.chessStore.chessState
  }

  // 当组件因为它观察的数据发生了改变，它会安排重新渲染
  componentWillReact() {
    const oldChessState = this.oldChessState
    const newChessState = this.props.chessStore.chessState
    if(oldChessState !== newChessState) {
      let textTip = this.state.textTip
      if (oldChessState === 'NO_START') {
        textTip =  newChessState === 'WHITE' ? 'whiter_first_start' : 'blacker_first_start'
      } else {
        switch (newChessState) {
          case 'NO_START':
            textTip =  'no_start_tip'
            break
          case 'WHITE':
            textTip = 'whiter_go'
            break
          case 'BLACK':
            textTip = 'blacker_go'
            break
          case 'WHITE_END':
            textTip = 'whiter_win'
            break
          case 'BLACK_END':
            textTip = 'blacker_win'
            break
          case 'TIE':
            textTip = 'tie_tip'
            break
        }
      }
      this.oldChessState = newChessState
      this.setState({textTip})

      if ((oldChessState === 'WHITE' || oldChessState === 'BLACK') &&
          (newChessState === 'WHITE_END' || newChessState === 'BLACK_END' || newChessState === 'tie_tip')) {

        let resultTip = 'tie_tip'
        if (newChessState === 'WHITE_END') {
          resultTip = 'whiter_win'
        } else if (newChessState === 'BLACK_END') {
          resultTip = 'blacker_win'
        }

        const curLanguageIndex = this.props.settingStore.curLanguageIndex
        Taro.showToast({
          title: getString('end_tip',curLanguageIndex)+getString(resultTip,curLanguageIndex),
          icon: 'none'
        })
      }
    }
  }

  render() {

    const avatarLeft = {...styles.avatar}
    avatarLeft.marginLeft = -avatarIconWidth
    avatarLeft.backgroundColor = color_00
    const avatarIconLeft = {...styles.avatar_icon}

    const avatarRight = {...styles.avatar}
    avatarRight.transform = 'rotate(-45deg)'
    avatarRight.marginRight = -avatarIconWidth
    avatarRight.backgroundColor = color_ff
    const avatarIconRight = {...styles.avatar_icon}
    avatarIconRight.transform = 'rotate(45deg)'

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={avatarLeft}>
            <Image style={avatarIconLeft} src={require('../data/img/chess1.png')} />
          </View>
          {this.renderNoticeView()}
          <View style={avatarRight}>
            <Image style={avatarIconRight} src={require('../data/img/chess2.png')} />
          </View>
        </View>
        <View style={styles.bottom_line} />
      </View>
    )
  }

  renderNoticeView = () => {
    const {themeColor,curLanguageIndex} = this.props.settingStore
    const {chessItems,chessState} = this.props.chessStore //太智能了也不好chessState提醒Mobx需要刷新

    const middleTitleStyle = {...styles.middle_title}
    middleTitleStyle.color = themeColor

    const chessItemsView = chessItems
      .filter((item)=> item.orderIndex >= 0) // 过滤
      .sort((itemA,itemB) => itemA.orderIndex-itemB.orderIndex) // 排序
      .map((item)=>{                        // 绘制
        const position = item.position
        const tip = getString(item.isWhite ? 'whiter' : 'blacker',curLanguageIndex)+getString('go_position_tip',curLanguageIndex)+(position)
        return (
          <Text style={{
            color: item.isWhite ? color_ff : color_00,
            fontSize: 12,
            alignSelf: item.isWhite ? 'flex-end' : 'flex-start'
          }} key={item}
          >{tip}</Text>
        )
      })

    return (
      <View style={styles.middle}>
        <Text style={middleTitleStyle}>{getString(this.state.textTip,curLanguageIndex)}</Text>
        {chessItemsView}
      </View>
    )
  }

}

const avatarIconWidth = 40
const rotateGapWidth = (Math.sqrt(2)-1)*avatarIconWidth
const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: color_e0,
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    display: 'flex'
  },
  avatar: {
    display: 'flex',
    flexDirection: 'column',
    width: avatarIconWidth*2,
    height: avatarIconWidth*2,
    transform: 'rotate(135deg)',
    marginTop: rotateGapWidth,
    borderRadius: 10,
  },
  avatar_icon: {
    width: avatarIconWidth,
    height: avatarIconWidth,
    transform: 'rotate(-135deg)',
    margin: 4
  },
  middle : {
    flex: 1,
    display:'flex',
    flexDirection: 'column',
    marginLeft: rotateGapWidth*2,
    marginRight: rotateGapWidth*2,
  },
  middle_title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 2,
  },
  middle_item: {
    flex: 1,
    display:'flex',
    flexWrap: 'wrap',
    flexDirection: 'space-between'
  },
  bottom_line: {
    height: 1,
    width: '100vw',
    backgroundColor: color_e0
  }
}
