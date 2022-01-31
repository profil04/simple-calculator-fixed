import React from 'react';
import './App.css';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      history: [{
        calculations: Array(4).fill(0)
      }],
      stepNumber: 0,
      value: 0,
      param1: 0,
      sign: '+',
      param2: 0,
      result: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);    
    const current = history[this.state.stepNumber];    
    const calculations = current.calculations.slice();    

    const param1 = this.state.param1;
    const sign = this.state.sign;
    const param2 = this.state.param2;
    const result = Number(param1) + Number(param2);
    
    calculations[0] = param1;
    calculations[1] = sign;
    calculations[2] = param2;
    calculations[3] = result;
    this.setState({
      history: history.concat([{
          calculations: calculations
      }]),      
      stepNumber: history.length,
    });
    console.log(this.state.history[this.state.stepNumber]);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
    });  
  }

  handleChange(event, field){
    const param1 = this.state.param1;
    const param2 = this.state.param2; 

    console.log("aaa" + this.state.param1);
    
    this.setState({ 
      [field]: event.target.value, 
      result: Number(param1) + Number(param2)
     });
    console.log(this.state.history[this.state.stepNumber].calculations[0]);
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];

    const moves = history.map((step, move) => {
      const desc = move ?
        'Przejdź do ' + step.calculations[0]+'+'+step.calculations[2]+'='+step.calculations[3] :
        'Przejdź na początek';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>        
        </li>
      );
    });

    return (
      <div className="App">
        <div className='Calculator'>
          {/*
          <Calculator
            calculations = {current.calculations}
            onClick = {() => this.handleClick()}
          />
          */}
          <form>
              <input 
                type = "number" 
                className='param1' 
                name='param1' 
                onChange={(event) => this.handleChange(event, "param1")}
                />
              +
              <input 
                type = "number" 
                className='param2' 
                name='param2' 
                onChange={(event) => this.handleChange(event, "param2")}
                />
              <p>=</p>
              <input 
                type = "number" 
                className='result' 
                name='result' 
                readOnly = {true}
                value = {this.state.history[this.state.stepNumber].calculations[3]}
                />
              
              <input type = "button" value = "Zapisz działanie" onClick={() => this.handleClick()} /> {/* do zakomentowania */}
          </form>
        </div>
        <div className='history'>
        <div>
          <h3>Przywrócone działanie: </h3>
          <p>{this.state.history[this.state.stepNumber].calculations[0]+' + '+this.state.history[this.state.stepNumber].calculations[2]+' = '+this.state.history[this.state.stepNumber].calculations[3]}</p>
        </div>
        <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}