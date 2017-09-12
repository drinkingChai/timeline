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
      <div className="row">
        {
          timelines.map(timeline=> (
            <Link to={ `/timelines/${timeline.id}` } className="col-md-3" key={ timeline.id }>
              <div className="card">
                  <h5>{ timeline.name }</h5>
              </div>
            </Link>
          ))
        }
      </div>
    )
  }
}

export default AllTimelines
