import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class HomePageContainer extends React.Component {
  render(){
    return (
      <div>
        <h2>Hello World !!</h2>
        <p> Thanks for coming </p>
        <Link to="about">to About</Link>
      </div>
      )
  }
}

// class HomePageContainer extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {myState: "Hello World", show: true, className: 'hehe'};
//     this.toggleText = this.toggleText.bind(this);
//   }
//   static defaultProps = {

//   }

//   toggleText() {
//     this.setState({show: !this.state.show, className: this.state.className + 'a'});
//   }

    // componentWillMount(){
    //   console.log('Going to mount');
    // }
    // componentDidMount() {
    //   console.log('Already Mounted');
    // }
    // componentWillUpdate() {
    //   console.log('Going to update');
    // }
    // componentDidUpdate(){
    //   console.log('Already updated');
    // }

//   render() {
//     return (
//       <div>
//         <h2 onClick={this.toggleText}>Home Page Yo </h2>
//         <p>{this.state.show ? this.state.myState : 'I am gone'}</p>
//         <p style={this.state.show ? {backgroundColor: 'red'} : {backgroundColor: 'black'}}> Feeling like some coloring </p>
//         <p className={this.state.className}> Wowowowooooo my class name is {this.state.className} </p>
//         <p> <span> plus </span> <span style={{fontSize: '35px', fontWeight: 'bold'}}> 0 </span> <span> minus </span> </p>
//         <p> My parent gave me props <pre style={{fontSize: '50px'}}> {JSON.stringify(this.props)} </pre> </p>
//         <Link to="about">to About</Link>
//       </div>
//     );
//   }

// }

// export default class Example extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {isGreat: false}
//   }

//   render() {
//     return (
//       <div>
//         <HomePageContainer hello="world" question={this.state.isGreat} />
//         <HomePageContainer NYCDA={{isAwesome: true}}/>
//         <HomePageContainer myAge={19} />
//       </div>
//     )
//   }
// } 
