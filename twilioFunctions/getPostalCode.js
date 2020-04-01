const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')

exports.handler = async function (context, event, callback) {
  try {
    const memory = JSON.parse(event.Memory)
    const Language = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'
    const message = await getTextForFunction('getPostalCode', event.Channel, 'Both', Language)
    const questions = [
      {
        question: {
          say: message
        },
        name: 'PostalCode'
      }
    ]
    const responseObject = {
      actions: [
        {
          collect: {
            name: 'ask_questions',
            questions: questions,
            on_complete: {
              redirect: `${process.env.ASSESMENT_API}/nearestCenter`
            }
          }
        }]
    }
    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
