// Write JavaScript here and press Ctrl+Enter to execute
class HelloButton extends React.Component {
	render(){
  	return(
    	<button onClick={alert}>hello {this.props.incrementValue}</button>
    )
  }
}

const Result = (props) => {
	return(
  	<div>{props.counter}</div>
  );
}

class App extends React.Component {
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