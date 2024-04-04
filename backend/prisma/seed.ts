import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: '84576ddc-5cfc-4a44-ae3a-fa755e70b0da',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento topzera',
      maximumAttendees: 120,
    },
  })
}

seed().then(() => {
  console.log('Database seeded')
  prisma.$disconnect()
})
