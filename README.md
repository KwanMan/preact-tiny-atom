# preact-tiny-atom

Integrate [tiny-atom](https://github.com/qubitproducts/tiny-atom) into [preact](https://github.com/developit/preact)

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
  // Pass an array of keys to grab from the top level state
  grab: ['counts'],
  // Or an object of key/computer pairs to compute
  compute: {
    // Each computer will be given the atom state
    totalCount: state => state.counts.reduce((memo, nextCount) => {
      return memo + nextCount
    }, 0)
    // Or you can pass in an object path string
    firstCount: 'counts.0'
  }
})

// Everything will be passed into the props for your component
const App = function App ({ counts, totalCount, firstCount }) {
  return (
    <div>
      <p>Counts: [{counts.join(', ')}]</p>
      <p>Total: {totalCount}</p>
      <p>First Count: {firstCount}</p>
    </div>
  )
}

module.exports = withAtom(App)
```
