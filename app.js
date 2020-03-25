require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const bodyParser = require('body-parser')

const router = express.Router()

app.use(express.json()) // for parsing application/json
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const { updateAirtableAssesment } = require('./cron/updateAirtableAssesment')
const { updateAirtableHospital } = require('./cron/updateAirtableHospital')

function cronCheck (req, res, next) {
  const { headers } = req
  if (headers.password === process.env.CRON_PASS) {
    next()
  } else {
    res.sendStatus(401)
  }
}
router.get('/updateAirtableAssesment', cronCheck, updateAirtableAssesment)
router.get('/updateAirtableHospital', cronCheck, updateAirtableHospital)

router.post('/nearestCenter', async (req, res) => {
  const postalCode = req.body.postalCode
  // Pushing into Twilio format
  const mem = JSON.stringify({
    twilio: {
      collected_data: {
        ask_questions: {
          answers: {
            PostalCode: {
              answer: postalCode
            }
          }
        }
      }
    }
  })

  const event = {
    Memory: mem
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/nearestCenter')
  handler(null, event, callback)
})

router.post('/nearestHospital', async (req, res) => {
  const postalCode = req.body.postalCode
  // Pushing into Twilio format
  const mem = JSON.stringify({
    twilio: {
      collected_data: {
        ask_questions: {
          answers: {
            HPostalCode: {
              answer: postalCode
            }
          }
        }
      }
    }
  })

  const event = {
    Memory: mem
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/nearestHospital')
  handler(null, event, callback)
})

router.get('/infoRoute', async (req, res) => {
  const event = {
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/informationRoute')
  handler(null, event, callback)
})

router.post('/triage1', async (req, res) => {
  const breathing = req.body.breathing

  const mem = JSON.stringify({
    twilio: {
      collected_data: {
        ask_questions: {
          answers: {
            Breathing: {
              answer: breathing
            }
          }
        }
      }
    }
  })

  const event = { Memory: mem }

  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }

  const { handler } = require('./twilioFunctions/triage1')
  handler(null, event, callback)
})

router.post('/triage2', async (req, res) => {
  const breathing = req.body.breathing

  const mem = JSON.stringify({
    twilio: {
      collected_data: {
        ask_questions: {
          answers: {
            Breathing: {
              answer: breathing
            }
          }
        }
      }
    }
  })

  const event = { Memory: mem }

  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }

  const { handler } = require('./twilioFunctions/triage2')
  handler(null, event, callback)
})

router.post('/triage3', async (req, res) => {
  const breathing = req.body.breathing

  const mem = JSON.stringify({
    twilio: {
      collected_data: {
        ask_questions: {
          answers: {
            Breathing: {
              answer: breathing
            }
          }
        }
      }
    }
  })

  const event = { Memory: mem }

  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }

  const { handler } = require('./twilioFunctions/triage3')
  handler(null, event, callback)
})

router.post('/triage4', async (req, res) => {
  const breathing = req.body.breathing

  const mem = JSON.stringify({
    twilio: {
      collected_data: {
        ask_questions: {
          answers: {
            Breathing: {
              answer: breathing
            }
          }
        }
      }
    }
  })

  const event = { Memory: mem }

  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }

  const { handler } = require('./twilioFunctions/triage4')
  handler(null, event, callback)
})

router.get('/Questions1', async (req, res) => {
  const event = {
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/Questions1')
  handler(null, event, callback)
})

router.get('/Questions2', async (req, res) => {
  const event = {
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/Questions2')
  handler(null, event, callback)
})

router.get('/Questions3', async (req, res) => {
  const event = {
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/Questions3')
  handler(null, event, callback)
})

router.get('/Questions4', async (req, res) => {
  const event = {
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/Questions4')
  handler(null, event, callback)
})

router.get('/getPostalCode', async (req, res) => {
  const event = {
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/getPostalCode')
  handler(null, event, callback)
})

router.get('/collectfallback', async (req, res) => {
  const event = {
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/collectfallback')
  handler(null, event, callback)
})

app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
