import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class AllTimelines extends Component {
  constructor() {
    super()
    this.state = { timelines: [] }
  }
  componentDidMount() {
    axios.get('/api/timelines')
    .then(response=> response.data)
    .then(timelines=> this.setState({ timelines }))
  }
  render() {
    const { timelines } = this.state
    // start date, end date determined by events?
    return (
      <div>
        {
          timelines.map(timeline=> (
            <li key={ timeline.id }><Link to={ `/timelines/${timeline.id}` }>{ timeline.name }</Link></li>
          ))
        }
      </div>
    )
  }
}

export default AllTimelines
