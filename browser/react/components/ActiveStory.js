import React from 'react'

const ActiveStory = (props)=> {
  const { story } = props
  return (
    <div>
      <h3>{ story.title }</h3>
      <p>{ story.description }</p>
    </div>
  )
}

export default ActiveStory