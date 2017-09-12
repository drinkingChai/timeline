import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../helpers/formatDate'
import ActiveStory from './ActiveStory'
import axios from 'axios'

class SingleTimeline extends Component {
  constructor() {
    super()
    this.state = { timeline: { stories: [] }, activeStory: {} }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/timelines/${id}`)
    .then(response=> response.data)
    .then(timeline=> this.setState({ timeline, activeStory: timeline.stories[0] ? timeline.stories[0] : {} }))
  }
  clickStory(activeStory) {
    this.setState({ activeStory })
  }
  render() {
    const { timeline, activeStory } = this.state
    // start date, end date determined by events?
    return (
      <div className="row">
        <h3 className="row">{ timeline.name }</h3>
        <div className="col-2 card-col">
        {
          timeline.stories.map(story=> (
            <a onClick={ ()=> this.clickStory(story) } className="clickable" key={ story.id }>
              <div className="card">
                <p>{ formatDate(story.date) }</p>
                <h5>{ story.title }</h5>
              </div>
            </a>
          ))
        }
        </div>
        <ActiveStory story={ activeStory } className="col-10"/>
      </div>
    )
  }
}

export default SingleTimeline
