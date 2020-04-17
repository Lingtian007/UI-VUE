/**
 * description：公共函数库
 * author:徐雍文
 * date:2017-08-07
 * @class CommonWay
 */
class CommonWay {
//   constructor () {}

  addEventOnResize (fn) {
    var originFn = window.onresize
    window.onresize = function () {
      originFn && originFn()
      fn()
    }
  }
}

export default CommonWay
