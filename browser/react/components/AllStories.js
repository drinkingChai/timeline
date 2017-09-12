import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../helpers/formatDate'
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
            <li className="col-3 col-md-3" key={ story.id }>
              <Link to={ `/stories/${story.id}` }>
                <div className="card">
                  <p>{ formatDate(story.date) }</p>
                  <h5>{ story.title }</h5>
                </div>
              </Link>
            </li>
          ))
        }
      </div>
    )
  }
}

export default AllStories
