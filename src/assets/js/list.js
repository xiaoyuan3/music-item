
export function getData(el, name, val) {
  const prefix = 'data-'
  // Myname = data-index
  const Myname = prefix + name
  if (val) {
    return el.setAttribute(Myname, val)
  }
  // getAttribute()查询的属性的名字
  console.log(el.getAttribute(Myname));
  return el.getAttribute(Myname)
  
}