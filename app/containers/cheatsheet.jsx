// cheatsheet

// sendMessage('room', 'username', avatar_url, message)
// subscribeToMessages('room', callback);

// MessageListItem (props: authoredByViwer, message)

// return (
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

//MessageList (props: auth, messages)

// return <MessageListItem
//         key={index}
//         authoredByViewer={message.username === viewerUsername}
//         message={message}
//       />;

// return (
//       <ol className="message-list">
//         {items}
//       </ol>
//     );

// Room (props: auth; state: messages: [], newMessage: '')

// return (
//       <div className="room">
//         <h1 className="room-title">NYCDA</h1>
//           <div className="messages" >
//             <PinnedToBottom>
//               <MessageList auth={auth} messages={messages} />
//             </PinnedToBottom>
//           </div>
//             <div className="new-message">
//               <input 
//                 type="text" 
//                 placeholder="Type your message here..." 
//                 value={this.state.newMessage} 
//                 onChange={this.handleInput}
//                 onKeyDown={this.handleKeyDown} />
//             </div>
//       </div>
//     );

// Chat (state: auth: null, usernameInput: '')

// if (auth == null)
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
