import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class SingleStory extends Component {
  constructor() {
    super()
    this.state = { story: { timelines: [] } }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/stories/${id}`)
    .then(response=> response.data)
    .then(story=> this.setState({ story }))
  }
  render() {
    const { story } = this.state
    console.log(story.timelines);
    return (
      <div>
        <h3>{ story.title }</h3>
        <h4>{ story.date }</h4>
        <p>{ story.description }</p>
        {
          story.timelines.map(tl=> (
            <li key={ tl.id }><Link to={ `/timelines/${tl.id}` }>{ tl.name }</Link></li>
          ))

        }

      </div>
    )
  }
}

export default SingleStory
