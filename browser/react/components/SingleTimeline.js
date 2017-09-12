import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class SingleTimeline extends Component {
  constructor() {
    super()
    this.state = { timeline: { stories: [] } }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/timelines/${id}`)
    .then(response=> response.data)
    .then(timeline=> this.setState({ timeline }))
  }
  render() {
    const { timeline } = this.state
    // start date, end date determined by events?
    return (
      <div>
        <h3>{ timeline.name }</h3>
        {
          timeline.stories.map(story=> (
            <div key={ story.id }>
              <h4>{ story.title }</h4>
              <h5>{ story.date }</h5>
            </div>
          ))
        }
      </div>
    )
  }
}

export default SingleTimeline
