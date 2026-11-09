// Start page and game share "/", so a reload after signing in or out should
// not restore the old page's scroll position
export const reloadAtTop = () => {
  window.scrollTo({ top: 0, behavior: "instant" })
  window.location.reload()
}
