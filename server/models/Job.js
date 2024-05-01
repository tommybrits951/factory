const db = require('../config/dbConnect')

function getById (job_id) {
  const job = db('jobs').where('job_id', job_id).first()
  return job
}

async function insertJob (job) {
  let result = await db('jobs').insert(job).returning('job_id')
  result = await getById(result.job_id)
  return result
}

module.exports = {
  insertJob,
  getById
}
