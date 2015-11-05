import React from 'react'
import F from 'flyd'

const messageText = 'Text is shown'

const initModelState = { checked: true }

const checkboxInputToggle = F.stream()
const checkboxStream = F.scan( (c, _) => !c, false, checkboxInputToggle)

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = initModelState
  }

  componentDidMount() {
    checkboxStream.map(c => this.setState({ checked: c }))
  }

  render() {
    return <div>
      <input type="checkbox" value="box1" checked={this.state.checked} onChange={checkboxInputToggle}></input>
      {(this.state.checked) ? <div>{messageText}</div> : <div/>}
    </div>
  }

}
