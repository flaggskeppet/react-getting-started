const Card = (props) => {
	return (
  	<div className="github-card clearfix">
     <img src={props.avatar_url} />
      <div className="github-profile">
        <div className="github-name"><a href="" target="_blank">{props.name}</a></div>
        <div className="github-location">Sweden</div>
      </div>
    </div>
  );
}

const CardList = (props) => {
	return(
  	<div>
    {props.cards.map((card) => <Card {...card} />)}
  	</div>
  );
}

class Form extends React.Component {
state = { 
    userName: "stevemao"
  };
  
  handleSubmit =(event) => {
  	event.preventDefault();
    this.props.addNewCard();
  	
  }

	render(){
  return (
  	<form onSubmit={this.handleSubmit}>
    <input value={this.state.userName}/>
    <button type="submit">Add card </button>
    </form>
  );
  }
}

class App extends React.Component {
state = {
	cards: []
}

addNewCard = () => {
	this.setState((prevState) =>{
  	return {cards: prevState.cards.concat({name:'Jonas', location: 'Sweden'})}
  })
}

	render(){
  	return (
    <div>
      <Form addNewCard={this.addNewCard} />
      <CardList cards={this.state.cards}/>
    </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);