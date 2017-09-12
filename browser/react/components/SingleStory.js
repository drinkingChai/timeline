import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../helpers/formatDate'
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
    return (
      <div className="row">
        <div className="col-12">
          <div className="row">
            <h3>{ story.title }</h3>
            <h4>{ formatDate(story.date) }</h4>
            <p>{ story.description }</p>
          </div>

          <div className="row">
            <h5>Part of: </h5>
            {
              story.timelines.map(tl=> (
                <Link to={ `/timelines/${tl.id}` } className="col-3 col-md-3" key={ tl.id }>
                  <div className="card">
                    { tl.name }
                  </div>
                </Link>
              ))

            }
          </div>
        </div>
      </div>
    )
  }
}

export default SingleStory
