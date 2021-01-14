function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max-min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < arr.length; i++){
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
    // let t = arr[i]
    // arr[i] = arr[j]
    // arr[j] = t
  }
  return _arr
  // return arr
}

// 节流 简单说就是在我不断地触发事件的时候别老是发请求，发一次就够了
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}