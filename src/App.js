import React, { Component } from "react";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  }
  componentDidMount() {
    // axios.get('https://api.giphy.com/v1/gifs/trending?api_key=t0C28VRjP4KfVdGm64M4y4AJh9IiIw8B&limit=25&rating=G')
    //   .then( response => {
    //     this.setState( {gifs: response.data.data})
    //   })
    //   .catch( error => {
    //     console.log('Error Fetching and parsing data', error);
    //   });
    this.performSearch();
  }

  performSearch = (query = "cats") => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=t0C28VRjP4KfVdGm64M4y4AJh9IiIw8B&limit=25`
      )
      .then(response => {
        console.log(response);
        this.setState({
          gifs: response.data.data,
          loading: false
        });
      })
      .catch(error => {
        console.log("Error Fetching and parsing data", error);
      });
  };

  render() {
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title"> GifSearch </h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {this.state.loading ? (
            <p> loading </p>
          ) : (
            <GifList data={this.state.gifs} />
          )}
        </div>
      </div>
    );
  }
}
