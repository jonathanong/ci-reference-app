
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { featureFlags } from '../../feature-flags'
import './index.css'

export default class SubmitShaForm extends PureComponent {
  static propTypes = {
    shas: PropTypes.array,
    createSha: PropTypes.func
  }

  state = {
    text: ''
  }

  onTextChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.props.createSha(this.state.text)
    this.setState({
      text: ''
    })
  }

  render () {
    return (
      <form className={classNames(featureFlags.redTable && 'red-table')} onSubmit={this.onSubmit}>
        <input type='text' value={this.state.text} onChange={this.onTextChange} required />
        <button type='submit'>Submit</button>

        <table>
          <thead>
            <tr><th>Shas</th></tr>
          </thead>
          <tbody>{
            this.props.shas.map((x, i) => <tr key={i}><td>{x}</td></tr>)
          }</tbody>
        </table>
      </form>
    )
  }
}
