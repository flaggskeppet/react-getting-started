/*
static randomNumber = ... Shows how to define a static method on a class (for logic that is not dependant on state).

The usage of doneStatus in Game.render shows how to use the ternary operator for conditional rendering

The invocation of updateDoneStatus shows how to invoke a function after setState has set all the states.
The signature is setState(prevState => {

}, someFunc)


*/

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
return(
  	<div className="col-5">
    { _.range(numberOfStars).map(num => <i className="fa fa-star" key={num}/>)  }
    </div>
  );
}

const Button = ({selectedNumbers, answerIsCorrect, checkAnswer, acceptAnswer, redraw, redraws}) => {
	let button;
  switch(answerIsCorrect){
  	case true:
    	button = <button className="btn btn-success" onClick={acceptAnswer}><i className="fa fa-check"></i></button>
      break;
    case false:
      button = <button className="btn btn-danger"><i className="fa fa-times"></i></button>
      break;
    default:
    	button = <button className="btn" onClick={checkAnswer} disabled={selectedNumbers.length === 0}>=</button>
      break;
  }

	return(
  	<div  className="col-2 text-center">
    	{button}
      <br/><br/>
      <button className="btn btn-warning btn-sm" 
      				disabled={redraws === 0}
      				onClick={redraw}>
              <i className="fa fa-refresh"></i>&nbsp;{redraws}
      </button>
    </div>
  );
}

const Answer = ({selectedNumbers, unSelectNumber}) => {
	return(
  	<div className="col-5">
    {selectedNumbers.map((number, index) => <span onClick={() => unSelectNumber(number)} key={index}>{number}</span>)}
    </div>
  );
}

const Numbers = (props) => {
	const getClassName = number => {
    if (props.usedNumbers.includes(number)) return 'used';
    if (props.selectedNumbers.includes(number)) return 'selected';
  }

	return(
  	<div className="card text-center">
    	<div>
      {Numbers.list.map((number, index) => 
      	<span key={index} 
        			onClick={() => {props.selectNumber(number)}} 
              className={getClassName(number)}>
        	{number}
        </span>)}
    	</div>
    </div>
  );
}

Numbers.list =  _.range(1,10);

const DoneFrame = ({doneStatus}) => {
	return(
  	<div className="text-center">
  	  <h2>{doneStatus}</h2>
  	</div>
  )
}

class Game extends React.Component {
	static randomNumber = () => 1 + Math.floor(Math.random() * 9)
	state = {
  	selectedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: null,
  }
  
  selectNumber = (number) => {
  	if(this.state.selectedNumbers.includes(number)) return;
  	this.setState(prevState =>({
    	answerIsCorrect:null,
    	selectedNumbers: prevState.selectedNumbers.concat(number),
    }));
  }
  
  unSelectNumber = (number) => {
  	this.setState(prevState =>({
    	answerIsCorrect:null,
    	selectedNumbers: prevState.selectedNumbers.filter(selectedNumber => number !== selectedNumber),
    }));
  }
  
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.selectedNumbers.reduce((acc, n) => acc + n, 0) === prevState.numberOfStars,
    }));
  }
  
  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      answerIsCorrect: null,
      selectedNumbers: [],
      numberOfStars: Game.randomNumber(),
    }), this.updateDoneStatus);
  }
  
  redraw = () => {
  	if(this.state.redraws === 0) return;
    this.setState(prevState => ({
    	numberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      selectedNumbers: [],
      redraws: prevState.redraws - 1,
    }), this.updateDoneStatus);
  }
  
   possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
  	const possibleNumbers = _.range(1,10).filter(number => 
    	usedNumbers.indexOf(number) === -1)
      
    return possibleCombinationSum(possibleNumbers, randomNumberOfStars)
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
  
  render(){
  	const {
    	numberOfStars, 
      selectedNumbers, 
      answerIsCorrect, 
      usedNumbers,
      redraws,
      doneStatus,
      } = this.state;
  	
    return(
    <div className="container">
    	<h3>Play nine</h3>
      <hr />
      <div className="row">
        <Stars numberOfStars={numberOfStars}/>
        <Button selectedNumbers={selectedNumbers}
        				checkAnswer={this.checkAnswer}
        				answerIsCorrect={answerIsCorrect}
                acceptAnswer={this.acceptAnswer}
                redraw={this.redraw}
                redraws={redraws}
                />
        <Answer selectedNumbers={selectedNumbers}
              	unSelectNumber={this.unSelectNumber}
              	/>
    	</div>
      <br/>
     
   { doneStatus ?  <DoneFrame doneStatus={doneStatus} /> :
     <Numbers selectedNumbers={selectedNumbers}
     					selectNumber={this.selectNumber}
              usedNumbers={usedNumbers}
              />}
    </div>
      );
  }
}

class App extends React.Component {
	render(){
  	return(<Game/>)
  }
}

ReactDOM.render(<App />, mountNode);