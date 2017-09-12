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
    Story.create({ title: 'Learned to ride!', date: '7/10/94', description: 'Lorem ipsum HTFU rouleur derby festina muur-kapelmuur on your left, around parcours kaperij maillot jaune bruyneel.' }),
    Story.create({ title: 'Bought my own bike!', date: '2/2/14', description: 'La fleche wallonne stijn devolder, monte paschi eroica jens gruppetto belgium on the rivet anquetil, for echelon rouleur derby is for lovers monte paschi eroica.' }),
    Story.create({ title: 'NYC Century', date: '9/30/14', description: 'Pau broom wagon pyrenees, coppi kolobnev tati groupo omloop het nieuwsblad bromont, van steenbergen vaughters vuelta a espana!' }),
    Story.create({ title: 'Harpoon Point to Point', date: '8/6/15', description: `Bettini ventoux gimondi bartali, koppenberg bruyneel tiegemberg planket around fixie, giro d'italia kaperij! Res firma mitescere nescit landbouwkrediet luz ardiden gilbert valkenberg, riis the tour de mont aigoual rouleur rouleur derby pedal.` }),
    Story.create({ title: 'Joined NYCC!', date: '3/1/16', description: 'Rund um koln planckaert virenque cat among the pigeons vos petacchi.' }),
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
app.use('/stylesheets', express.static(`${__dirname}/public/stylesheets`))
app.get('/', (req, res, next)=> res.send('index.html'))


// api
app.get('/api/stories', (req, res, next)=> {
  Story.findAll({ order: [ 'date' ] })
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
  Timeline.findById(req.params.id, { include: [ { model: Story, order: [ 'date' ] }]})
  .then(timeline=> res.send(timeline))
})
//

const port = process.env.PORT || 3000
conn.sync({ force: true })
.then(seed)
.then(()=> app.listen(port, ()=> console.log(`listening on port ${port}`)))
