Stars = (props) => {
	let stars = [];
  for(let i=0; i < props.numberOfStars; i++) {
  	stars.push(<i key={i} className="fa fa-star"></i>)
  }
  return(
  	<div className="col-5">
    	{stars}
    </div>
  );
}

class Game extends React.Component {
	render() {
  	return(
    	<div className="container">
      <h3>Play Nine</h3>
      <hr />
      <div className="row">
        <Stars numberOfStars="5" />
      </div>
      </div>);
  }
}

class App extends React.Component {
	render() {
  	return(<div className="container"><Game /></div>);
  }
}

ReactDOM.render(<App />, mountNode);