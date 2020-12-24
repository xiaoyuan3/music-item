
export function getData(el, name, val) {
  const prefix = 'data-'
  const Myname = prefix + name
  if (val) {
    return el.setAttribute(Myname, val)
  }
  return el.getAttribute(Myname)
}