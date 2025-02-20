exports.findMany = (params) => {
  const schools = require('../data/dist/schools/schools.json')

  if (params.query?.length) {
    const query = params.query.toLowerCase()
    return schools.filter(school =>
      school.name.toLowerCase().includes(query) ||
      school.urn?.toString().includes(query) ||
      school.address?.postcode?.toLowerCase().includes(query)
    )
  }

  return schools
}

exports.findOne = (params) => {
  const schools = require('../data/dist/schools/schools.json')

  if (params.query?.length) {
    const query = params.query.toLowerCase()
    return schools.find(school =>
      school.name.toLowerCase().includes(query) ||
      school.urn?.toString().includes(query) ||
      school.address?.postcode?.toLowerCase().includes(query) ||
      school.id === query
    )
  } else {
    return null
  }
}
