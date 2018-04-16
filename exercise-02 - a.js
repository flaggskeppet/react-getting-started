const Card = () => {
	return (
  	<div className="github-card clearfix">
    
  )
}

class Form extends React.Component {
state = { 
    userName: "stevemao"
  };

	render(){
  return (
  	<form>
    <input value={this.state.userName}/>
    <button type="submit">Add card </button>
    </form>
  );
  }
}

class App extends React.Component {
	render(){
  	return (
    <div>
      <Form addNewCard={this.addNewCard} />
    </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);