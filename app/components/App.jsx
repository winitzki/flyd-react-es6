import React from 'react'
import F from 'flyd'
import {model_stream, input_stream, UserClickT} from '../model'

const toggle_input = () => input_stream(UserClickT.Toggle())

export default class App extends React.Component {

  componentWillMount() { // boilerplate
    F.on(s => this.setState(s), model_stream)
  }

  render() {
    return <div>
      <input type="checkbox" value="box1" checked={this.state.checked} onChange={toggle_input}></input>
      {(this.state.checked) ? <div>text is shown</div> : null}
    </div>
  }

}
