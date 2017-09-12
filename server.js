const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false })

const Timeline = conn.define('timeline', {
  name: { type: Sequelize.STRING, allowNull: false, validate: { notEmpty: true }}
})

const Stuff = conn.define('stuff', {
  name: { type: Sequelize.STRING, allowNull: false, validate: { notEmpty: true }},
  date: { type: Sequelize.DATE, allowNull: false, validate: { notEmpty: true }},
  description: { type: Sequelize.TEXT, default: "" },
  images: { type: Sequelize.ARRAY(Sequelize.STRING), default: [] }
})


// Timeline.belongsTo(Stuff)
Stuff.belongsToMany(Timeline, { through: 'stuff_timeline' })
// Timeline.hasMany(Stuff) //
Timeline.belongsToMany(Stuff, { through: 'stuff_timeline' })


const seed = ()=> {
  return Promise.all([
    Stuff.create({ name: 'Started biking!', date: '7/10/94' }),
    Stuff.create({ name: 'Bought my own bike!', date: '2/2/14' }),
    Stuff.create({ name: 'Did the NYC Century', date: '9/30/14' }),
    Stuff.create({ name: 'Harpoon Point to Point', date: '8/6/15' }),
    Stuff.create({ name: 'Joined NYCC!', date: '3/1/16' }),
    Timeline.create({ name: 'Biking timeline' }),
    Timeline.create({ name: 'Another timeline :o' })
  ])
  .then(([s1, s2, s3, s4, s5, t1, t2])=> {
    return Promise.all([
      t1.addStuff(s1),
      t1.addStuff(s2),
      t1.addStuff(s3),
      t1.addStuff(s4),
      t1.addStuff(s5),
      t2.addStuff(s1)
    ])
  })
}




const app = express()
app.use(express.static(`${__dirname}/browser`))
app.use('/dist', express.static(`${__dirname}/dist`))
app.get('/', (req, res, next)=> res.send('index.html'))

const port = process.env.PORT || 3000
conn.sync({ force: true })
.then(seed)
.then(()=> app.listen(port, ()=> console.log(`listening on port ${port}`)))
