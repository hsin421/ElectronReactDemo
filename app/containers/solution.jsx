import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

var sortBy = require('sort-by');
var escapeRegExp = require('../utils/escapeRegExp');
var { login, sendMessage, subscribeToChannels, subscribeToMessages } = require('../utils/ChatUtils');

require('./style.css');

var MessageListItem = React.createClass({

  render() {
    var { authoredByViewer, message } = this.props;
    var className = 'message';

    if (authoredByViewer)
      className += ' own-message';

    return (
      <li className={className}>
        <div className="message-avatar">
          <img src={message.avatar} width="40"/>
        </div>
        <div className="message-content">
          <div className="message-username">
            {message.username}
          </div>
          <div className="message-text">{message.text}</div>
        </div>
      </li>
    );
  }

});

var MessageList = React.createClass({

  render() {
    var { auth, messages } = this.props;

    var viewerUsername = this.props.auth.username;
    var items = messages.sort(sortBy('timestamp')).map((message, index) => {
      return <MessageListItem
        key={index}
        authoredByViewer={message.username === viewerUsername}
        message={message}
      />;
    });

    return (
      <ol className="message-list">
        {items}
      </ol>
    );
  }

});

var HiddenSubmitButton = React.createClass({

  render() {
    var style = {
      position: 'absolute',
      left: -9999,
      width: 1,
      height: 1
    };

    return (
      <input type="submit" style={style} tabIndex="-1" />
    );
  }

});


var Chat = React.createClass({

  getInitialState() {
    return {
      auth: null,
      usernameInput: '',
      channels: null
    };
  },


  handleInput(e) {
    this.setState({usernameInput: e.target.value});
  },

  handleGo(){
    $.get('https://api.github.com/users/' + this.state.usernameInput, 
      data => this.setState({auth: {username: data.name, avatar: data.avatar_url}}))
  },

  render() {
    var { auth } = this.state;

    if (auth == null)
      return (
        <div>
          <p>Please Logg In...</p> 
          <label>Enter Github User Name</label>
          <input onChange={this.handleInput} />
          <button onClick={this.handleGo}>Go</button>
        </div>);

    return (
      <div className="chat">
        <Room auth={auth}/>
      </div>
    );
  }

});

var Room = React.createClass({

  getInitialState() {
    return {
      messages: []
    };
  },

  componentWillMount() {
    this.unsubscribe = null;
    this.pinToBottom = true;
  },

  componentDidMount() {
    this.subscribeToMessages('general');
  },

  subscribeToMessages(room) {
    if (this.unsubscribe)
      this.unsubscribe();

    this.unsubscribe = subscribeToMessages(room, (messages) => {
      this.setState({ messages });
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    var messageTextNode = React.findDOMNode(this.refs.messageText);
    var messageText = messageTextNode.value;
    messageTextNode.value = '';

    var username = this.props.auth.username;
    var avatar = this.props.auth.avatar;;

    this.pinToBottom = true;
    sendMessage('general', username, avatar, messageText);
  },

  componentDidUpdate() {
    var node = React.findDOMNode(this.refs.messages);

    if (node && this.pinToBottom)
      node.scrollTop = node.scrollHeight;
  },

  render() {
    var { auth } = this.props;
    var { messages } = this.state;

    return (
      <div className="room">
        <h1 className="room-title">general</h1>
        <div ref="messages" className="messages" >
          <MessageList auth={auth} messages={messages} />
        </div>
        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <div className="new-message">
            <input ref="messageText" type="text" placeholder="Type your message here..." />
            <HiddenSubmitButton />
          </div>
        </form>
      </div>
    );
  }

});

export default Chat;
