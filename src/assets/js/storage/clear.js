function removeSession(name) {
  sessionStorage.removeItem(name)
}
function removeLocal(name) {
  localStorage.removeItem(name)
}

export {
  removeSession,
  removeLocal
}