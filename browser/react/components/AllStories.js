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
      <div className="row">
        {
          stories.map(story=> (
            <li className="card col-md-2" key={ story.id }>
              <Link to={ `/stories/${story.id}` }>
                <h4>{ story.title }</h4>
                <p>{ story.date }</p>
              </Link>
            </li>
          ))
        }
      </div>
    )
  }
}

export default AllStories
