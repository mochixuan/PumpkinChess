import Taro, { Component } from '@tarojs/taro'
import {
  View
} from '@tarojs/components'
import ChessHeaderView from '../components/ChessHeaderView'
import CheckerboardView from '../components/CheckerboardView'
import ChessBottomView from '../components/ChessBottomView'

export default class MainPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ChessHeaderView />
        <CheckerboardView />
        <ChessBottomView />
      </View>
    )
  }

}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden'
  }
}
