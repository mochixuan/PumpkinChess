import { observable,action } from 'mobx'
import {originChessItems} from '../../data/const/baseString'

class ChessStore {

  @observable chessState = 'NO_START'  // 'NO_START'|'WHITE'|'BLACK'|'WHITE_END'|'BLACK_END'|'TIE'
  @observable chessItems = originChessItems
  @observable isSelectModalState = -1 // 'NONE' = -1|'BLACK' = 0 |'WHITE' = 1 |'Random' = 2
  @observable isHasCompound = false

  @action
  goChess = (index) => {

    const isWhite = this.chessState === 'WHITE'

    this.chessItems[index] = {
      isFilled: true,
      isWhite,
      isRepent: this.chessItems[index].isRepent,
      position: this.chessItems[index].position,
      orderIndex: this.chessItems.filter((item) => item.orderIndex >= 0).length+1
    }

    this.chessState = isWhite ? 'BLACK' : 'WHITE'

    this.onAnalysisChess()
  }

  @action
  onAnalysisChess = () => {
    // 一共八种情况赢,那就简单点直接遍历: 判断1、5、9三个点就可以
    const hasGoChessItems = this.chessItems.filter((item) => item.orderIndex >= 0)
    if (hasGoChessItems.length >= 5) {

      if (this.isThreeFilled(0, 1, 2)) {
        if (this.isThreeSameColor(0, 1, 2)) {
          this.chessState = this.chessItems[0].isWhite ? 'WHITE_END' : 'BLACK_END' // 1. 结束1
          return
        }
      }

      if (this.isThreeFilled(0, 3, 6)) {
        if (this.isThreeSameColor(0, 3, 6)) {
          this.chessState = this.chessItems[0].isWhite ? 'WHITE_END' : 'BLACK_END' // 1. 结束2
          return
        }
      }

      if (this.isThreeFilled(2, 5, 8)) {
        if (this.isThreeSameColor(2, 5, 8)) {
          this.chessState = this.chessItems[8].isWhite ? 'WHITE_END' : 'BLACK_END' // 9. 结束3
          return
        }
      }

      if (this.isThreeFilled(6, 7, 8)) {
        if (this.isThreeSameColor(6, 7, 8)) {
          this.chessState = this.chessItems[8].isWhite ? 'WHITE_END' : 'BLACK_END' // 9. 结束4
          return
        }
      }

      if (this.isThreeFilled(1, 4, 7)) {
        if (this.isThreeSameColor(1, 4, 7)) {
          this.chessState = this.chessItems[4].isWhite ? 'WHITE_END' : 'BLACK_END' // 5. 结束5
          return
        }
      }

      if (this.isThreeFilled(3, 4, 5)) {
        if (this.isThreeSameColor(3, 4, 5)) {
          this.chessState = this.chessItems[4].isWhite ? 'WHITE_END' : 'BLACK_END' // 5. 结束6
          return
        }
      }

      if (this.isThreeFilled(0, 4, 8)) {
        if (this.isThreeSameColor(0, 4, 8)) {
          this.chessState = this.chessItems[4].isWhite ? 'WHITE_END' : 'BLACK_END' // 5. 结束7
          return
        }
      }

      if (this.isThreeFilled(2, 4, 6)) {
        if (this.isThreeSameColor(2, 4, 6)) {
          this.chessState = this.chessItems[4].isWhite ? 'WHITE_END' : 'BLACK_END' // 5. 结束8
          return
        }
      }

      if (hasGoChessItems.length === 9 && (this.chessState !== 'WHITE_END' || this.chessState !== 'BLACK_END')) {
        this.chessState = 'TIE'  // 平局
        return
      }
    }

  }

  isThreeFilled = (index1,index2,index3) => {
    const chessItems = this.chessItems
    return chessItems[index1].isFilled && chessItems[index2].isFilled && chessItems[index3].isFilled
  }

  isThreeSameColor = (index1,index2,index3) => {
    const chessItems = this.chessItems
    return chessItems[index1].isWhite === chessItems[index2].isWhite && chessItems[index1].isWhite === chessItems[index3].isWhite
  }

  @action
  setSelectModalState = (isSelectModalState) => {
    this.isSelectModalState = isSelectModalState
  }

  @action
  resetChess = () => {
    this.chessState = 'NO_START'
    this.chessItems = originChessItems
    this.isSelectModalState = 0
  }

  @action
  repentChess = () => {
    //悔棋
    const hasGoChessItems = this.chessItems.filter((item) => item.orderIndex >= 0)
    if(hasGoChessItems.length > 0) {
      const position = this.chessItems.filter((item) => item.orderIndex === hasGoChessItems.length)[0].position
      this.chessState = this.chessItems[position-1].isWhite ? 'WHITE' : 'BLACK'
      this.chessItems[position-1] = {
        isFilled: false,
        isWhite: false,
        isRepent: true,
        position: position,
        orderIndex: -1
      }
    }
  }

  @action
  compoundChess = () => {

    const curChessItems = this.chessItems
      .filter((item) => item.orderIndex >= 0)
      .sort((itemA,itemB) => itemA.orderIndex-itemB.orderIndex)
      .map((item)=> ({...item}))

    if (curChessItems.length <= 0) {
      return
    }

    this.isHasCompound = true

    this.chessState = 'NO_START'
    this.chessItems = originChessItems

    let curIndex = -1
    this.compoundInterval = setInterval(()=>{
      if(curIndex === -1) {
        this.chessState = curChessItems[0].isWhite ? 'WHITE' : 'BLACK'
      } else if (curIndex < curChessItems.length) {
        this.goChess(curChessItems[curIndex].position-1)
      } else {
        this.isHasCompound = false
        if (this.compoundInterval) clearInterval(this.compoundInterval)
      }
      curIndex++;
    },3000)

  }

  @action
  sureSelectModalState = () => {
    // 反正重复点击
    if (this.selectInterval) {
      return
    }
    switch (this.isSelectModalState) {
      case 0:
        this.chessState = 'BLACK'
        this.isSelectModalState = -1
        break
      case 1:
        this.chessState = 'WHITE'
        this.isSelectModalState = -1
        break
      case 2:
        this.selectIntervalTemp = 0
        const randomFreq = Math.floor(Math.random()*5+5)
        this.selectInterval = setInterval(()=>{
          if (this.isSelectModalState == 0) {
            this.isSelectModalState = 1
          } else {
            this.isSelectModalState = 0
          }
          this.selectIntervalTemp = this.selectIntervalTemp + 1
          if (this.selectIntervalTemp == randomFreq) {
            clearInterval(this.selectInterval)
            this.selectInterval = null
            if (randomFreq%2 == 0) {
              this.chessState = 'BLACK'
            } else {
              this.chessState = 'WHITE'
            }
            this.isSelectModalState = -1
          }
        },600)
        break
    }
  }

}

const chessStore = new ChessStore()

export default chessStore
