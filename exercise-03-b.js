Stars = ({numberOfStars}) => {
  return (
      <div className="col-5">
        {_.range(numberOfStars).map(i => <i key={i} className="fa fa-star"></i>)}
      </div>
    );
}

Button = (props) => {
  return (
      <div className="col-2">
        <button>=</button>
      </div>
    );
}


Answer = (props) => {
  return (
      <div>
        Answer
      </div>
    );
}

class Game extends React.Component {
	render() {
  	// <h3>Play Nine</h3>
    return(
    	<div className="row">
  	    <hr />
    	  <Stars numberOfStars="5" />
      	<Button />
      	<Answer />
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