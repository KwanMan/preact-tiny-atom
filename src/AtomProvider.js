const preact = require('preact')

module.exports = class AtomProvider extends preact.Component {
  constructor (props) {
    super(props)
    this.atom = props.atom
  }
  getChildContext () {
    return { atom: this.atom }
  }
  render ({ children }) {
    return children[0]
  }
}
