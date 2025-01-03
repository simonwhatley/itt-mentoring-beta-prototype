const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

const { DateTime } = require('luxon')
const marked = require('marked')
const { gfmHeadingId } = require('marked-gfm-heading-id')
const numeral = require('numeral')

const academicYearHelper = require('./helpers/academic-years')
const claimWindowHelper = require('./helpers/claim-windows')
const claimHelper = require('./helpers/claims')
const fundingHelper = require('./helpers/funding')
const giasHelper = require('./helpers/gias')
const mentorHelper = require('./helpers/mentors')
const ofstedHelper = require('./helpers/ofsted')
const onsHelper = require('./helpers/ons')
const providerHelper = require('./helpers/providers')
const schoolHelper = require('./helpers/schools')
const teacherHelper = require('./helpers/teachers')
const utilsHelper = require('./helpers/utils')
const userHelper = require('./helpers/users')

/* ------------------------------------------------------------------
  numeral filter for use in Nunjucks
  example: {{ params.number | numeral("0,00.0") }}
  outputs: 1,000.00
------------------------------------------------------------------ */
addFilter('numeral', (number, format) => {
  return numeral(number).format(format)
})

/* ------------------------------------------------------------------
  numeral filter for use in Nunjucks
  example: {{ params.number | numeral("0,00.0") }}
  outputs: 1,000.00
------------------------------------------------------------------ */
// addFilter('datetime', (timestamp, format) => {
//   let datetime = DateTime.fromJSDate(timestamp, {
//     locale: 'en-GB'
//   }).toFormat(format)

//   if (datetime === 'Invalid DateTime') {
//     datetime = DateTime.fromISO(timestamp, {
//       locale: 'en-GB'
//     }).toFormat(format)
//   }

//   return datetime
// })

/* ------------------------------------------------------------------
utility function to turn and array into a list
example: {{ ['primary','secondary'] | arrayToList }}
outputs: "primary and secondary"
------------------------------------------------------------------ */
addFilter('arrayToList', (array, join = ', ', final = ' and ') => {
  const arr = array.slice(0)

  const last = arr.pop()

  if (array.length > 1) {
    return arr.join(join) + final + last
  }

  return last
})

/* ------------------------------------------------------------------
utility function to parse markdown as HTML
example: {{ "## Title" | markdownToHtml }}
outputs: "<h2>Title</h2>"
------------------------------------------------------------------ */
addFilter('markdownToHtml', (markdown) => {
  if (!markdown) {
    return null
  }

  marked.use(gfmHeadingId())

  const text = markdown.replace(/\\r/g, '\n').replace(/\\t/g, ' ')
  const html = marked.parse(text)

  // Add govuk-* classes
  let govukHtml = html.replace(/<p>/g, '<p class="govuk-body">')
  govukHtml = govukHtml.replace(/<ol>/g, '<ol class="govuk-list govuk-list--number">')
  govukHtml = govukHtml.replace(/<ul>/g, '<ul class="govuk-list govuk-list--bullet">')
  govukHtml = govukHtml.replace(/<h2/g, '<h2 class="govuk-heading-l"')
  govukHtml = govukHtml.replace(/<h3/g, '<h3 class="govuk-heading-m"')
  govukHtml = govukHtml.replace(/<h4/g, '<h4 class="govuk-heading-s"')

  return govukHtml
})

/* ------------------------------------------------------------------
utility function to get an error for a component
example: {{ errors | getErrorMessage('title') }}
outputs: "Enter a title"
------------------------------------------------------------------ */
addFilter('getErrorMessage', (array, fieldName) => {
  if (!array || !fieldName) {
    return null
  }

  const error = array.filter((obj) =>
    obj.fieldName === fieldName
  )[0]

  return error
})

addFilter('getOrganisationTypeLabel', utilsHelper.getOrganisationTypeLabel)

/* ------------------------------------------------------------------
GIAS utility functions
------------------------------------------------------------------ */
addFilter('getEstablishmentTypeLabel', giasHelper.getEstablishmentTypeLabel)

addFilter('getEstablishmentGroupLabel', giasHelper.getEstablishmentGroupLabel)

addFilter('getEstablishmentStatusLabel', giasHelper.getEstablishmentStatusLabel)

addFilter('getEstablishmentPhaseLabel', giasHelper.getEstablishmentPhaseLabel)

addFilter('getGenderLabel', giasHelper.getGenderLabel)

addFilter('getOfficialSixthFormLabel', giasHelper.getOfficialSixthFormLabel)

addFilter('getNurseryProvisionLabel', giasHelper.getNurseryProvisionLabel)

addFilter('getReligiousCharacterLabel', giasHelper.getReligiousCharacterLabel)

addFilter('getAdmissionsPolicyLabel', giasHelper.getAdmissionsPolicyLabel)

addFilter('getSpecialClassesLabel', giasHelper.getSpecialClassesLabel)

addFilter('getUrbanRuralLabel', giasHelper.getUrbanRuralLabel)

addFilter('getSENDProvisionLabel', giasHelper.getSENDProvisionLabel)

/* ------------------------------------------------------------------
Ofsted utility functions
------------------------------------------------------------------ */
addFilter('getOfstedRatingLabel', ofstedHelper.getOfstedRatingLabel)

/* ------------------------------------------------------------------
ONS utility functions
------------------------------------------------------------------ */
addFilter('getLocalAuthorityDistrictLabel', onsHelper.getLocalAuthorityDistrictLabel)

addFilter('getParliamentaryConstituencyLabel', onsHelper.getParliamentaryConstituencyLabel)

addFilter('getRegionLabel', onsHelper.getRegionLabel)

/* ------------------------------------------------------------------
User utility functions
------------------------------------------------------------------ */
addFilter('getUserName', userHelper.getUserName)

/* ------------------------------------------------------------------
Mentor utility functions
------------------------------------------------------------------ */
addFilter('getMentorName', mentorHelper.getMentorName)

/* ------------------------------------------------------------------
Teacher utility functions
------------------------------------------------------------------ */
addFilter('getTeacherName', teacherHelper.getTeacherName)

/* ------------------------------------------------------------------
Provider utility functions
------------------------------------------------------------------ */
addFilter('getSchoolName', schoolHelper.getSchoolName)

/* ------------------------------------------------------------------
Provider utility functions
------------------------------------------------------------------ */
addFilter('getProviderName', providerHelper.getProviderName)

/* ------------------------------------------------------------------
Claim utility functions
------------------------------------------------------------------ */
addFilter('getClaimStatusLabel', claimHelper.getClaimStatusLabel)

addFilter('getClaimStatusClasses', claimHelper.getClaimStatusClasses)

/* ------------------------------------------------------------------
Funding utility functions
------------------------------------------------------------------ */
addFilter('getFundingRate', fundingHelper.getFundingRate)

addFilter('getFundingAreaLabel', fundingHelper.getFundingAreaLabel)

/* ------------------------------------------------------------------
Academic year utility functions
------------------------------------------------------------------ */
addFilter('getAcademicYearLabel', academicYearHelper.getAcademicYearLabel)

addFilter('isCurrentAcademicYear', academicYearHelper.isCurrentAcademicYear)

/* ------------------------------------------------------------------
Claim window utility functions
------------------------------------------------------------------ */
addFilter('isClaimWindowOpen', claimWindowHelper.isClaimWindowOpen)
