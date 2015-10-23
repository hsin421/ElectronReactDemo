import React from 'react';

const { arrayOf, func, number, oneOfType, string } = React.PropTypes

const component = oneOfType([ string, func ])

export default class PinnedToBottom extends React.Component {

  static propTypes = {
    component: component.isRequired,
    tolerance: number.isRequired
  }

  static defaultProps = {
    component: 'div',
    tolerance: 1500
  }

  scrollToBottom() {
    let node = React.findDOMNode(this)
    document.body.scrollTop = node.scrollHeight
  }

  adjustScrollPosition() {
    if (this.pinToBottom)
      this.scrollToBottom()
  }

  componentWillMount() {
    this.pinToBottom = true
  }

  componentDidMount() {
    this.adjustScrollPosition()
  }

  componentWillUpdate() {
    let node = React.findDOMNode(this)
    let { clientHeight, scrollHeight, scrollTop } = node
    this.pinToBottom = (scrollHeight - document.body.scrollTop) < this.props.tolerance
  }

  componentDidUpdate() {
    this.adjustScrollPosition()
  }

  render() {
    let { children, component, style } = this.props

    return React.createElement(component, {
      style: { ...style, overflowY: 'scroll' },
      children
    })
  }

}