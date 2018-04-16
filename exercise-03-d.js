const Stars = ({numberOfStars}) => {
  return (
      <div className="col-5">
        {_.range(numberOfStars).map(i => <i key={i} className="fa fa-star"></i>)}
      </div>
    );
}

const Button = (props) => {
  return (
      <div className="col-2">
        <button className="btn">=</button>
      </div>
    );
}

const Answer = (props) => {
  return (
      <div className="col-5">
      {props.selectedNumbers.map((number, i) => 
      <span key={i}>{number}</span>
      )}
      </div>
    );
}

const Numbers = (props) => {
	const arrayOfNumbers = _.range(1,10);
  
  const numberClassName =(number) => {
  	if(props.selectedNumbers.indexOf(number) >= 0){
    	return 'selected'
    }  
  }
  
  return(
  <div className="card text-center">
    <div>{
    arrayOfNumbers.map((number, i) => 
    <span className={numberClassName(number)}>{number}</span>)
    }
    </div>
  </div>
  )
} 

class Game extends React.Component {
	state = {
  	selectedNumbers: [2,4]
  };
  
  render() {
  	// <h3>Play Nine</h3>
    return(
    	<div className="container">
  	    <hr />
    	  <div className="row">
        	<Stars numberOfStars={1 + Math.floor(Math.random() * 9)} />
      		<Button />
      		<Answer selectedNumbers={this.state.selectedNumbers} />
        </div>
        <br />
      <Numbers selectedNumbers={this.state.selectedNumbers} />  
      </div>);
  }
}

class App extends React.Component {
	render() {
  	return(
    	<div className="container">
    		<Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);

/*
CSS HERE
#mountNode {
  color: #000;
}

.fa-star{
	margin: 0.5em;
  font-size:24px
}

span {
	display: inline-block;
  margin: 0.5em;
  text-align: center;
  background-color: #ccc;
  width: 24px;
  border-radius: 50%;
  cursor: pointer;
}

.selected {
background-color: #eee;
color: #ddd;
}

.used {
background-color: #aaddaa;
color: #99bb99;
}


*/