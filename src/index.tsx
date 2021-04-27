import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from 'react-router-dom'
import { history } from 'lib/history'

import { setLogger } from 'lib/effector-logger'

import 'antd/dist/antd.css'

import Application from './application'
// import './init'

const rootReact = document.querySelector('#root')

/* SET EFFECTOR DEV LOGGER */
setLogger()

if (!rootReact) {
  throw new Error("Can't find root element")
}

function render(): void {
  ReactDOM.render(
    <Router history={history}>
      <Application />
    </Router>,
    rootReact
  )
}

// if (module.hot) {
//   module.hot.accept()
// }

render()
