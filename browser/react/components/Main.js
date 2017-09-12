import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './Nav'

import AllStories from './AllStories'
import SingleStory from './SingleStory'
import AllTimelines from './AllTimelines'
import SingleTimeline from './SingleTimeline'
import NoMatch from './NoMatch'

class Main extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <Nav />

        <Switch>
          <Route exact path="/stories" component={ AllStories }/>
          <Route path="/stories/:id" component={ SingleStory }/>
          <Route exact path="/timelines" component={ AllTimelines }/>
          <Route path="/timelines/:id" component={ SingleTimeline }/>
          <Route component={ NoMatch }/>
        </Switch>
      </div>
    )
  }
}

export default Main
