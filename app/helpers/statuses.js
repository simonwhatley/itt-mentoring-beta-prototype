exports.getClaimStatusOptions = (selectedItem) => {
  const options = require('../data/dist/statuses/claim-statuses')
  const items = []

  options.forEach((option, i) => {
    const item = {}

    item.text = option.name
    item.value = option.code
    item.id = option.id
    item.checked = (selectedItem && selectedItem.includes(option.code)) ? 'checked' : ''

    items.push(item)
  })

  // items.sort((a, b) => {
  //   return a.text.localeCompare(b.text)
  // })

  return items
}

exports.getClaimStatusLabel = (code) => {
  const statuses = require('../data/dist/statuses/claim-statuses')
  const status = statuses.find(status => status.code === code)

  let label = code

  if (status) {
    label = status.name
  }

  return label
}
