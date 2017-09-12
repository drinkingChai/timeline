const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false })

const Timeline = conn.define('timeline', {
  name: { type: Sequelize.STRING, allowNull: false, validate: { notEmpty: true }}
})

const Story = conn.define('story', {
  title: { type: Sequelize.STRING, allowNull: false, validate: { notEmpty: true }},
  date: { type: Sequelize.DATE, allowNull: false, validate: { notEmpty: true }},
  description: { type: Sequelize.TEXT, default: "" },
  images: { type: Sequelize.ARRAY(Sequelize.STRING), default: [] }
})


// Timeline.belongsTo(Story)
Story.belongsToMany(Timeline, { through: 'stuff_timeline' })
// Timeline.hasMany(Story) //
Timeline.belongsToMany(Story, { through: 'stuff_timeline' })


const seed = ()=> {
  return Promise.all([
    Story.create({ title: 'Started biking!', date: '7/10/94' }),
    Story.create({ title: 'Bought my own bike!', date: '2/2/14' }),
    Story.create({ title: 'Did the NYC Century', date: '9/30/14' }),
    Story.create({ title: 'Harpoon Point to Point', date: '8/6/15' }),
    Story.create({ title: 'Joined NYCC!', date: '3/1/16' }),
    Timeline.create({ name: 'Biking timeline' }),
    Timeline.create({ name: 'Another timeline :o' })
  ])
  .then(([s1, s2, s3, s4, s5, t1, t2])=> {
    return Promise.all([
      t1.addStory(s1),
      t1.addStory(s2),
      t1.addStory(s3),
      t1.addStory(s4),
      t1.addStory(s5),
      t2.addStory(s1)
    ])
  })
}


const app = express()
app.use(express.static(`${__dirname}/browser`))
app.use('/dist', express.static(`${__dirname}/dist`))
app.get('/', (req, res, next)=> res.send('index.html'))


// api
app.get('/api/stories', (req, res, next)=> {
  Story.findAll()
  .then(stories=> res.send(stories))
})
app.get('/api/stories/:id', (req, res, next)=> {
  Story.findById(req.params.id, { include: [ Timeline ]})
  .then(story=> res.send(story))
})
app.get('/api/timelines', (req, res, next)=> {
  Timeline.findAll()
  .then(timelines=> res.send(timelines))
})
app.get('/api/timelines/:id', (req, res, next)=> {
  Timeline.findById(req.params.id, { include: [ Story ]})
  .then(timeline=> res.send(timeline))
})
//

const port = process.env.PORT || 3000
conn.sync({ force: true })
.then(seed)
.then(()=> app.listen(port, ()=> console.log(`listening on port ${port}`)))
