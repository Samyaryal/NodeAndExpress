import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Landing from './landing'

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render(){
    return (
      <BrowserRouter>
          <div className="container">
            <Header/>
              <Route exact path="/" component={Landing} />
              
                    
          </div>
      </BrowserRouter>
    )
  }

}