import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import config from './config'
import routes from './routes'
import bodyParser from 'body-parser'

const app = express()
const port = config.port

//fetch db update object 
require('./db')

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ')
  })
)

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))

// setup cors
app.use(cors())
app.use('/', routes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.send(err)
})

app.listen(port, () => console.log('Started server at port: ' + port))

export default app // for test
