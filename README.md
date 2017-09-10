# preact-tiny-atom

Integrate tiny atom into preact

## Usage

Simply wrap your app with the `AtomProvider`:

```js
const preact = require('preact')
const { AtomProvider } = require('preact-tiny-atom')
const createAtom = require('tiny-atom')

const App = require('./App')

const atom = createAtom({
  counts: []
}, evolve, render)

function evolve (get, split, { type, payload }) {
  if (type === 'addCount') {
    const prevCounts = get().counts
    split({
      counts: prevCounts.concat(payload)
    })
  }
}

function render () {
  const root = (
    <AtomProvider atom={atom}>
      <App />
    </AtomProvider>
  )
  preact.render(root, document.body, document.body.firstChild)
}

render()
```

Then for each component where you want to grab something from the state:

```js
// App.js
const preact = require('preact')
const { injectAtom } = require('preact-tiny-atom')

const withAtom = injectAtom({
  // Pass an array of key/computer pairs to grab from the state
  grab: ['counts'],
  // Or an object or keys to compute
  compute: {
    // Each computer will be given the atom state
    totalCount: state => state.counts.reduce((memo, nextCount) => {
      return memo + nextCount
    }, 0)
  }
})

// Everything will be passed into the props for your component
const App = function App ({ counts, totalCount }) {
  return (
    <div>
      <p>Counts: [{counts.join(', ')}]</p>
      <p>Total: {totalCount}</p>
    </div>
  )
}

module.exports = withAtom(App)
```
