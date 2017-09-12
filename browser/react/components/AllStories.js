import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class AllStories extends Component {
  constructor() {
    super()
    this.state = { stories: [] }
  }
  componentDidMount() {
    axios.get('/api/stories')
    .then(response=> response.data)
    .then(stories=> this.setState({ stories }))
  }
  render() {
    const { stories } = this.state
    return (
      <div>
        {
          stories.map(story=> (
            <li key={ story.id }><Link to={ `/stories/${story.id}` }>{ story.title }</Link></li>
          ))
        }
      </div>
    )
  }
}

export default AllStories
