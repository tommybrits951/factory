const Job = require('../models/Job')
const { format } = require('date-fns')

async function addJob (req, res, next) {
  try {
    let job = {
      ...req.body,
      job_added_date: format(new Date(), 'MM/dd/yyyy HH:mm:ss')
    }
    const result = await Job.insertJob(job)
    if (result) {
      res.status(201).json({ message: 'job added!' })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  addJob
}
