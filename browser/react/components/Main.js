import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'

import AllStories from './AllStories'
import SingleStory from './SingleStory'
import AllTimelines from './AllTimelines'
import SingleTimeline from './SingleTimeline'

class Main extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <hr/>

            <Route exact path="/stories" component={ AllStories }/>
            <Route path="/stories/:id" component={ SingleStory }/>
            <Route exact path="/timelines" component={ AllTimelines }/>
            <Route path="/timelines/:id" component={ SingleTimeline }/>
          </div>
        </Router>
      </div>
    )
  }
}

export default Main
