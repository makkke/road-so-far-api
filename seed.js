import mongoose from 'mongoose'
import Promise from 'bluebird'
import config from './src/config/config'
import Theme from './src/server/models/theme'
import Service from './src/server/models/service'

// promisify mongoose
Promise.promisifyAll(mongoose)

// connect to mongo db
mongoose.connect(config.mongo.url, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongo.url}`)
})

async function app() {
  await Service.find({}).removeAsync()
  await Theme.find({}).removeAsync()

  const personalTheme = await Theme.createAsync({
    name: 'Personal',
    color: '#e2a93c',
  })

  await Service.createAsync([
    {
      name: 'Activities & Classes',
      description: 'Search and register for programs and activities at Surrey\'s parks, and recreation or arts facilities.',
      url: 'https://webreg.surrey.ca/webreg/Start/Start.asp',
      icon: 'cos-parks-recreation',
      theme: personalTheme._id,
      tags: [
        'apply/renew', 'pay/buy', 'register',
        'parks activities', 'webreg', 'classes', 'rec guide', 'recreation surrey',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Arts Centre Tickets',
      description: 'Buy tickets for events at Surrey Civic Theatres',
      url: 'https://tickets.surrey.ca/TheatreManager/1/login&event=0',
      icon: 'cos-arts-centre-ticketing',
      theme: personalTheme._id,
      tags: [
        'pay/buy',
        'arts tickets', 'arts centre', 'ticket sales', 'surrey box office',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Dog License (Renew)',
      description: 'Renew your Surrey annual dog license.',
      url: 'https://secure1.city.surrey.bc.ca/dogLic/index.asp',
      icon: 'cos-dog-license',
      theme: personalTheme._id,
      tags: [
        'apply/renew', 'pay/buy',
        'dog license', 'dog licence', 'dog license renewal',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Electronic Home Owner Grant',
      description: 'Use the online grant application system to claim your home owner grant online.',
      url: 'https://ptu.surrey.ca/tempestprod/ecom/hog/login.cfm',
      icon: 'cos-home-owner-grant',
      theme: personalTheme._id,
      tags: [
        'apply/renew',
        'home', 'owner', 'grunt', 'property', 'tax',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Property Information',
      description: 'Check your property tax balance and Home Owner Grant status.',
      url: 'https://ptu.surrey.ca/tempestProd/mycity/secure/login.cfm',
      icon: 'cos-my-property',
      theme: personalTheme._id,
      tags: [
        'pay/buy',
        'property', 'taxes', 'utilities', 'myproperty',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Property Taxes & Utilities Inquiry',
      description: 'View property assessment values, legal description, property tax and utility levies related to your property.',
      url: 'https://ptu.surrey.ca/tempestprod/webinquiry/frames.cfm',
      icon: 'cos-property-taxes-utilities-inquiry',
      theme: personalTheme._id,
      tags: [
        'report/request',
        'property taxes', 'utilities', 'inquiry',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Parking Tickets',
      description: 'Pay your City parking ticket using Visa, Mastercard or American Express.',
      route: '/parking-ticket',
      icon: 'cos-parking-infraction-ticket',
      theme: personalTheme._id,
      tags: [
        'pay/buy',
        'parking', 'infraction', 'ticket', 'by-law',
      ],
      isLegacy: false,
      isPublished: true,
      steps: [
        {
          name: 'Method',
          route: 'parking-ticket',
        },
        {
          name: 'Infraction',
          route: 'infractions',
        },
        {
          name: 'Payment',
          route: 'payment',
        },
        {
          name: 'Receipt',
          route: 'receipt',
        },
      ],
    },
  ])

  const businessTheme = await Theme.createAsync({
    name: 'Business',
    color: '#4f9bc6',
  })

  await Service.createAsync([
    {
      name: 'Business License',
      description: 'Apply or renew your City of Surrey Business license by Visa, MasterCard or American Express.',
      url: 'https://mbo.surrey.ca/OBL/Login.aspx',
      icon: 'cos-business-license',
      theme: businessTheme._id,
      tags: [
        'apply/renew', 'pay/buy',
        'business', 'license', 'renew',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Community Care License Inspection',
      description: 'Request building, electrical and fire safety inspections for a community care facility.',
      url: 'https://secure1.city.surrey.bc.ca/comm/',
      icon: 'cos-community-care-license-inspection',
      theme: businessTheme._id,
      tags: [
        'apply/renew', 'build/construct', 'report/request',
        'community care license inspection', 'daycare inspection request', 'daycare facility inspection', 'daycare license inspection', 'community care facility inspection',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [
        {
          name: 'Facility',
          route: 'facility',
        },
        {
          name: 'Confirmation',
          route: 'confirmation',
        },
        {
          name: 'Payment',
          route: 'payment',
        },
        {
          name: 'Receipt',
          route: 'receipt',
        },
      ],
    },
    {
      name: 'Building Records Search',
      description: 'Request a search for building records such as survey certificate copies, building permit issuance dates and square footages for residential and multi-family buildings.',
      route: '/building-records-search',
      icon: 'cos-building-records',
      theme: businessTheme._id,
      tags: [
        'build/construct', 'report/request',
        'building record search', 'building record request', 'survey certificate request', 'building square footage lookup',
      ],
      isLegacy: false,
      isPublished: true,
      steps: [
        {
          name: 'Address Request',
          route: 'address-request',
        },
        {
          name: 'Confirmation',
          route: 'confirmation',
        },
        {
          name: 'Payment',
          route: 'payment',
        },
        {
          name: 'Receipt',
          route: 'receipt',
        },
      ],
    },
  ])

  const buildingAndConstructionTheme = await Theme.createAsync({
    name: 'Building and construction',
    color: '#284e63',
  })

  await Service.createAsync([
    {
      name: 'Building Inspection',
      description: 'View your permits, request building inspections, and receive text and email updates on your request.',
      url: 'https://apps.surrey.ca/PublicPortal/BAIR/common/Index.jsp',
      icon: 'cos-building-inspection',
      theme: buildingAndConstructionTheme._id,
      tags: [
        'build/construct', 'report/request',
        'building', 'inspection', 'request',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Electrical Permit',
      description: 'Apply for an Electrical Permit and manage your existing applications and permits.',
      url: 'https://apps.surrey.ca/PublicPortal/Surrey/common/index.jsp',
      icon: 'cos-electrical-permit',
      theme: buildingAndConstructionTheme._id,
      tags: [
        'apply/renew', 'build/construct', 'report/request',
        'electrical permit', 'electrical permit application', 'electrical work permit',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'ESC Supervisor Reports',
      description: 'Log in and manage your obligations under you ESC permits.',
      url: 'https://propmgr.surrey.ca/publicportal/ESCSR/',
      icon: 'cos-esc-supervisor',
      theme: buildingAndConstructionTheme._id,
      tags: [
        'build/construct', 'report/request',
        'esc report', 'esc supervisor report', 'esc permit', 'esc report submission',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Development/Building Inquiry',
      description: 'Review the status and details of a project or a building permit application.',
      url: 'https://apps.surrey.ca/Online-Development-Inquiry/',
      icon: 'cos-development-building-inquiry',
      theme: buildingAndConstructionTheme._id,
      tags: [
        'build/construct', 'report/request',
        'odi', 'online development inquiry', 'development application status', 'building permit application status', 'development project status',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Tree & Landscaping Inspection',
      description: 'Request a tree and landscaping inspection.',
      url: 'http://www.surrey.ca/community/1366.aspx',
      icon: 'cos-tree-inspection',
      theme: buildingAndConstructionTheme._id,
      tags: [
        'build/construct', 'report/request',
        'tree inspection request', 'landscape inspection request', 'tree inspection',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Plumbing Permit',
      description: 'Apply and pay for Single Family Residential (or similar) Plumbing Permits as a Plumbing Contractor registered with the system.',
      url: 'https://apps.surrey.ca/PublicPortal/SurreyPlbg/common/index.jsp',
      icon: 'cos-plumbing-permit',
      theme: buildingAndConstructionTheme._id,
      tags: [
        'apply/renew', 'build/construct', 'report/request',
        'plumbing permit application', 'plumbing',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Plumbing Inspection',
      description: 'Request a plumbing inspection.',
      url: 'http://www.surrey.ca/city-services/671.aspx',
      icon: 'cos-plumbing-inspection',
      theme: buildingAndConstructionTheme._id,
      tags: [
        'build/construct', 'report/request',
        'plumbing', 'inspection', 'request',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Secondary Suite Fee Inquiry',
      description: 'View which properties are paying for secondary suite fees in Surrey.',
      url: 'http://www.surrey.ca/city-services/8860.aspx',
      icon: 'cos-secondary-suite-fee-inquiry',
      theme: buildingAndConstructionTheme._id,
      tags: [
        'report/request',
        'secondary', 'suite', 'fee', 'inquery',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Traffic Obstruction Permit',
      description: 'Apply for your Traffic Obstruction Permit and book your roads as part of your permit requirements.',
      url: 'http://www.surrey.ca/city-services/4618.aspx',
      icon: 'cos-traffic-obstruction-permit',
      theme: buildingAndConstructionTheme._id,
      tags: [
        'apply/renew', 'register',
        'traffic obstruction permit', 'road booking', 'road blocking permit',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
  ])

  const cityEngagementTheme = await Theme.createAsync({
    name: 'City engagement',
    color: '#749a44',
  })

  await Service.createAsync([
    {
      name: 'Careers',
      description: 'Apply for jobs at the City of Surrey, see current career opportunities and keep your candidate profile up to date.',
      url: 'http://www.surrey.ca/city-government/600.aspx',
      icon: 'cos-careers',
      theme: cityEngagementTheme._id,
      tags: [
        'apply/renew', 'register',
        'job opportunity', 'career opportunity',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'City Speaks',
      description: 'Influence decisions affecting you and your community, get invited to Online Surveys, and choose the topics that interest you.',
      url: 'https://www.cityspeaks.ca/Portal/default.aspx',
      icon: 'cos-city-speaks',
      theme: cityEngagementTheme._id,
      tags: [
        'register',
        'cityspeaks', 'surveys', 'online surveys', 'panels',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Shelter Animal Bed Donation',
      description: 'Donate a bed and give the gift of comfort to a shelter dog or cat.',
      url: 'http://kuranda.com/donate/8987?utm_source=Surrey+Animal+Resource+Centre&utm_medium=email&utm_campaign=shelter-forward-mothers-day-new',
      icon: 'cos-shelter-animal',
      theme: cityEngagementTheme._id,
      tags: [
        'pay/buy',
        'kuranda', 'dog', 'cat', 'animal',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Problems and Requests',
      description: 'Report streetlight outages, waste collection issues, make a noise complaint or request road maintenance.',
      url: 'http://www.surrey.ca/city-services/667.aspx',
      icon: 'cos-report-problem-submit-request',
      theme: cityEngagementTheme._id,
      tags: [
        'report/request',
        'report', 'problem', 'submit', 'request',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
    {
      name: 'Volunteering',
      description: 'Get active in your community and try something new. Check out our volunteer opportunities across the City of Surrey.',
      url: 'http://app.volunteer2.com/Public/Organization/fb99d3e8-d428-4816-9083-b6ccf96a8859',
      icon: 'cos-volunteer-opportunities',
      theme: cityEngagementTheme._id,
      tags: [
        'apply/renew', 'register',
        'volunteer opportunities', 'volunteering, volunteer application system', 'volunteer registration',
      ],
      isLegacy: true,
      isPublished: true,
      steps: [],
    },
  ])

  const fireDepartmentTheme = await Theme.createAsync({
    name: 'Fire department',
    color: '#c0513c',
  })

  await Service.createAsync([
    {
      name: 'Fire Safety Plan Review',
      description: 'Submit your fire safety plan and fire prevention office will review them for accuracy and completion.',
      route: '/fire-safety-plan',
      icon: 'cos-Fire-Safety-Plan',
      theme: fireDepartmentTheme._id,
      tags: [
        'apply/renew', 'build/construct', 'report/request',
        'fire', 'safety', 'plan', 'review', 'construction',
      ],
      isLegacy: false,
      isPublished: true,
      steps: [
        {
          name: 'Type of Plan',
          route: 'plan-type',
        },
        {
          name: 'Contact Information',
          route: 'contact-info',
        },
        {
          name: 'Upload Documents',
          route: 'attachments',
        },
        {
          name: 'Confirmation',
          route: 'confirmation',
        },
        {
          name: 'Payment',
          route: 'payment',
        },
        {
          name: 'Receipt',
          route: 'receipt',
        },
      ],
    },
  ])

  process.exit()
}

app()
