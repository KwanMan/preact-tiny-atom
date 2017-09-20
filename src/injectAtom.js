const preact = require('preact')
const get = require('slapdash/src/get')

module.exports = ({ grab = [], compute = {} }) => {
  return WrappedComponent => {
    return (props, { atom }) => {
      const grabbed = grabValues(grab, atom)
      const computed = computeValues(compute, atom, props)
      const allProps = {
        ...props,
        ...grabbed,
        ...computed
      }
      return preact.h(WrappedComponent, allProps)
    }
  }
}

function grabValues (grab, atom) {
  const state = atom.get()
  return grab.reduce((grabbed, toGrab) => {
    grabbed[toGrab] = state[toGrab]
    return grabbed
  }, {})
}

function computeValues (compute, atom, props) {
  const state = atom.get()
  return Object.keys(compute).reduce((computed, key) => {
    const computer = compute[key]
    if (typeof computer === 'string') {
      computed[key] = get(state, computer)
    } else {
      computed[key] = computer(state, props)
    }
    return computed
  }, {})
}
