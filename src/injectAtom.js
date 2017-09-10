const preact = require('preact')

module.exports = ({ grab = [], compute = {} }) => {
  return WrappedComponent => {
    return (props, { atom }) => {
      const grabbed = grabValues(grab, atom)
      const computed = computeValues(compute, atom, props)
      const allProps = Object.assign({}, props, grabbed, computed)
      return preact.h(WrappedComponent, allProps)
    }
  }
}

function grabValues (grab, atom) {
  const state = atom.get()
  const grabbed = {}
  grab.forEach(toGrab => {
    grabbed[toGrab] = state[toGrab]
  })
  return grabbed
}

function computeValues (compute, atom, props) {
  const state = atom.get()
  const computed = {}
  Object.keys(compute).forEach(key => {
    const computer = compute[key]
    computed[key] = computer(state, props)
  })
  return computed
}
