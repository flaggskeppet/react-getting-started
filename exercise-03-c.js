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
        Answer
      </div>
    );
}

const Numbers = (props) => {
	return(
  <div className="card text-center">
    <div>
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </div>
  </div>
  )
} 

class Game extends React.Component {
	render() {
  	// <h3>Play Nine</h3>
    return(
    	<div className="container">
  	    <hr />
    	  <div className="row">
        	<Stars numberOfStars="5" />
      		<Button />
      		<Answer />
        </div>
        <br />
      <Numbers />  
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
  border-radius: 50%


*/