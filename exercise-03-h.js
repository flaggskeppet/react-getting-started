// START AT: Accepting an answer

const Stars = ({numberOfStars}) => {
  return (
      <div className="col-5">
        {_.range(numberOfStars).map(i => <i key={i} className="fa fa-star"></i>)}
      </div>
    );
}

const Button = (props) => {
	let button;
  switch(props.answerIsCorrect){
  	case true:
    	button = <button className="btn btn-success"><i className="fa fa-check" /></button>
    	break;
    case false:
    	button = <button className="btn btn-danger"><i className="fa fa-times" /></button>
    	break;
    default:
    	button = <button onClick={props.checkAnswer} className="btn" disabled={!props.selectedNumbers.length}>=</button>
    	break;
  }

  return (
      <div className="col-2">
      {button}
      </div>
    );
}

const Answer = (props) => {
  return (
      <div className="col-5">
      {props.selectedNumbers.map((number, i) => 
      <span key={i} onClick={() => props.unSelectNumber(number)}>{number}</span>
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
    >{number}</span>)
    }
    </div>
  </div>
  )
} 

class Game extends React.Component {
	state = {
  	selectedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
    answerIsCorrect: null,
  };
  
  selectNumber = (clickedNumber) => {
  	if(this.state.selectedNumbers.includes(clickedNumber)) return;
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)    
    })); 
  }
  
  unSelectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  }
  
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  }
  
  render() {
  	const {selectedNumbers, randomNumberOfStars, answerIsCorrect} = this.state;
  	// <h3>Play Nine</h3>
    return(
    	<div className="container">
  	    <hr />
    	  <div className="row">
        	<Stars numberOfStars={randomNumberOfStars} />
      		<Button selectedNumbers={selectedNumbers} checkAnswer={this.checkAnswer} answerIsCorrect={answerIsCorrect} />
      		<Answer selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber} />
        </div>
        <br />
      <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} />  
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