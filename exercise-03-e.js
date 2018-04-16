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
  	if(props.selectedNumbers.includes(number)){
    	return 'selected'
    }  
  }
  
  return(
  <div className="card text-center">
    <div>{
    arrayOfNumbers.map((number, i) => 
    <span className={numberClassName(number)}
    			onClick={()=> props.selectNumber(number)}
    >
    {number}
  			
    </span>)
    }
    </div>
  </div>
  )
} 

class Game extends React.Component {
	state = {
  	selectedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
  };
  
  selectNumber = (clickedNumber) => {
  	if(this.state.selectedNumbers.includes(clickedNumber)) return;
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)    
    })); 
  }
  
  render() {
  	// <h3>Play Nine</h3>
    return(
    	<div className="container">
  	    <hr />
    	  <div className="row">
        	<Stars numberOfStars={this.state.randomNumberOfStars} />
      		<Button />
      		<Answer selectedNumbers={this.state.selectedNumbers} />
        </div>
        <br />
      <Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber} />  
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
cursor: not-allowed;
}

.used {
background-color: #aaddaa;
color: #99bb99;
}
*/