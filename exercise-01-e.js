// Write JavaScript here and press Ctrl+Enter to execute
class HelloButton extends React.Component {
	
  handleClick = () => {
    	alert();
  }
    
  render(){
  	return(
    	<button onClick={this.props.onClickFunction}>{this.props.incrementValue}</button>
    )
  }
}

const Result = (props) => {
	return(
  	<div>{props.counter}</div>
  );
}

class App extends React.Component {
	
  state = {counter: 33};
  
  incrementCounter =() => {
  	this.setState((prevState) => ({
    	counter: 5
    }));
  }

	render(){
		return (
    <div>
    	<HelloButton onClickFunction={this.incrementCounter} incrementValue={5} />
      <HelloButton incrementValue={15} />
      <Result counter={this.state.counter}/>
    </div>
    );
	}
}

ReactDOM.render(<App />, mountNode)

