import prisma from './prismaClient';
const db = prisma

const main = async (): Promise<void> => {
  // const bob = await db.user.findUnique({
  //   where: {
  //     id: 'f297539c-33a9-4a07-9fe0-d3f89defeea9'
  //   },
  //   include: {
  //     friendsWith: true
  //   }
  // })

  // console.log(bob?.friendsWith)

  const kevin = await db.user.findUnique({
    where: {
      id: 'f297539c-33a9-4a07-9fe0-d3f89defeea9'
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      friendsWith: {
        where: {
          relationshipStatus: 'FRIEND'
        }
      }
    }
  })

  console.log(kevin)
}

void main()
