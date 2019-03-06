# 南瓜棋

> 使用Taro开发一款游戏，支持（微信/百度/支付宝/字节跳动小程序、H5、React-Native） 等。

### 运行
- 1. 今日项目目录：cd pumpkinchess
- 2. 运行：
	- H5: npm run dev:h5
	- 微信小程序：npm run dev:weapp
	- 支付宝：npm run dev:alipay 导入时倒入dist
	- 今日头条: npm run dev:tt 导入时倒入dist
	- 其他为测试
- 3. [更多详情](https://nervjs.github.io/taro/docs/GETTING-STARTED.html)

### 测试过的有

✅ H5

✅ 微信小程序

✅ 支付宝小程序

✅ 今日头条小程序


### 运行结果
![](https://user-gold-cdn.xitu.io/2019/3/5/1694cf12270c60e2?w=562&h=1202&f=png&s=51483) 
![](https://user-gold-cdn.xitu.io/2019/3/5/1694cf18cde40b44?w=560&h=1200&f=png&s=65926)
![](https://user-gold-cdn.xitu.io/2019/3/5/1694cf1b134440ae?w=568&h=1208&f=png&s=120493)
![](https://user-gold-cdn.xitu.io/2019/3/5/1694cf1c445cf3b6?w=570&h=1192&f=png&s=107769)

### 代码注意事项
- 1. 由于之前以为在H5上运行，其他地方样式就一样，可是后面发现不行，所以样式用的内联样式，建议大家用css、less、scss这样H5和其他端样式应该一样。
- 2. 有些命名不能用例如Mobx里store里的方法@action不能以on开发，微信小程序就调不懂。
- 3. 今日头条小程序打包后有问题确实了project.config.json,反正我这边编译后导入不了，我新建了一个project.config.json复制过去，可能是这个原因导致下面的UI不见了。
- 4. 我这边测试来了正常: H5、微信小程序、支付宝小程序,编译后缺少东西但可以运行：今日头条小程序，其他的没测试太耗时。

