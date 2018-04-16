// Write JavaScript here and press Ctrl+Enter to execute
class HelloButton extends React.Component {
	
  handleClick = () => {
    	alert();
  }
    
  render(){
  	return(
    	<button onClick={this.handleClick}>{this.props.incrementValue}</button>
    )
  }
}

const Result = (props) => {
	return(
  	<div>{props.counter}</div>
  );
}

class App extends React.Component {
	
  state = {counter: 0};

	render(){
		return (
    <div>
    	<HelloButton incrementValue={5} />
      <HelloButton incrementValue={15} />
      <Result counter={12}/>
    </div>
    );
	}
}

ReactDOM.render(<App />, mountNode)

