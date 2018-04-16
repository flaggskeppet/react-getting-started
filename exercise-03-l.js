var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

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
    	button = <button className="btn btn-success" onClick={props.acceptAnswer}><i className="fa fa-check" /></button>
    	break;
    case false:
    	button = <button className="btn btn-danger"><i className="fa fa-times" /></button>
    	break;
    default:
    	button = <button onClick={props.checkAnswer} className="btn" disabled={!props.selectedNumbers.length}>=</button>
    	break;
  }

  return (
      <div className="col-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning btn-sm" 
      				disabled={props.redraws === 0}  
              onClick={props.redraw}>
              <i className="fa fa-refresh"/> {props.redraws}</button>
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
  	if(props.usedNumbers.includes(number)){ return 'used' }  
    if(props.selectedNumbers.includes(number)){ return 'selected' }  
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

const DoneFrame = (props) => {
	return (
  	<div className="text-center">
  	  <h2>{props.doneStatus}</h2>
  	</div>
  );
}

class Game extends React.Component {
	static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  
	state = {
  	selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    usedNumbers: [],
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: 'Game over!',
  };
  
  selectNumber = (clickedNumber) => {
  	if(this.state.selectedNumbers.includes(clickedNumber)) return;
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)    
    })); 
  }
  
  unSelectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  }
  
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  }
  
  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect:null,
      randomNumberOfStars: Game.randomNumber(),
    }), this.updateDoneStatus);
  }
  
  redraw = () => {
  	if(this.state.redraws === 0) return;
  	this.setState(prevState => ({
    	randomNumberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      selectedNumbers: [],
      redraws: prevState.redraws -1
    }), this.updateDoneStatus);
  }
  
  possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
  	const possibleNumbers = _.range(1,10).filter(number => 
    	usedNumbers.indexOf(number) === -1)
      
    return possibleCombinationsSum(possibleNumbers, randomNumberOfStars)
  	  	
  }
  
  updateDoneStatus = () => {
  	this.setState(prevState => {
    	if(prevState.usedNumbers.length === 9){
      	return({doneStatus: 'Done. Nice!'});
      }
      if(prevState.redraws === 0 && !this.possibleSolutions(prevState)){
      	return({doneStatus: 'Game over!'})
      }
    });
  }
  
  render() {
  	const {selectedNumbers, randomNumberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus} = this.state;
  	// <h3>Play Nine</h3>
    return(
    	<div className="container">
  	    <hr />
    	  <div className="row">
        	<Stars numberOfStars={randomNumberOfStars} />
      		<Button selectedNumbers={selectedNumbers} 
          				redraws={redraws}
          				checkAnswer={this.checkAnswer} 
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}
                  answerIsCorrect={answerIsCorrect} />
      		<Answer selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber} />
        </div>
        <br />
        {doneStatus ?
        <DoneFrame doneStatus={doneStatus} /> :
        <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers} />  
        }
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