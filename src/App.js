import React from 'react';
import logo from './logo.svg';
import './App.css';
import FadeIn from 'react-fade-in';

class Ticker extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      index: 0
    };
    
    fetch(`https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=058acf6215d046a8a637f431c428e489&country=us`)
      .then((response) => response.json())
      .then((data) => this.setState({headlines: data}));
  
    setInterval(() => {
      if (this.state.headlines) {
        if (this.state.headlines.status === 'ok') {
          if (this.state.index + 1 === this.state.headlines.articles.length) {
            this.setState({index: 0});
          } else {
            this.setState({index: this.state.index + 1});
          }
        }
      }  
    }, 10000);
  }
  
  render() {
    if (this.state.headlines && this.state.headlines.status === 'ok') {
      return this.state.headlines.articles[this.state.index].title;
    } else if (this.state.headlines && this.state.headlines.status === 'error') {
      return 'API error';
    } else {
      return 'Waiting for data';
    }
  }
}

class HeadlineViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'general'
    };
    
    this.handleCategory = this.handleCategory.bind(this);
  }
  
  handleCategory(event) {
    this.setState({category: event.target.value});
  }

  render() {
    console.log(this.state);

    return <div>
      <Ticker category={this.state.category} />
      
      <form>
        <p>Choose Category</p>
        <br/>
        <label htmlFor="business">Business</label>
        <input id="business" type="radio" name="category" value="business" checked={this.state.category === 'business'} onChange={this.handleCategory}/>
        <br/>
        <label htmlFor="entertainment">Entertainment</label>
        <input id="entertainment" type="radio" name="category" value="entertainment" checked={this.state.category === 'entertainment'} onChange={this.handleCategory}/>
        <br/>
        <label htmlFor="general">General</label>
        <input id="general" type="radio" name="category" value="general" checked={this.state.category === 'general'} onChange={this.handleCategory}/>
        <br/>
        <label htmlFor="health">Health</label>
        <input id="health" type="radio" name="category" value="health" checked={this.state.category === 'health'} onChange={this.handleCategory}/>
        <br/>
        <label htmlFor="science">Science</label>
        <input id="science" type="radio" name="category" value="science" checked={this.state.category === 'science'} onChange={this.handleCategory}/>
        <br/>
        <label htmlFor="sports">Sports</label>
        <input id="sports" type="radio" name="category" value="sports" checked={this.state.category === 'sports'} onChange={this.handleCategory}/>
        <br/>
        <label htmlFor="technology">Technology</label>
        <input id="technology" type="radio" name="category" value="technology" checked={this.state.category === 'technology'} onChange={this.handleCategory}/>
      </form>
      
      <p>Headlines courtesy of <a href="https://newsapi.org/">News API</a></p>
    </div>;
  }
}

function App() {
  return (
    <div className="App">
      <HeadlineViewer/>      
    </div>
  );
}

export default App;
