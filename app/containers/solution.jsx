import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import PinnedToBottom from './PinnedToBottom';

var sortBy = require('sort-by');
var { sendMessage, subscribeToMessages } = require('../utils/ChatUtils');

require('./style.css');

class MessageListItem extends React.Component{

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

};

class MessageList extends React.Component{

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

};


class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: null,
      usernameInput: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleGo = this.handleGo.bind(this);
  }

  handleInput(e) {
    this.setState({usernameInput: e.target.value});
  }

  handleGo(){
    $.get('https://api.github.com/users/' + this.state.usernameInput, 
      data => this.setState({auth: {username: data.name, avatar: data.avatar_url}}))
  }

  render() {
    var { auth } = this.state;

    if (auth == null)
      return (
        <div>
          <p>Please Log In...</p> 
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

};

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      newMessage: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    subscribeToMessages('NYCDA', (messages) => {
      this.setState({ messages });
    });
  }

  handleInput(event) {
    event.preventDefault();

    this.setState({newMessage: event.target.value});

  }

  handleKeyDown(event) {
    if (event.key === 'Enter' && this.state.newMessage != '') {
      var username = this.props.auth.username;
      var avatar = this.props.auth.avatar;;
      sendMessage('NYCDA', username, avatar, this.state.newMessage);
      this.setState({newMessage: ''});  
    }
  }

  render() {
    var { auth } = this.props;
    var { messages } = this.state;

    return (
      <div className="room">
        <h1 className="room-title">NYCDA</h1>
          <div className="messages" >
            <PinnedToBottom>
              <MessageList auth={auth} messages={messages} />
            </PinnedToBottom>
          </div>
            <div className="new-message">
              <input 
                type="text" 
                placeholder="Type your message here..." 
                value={this.state.newMessage} 
                onChange={this.handleInput}
                onKeyDown={this.handleKeyDown} />
            </div>
      </div>
    );
  }

};

export default Chat;



// var sortBy = require('sort-by');
// var escapeRegExp = require('../utils/escapeRegExp');
// var { login, sendMessage, subscribeToChannels, subscribeToMessages } = require('../utils/ChatUtils');

// require('./style.css');

// var { arrayOf, shape, string, number, object, func, bool } = React.PropTypes;

// var message = shape({
//   timestamp: number.isRequired,
//   username: string.isRequired,
//   text: string.isRequired
// });

// var MessageListItem = React.createClass({

//   propTypes: {
//     authoredByViewer: bool.isRequired,
//     message: message.isRequired,
//     avatar: string
//   },

//   render() {
//     var { authoredByViewer, message } = this.props;
//     var className = 'message';

//     if (authoredByViewer)
//       className += ' own-message';

//     return (
//       <li className={className}>
//         <div className="message-avatar">
//           <img src={message.avatar} width="40"/>
//         </div>
//         <div className="message-content">
//           <div className="message-username">
//             {message.username}
//           </div>
//           <div className="message-text">{message.text}</div>
//         </div>
//       </li>
//     );
//   }

// });

// var MessageList = React.createClass({

//   propTypes: {
//     auth: object.isRequired,
//     messages: arrayOf(message).isRequired
//   },

//   render() {
//     var { auth, messages } = this.props;

//     var viewerUsername = this.props.auth.username;
//     var items = messages.sort(sortBy('timestamp')).map((message, index) => {
//       return <MessageListItem
//         key={index}
//         authoredByViewer={message.username === viewerUsername}
//         message={message}
//       />;
//     });

//     return (
//       <ol className="message-list">
//         {items}
//       </ol>
//     );
//   }

// });

// var HiddenSubmitButton = React.createClass({

//   render() {
//     var style = {
//       position: 'absolute',
//       left: -9999,
//       width: 1,
//       height: 1
//     };

//     return (
//       <input type="submit" style={style} tabIndex="-1" />
//     );
//   }

// });

// var ChannelList = React.createClass({

//   getInitialState() {
//     return {
//       channels: []
//     };
//   },

//   componentDidMount() {
//     subscribeToChannels((channels) => {
//       this.setState({ channels });
//     });
//   },

//   render() {
//     var defaultChannels = [{ _key: 'general' }];
//     var channels = this.state.channels.length ?
//       this.state.channels : defaultChannels;
//     return (
//       <div className="channels">
//         <ul>
//           {channels.map(channel => (
//             <li key={channel._key}>
//               <Link to={"/"+channel._key}>{channel._key}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

// });

// var Chat = React.createClass({

//   getInitialState() {
//     return {
//       auth: null,
//       usernameInput: '',
//       channels: null
//     };
//   },

//   componentDidMount() {
//     login((error, auth) => {
//       if (error) {
//         console.log(error);
//       } else {
//         this.setState({ auth });
//       }
//     });
//   },

//   handleInput(e) {
//     this.setState({usernameInput: e.target.value});
//   },

//   handleGo(){
//     $.get('https://api.github.com/users/' + this.state.usernameInput, 
//       data => this.setState({auth: {username: data.name, avatar: data.avatar_url}}))
//   },

//   render() {
//     var { auth } = this.state;

//     if (auth == null)
//       return (
//         <div>
//           <p>Please Logg In...</p> 
//           <label>Enter Github User Name</label>
//           <input onChange={this.handleInput} />
//           <button onClick={this.handleGo}>Go</button>
//         </div>);

//     return (
//       <div className="chat">
//         <Room auth={auth}/>
//       </div>
//     );
//   }

// });

// var Room = React.createClass({

//   propTypes: {
//     auth: React.PropTypes.object
//   },

//   getInitialState() {
//     return {
//       messages: []
//     };
//   },

//   componentWillMount() {
//     this.unsubscribe = null;
//     this.pinToBottom = true;
//   },

//   componentDidMount() {
//     this.subscribeToMessages('general');
//   },

//   componentWillReceiveProps(nextProps) {
//     this.subscribeToMessages(nextProps.params.room);
//   },

//   subscribeToMessages(room) {
//     if (this.unsubscribe)
//       this.unsubscribe();

//     this.unsubscribe = subscribeToMessages(room, (messages) => {
//       this.setState({ messages });
//     });
//   },

//   handleSubmit(event) {
//     event.preventDefault();

//     var messageTextNode = React.findDOMNode(this.refs.messageText);
//     var messageText = messageTextNode.value;
//     messageTextNode.value = '';

//     var username = this.props.auth.username;
//     var avatar = this.props.auth.avatar;;

//     this.pinToBottom = true;
//     sendMessage('general', username, avatar, messageText);
//   },

//   handleScroll(event) {
//     var node = event.target;
//     var { clientHeight, scrollTop, scrollHeight } = node;

//     this.pinToBottom = clientHeight + scrollTop > (scrollHeight - 10);
//   },

//   componentDidUpdate() {
//     var node = React.findDOMNode(this.refs.messages);

//     if (node && this.pinToBottom)
//       node.scrollTop = node.scrollHeight;
//   },

//   render() {
//     var { auth } = this.props;
//     var { messages } = this.state;

//     return (
//       <div className="room">
//         <h1 className="room-title">general</h1>
//         <div ref="messages" className="messages" onScroll={this.handleScroll}>
//           <MessageList auth={auth} messages={messages} />
//         </div>
//         <form className="new-message-form" onSubmit={this.handleSubmit}>
//           <div className="new-message">
//             <input ref="messageText" type="text" placeholder="Type your message here..." />
//             <HiddenSubmitButton />
//           </div>
//         </form>
//       </div>
//     );
//   }

// });

// export default Chat;

// For Production Babel Config

// {
//   "stage": 0,
//   "env": {
//     "development": {
//       "plugins": [],
//       "extra": {
      
//       }
//     }
//   }
// }

