import prisma from './prismaClient';
const db = prisma

const main = async (): Promise<void> => {
  async function getUserFriends(): Promise<any> {
    return await db.userRelationship.findMany({
      where: {
        userID: 'f297539c-33a9-4a07-9fe0-d3f89defeea9',
        AND: {
          relationshipStatus: 'FRIEND'
        }
      },
      select: {
        id: true,
        friendsWith: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
      // this is a home-made column alias because prisma doesn't support column alias
    }).then(
      (results) => results.map(
        (res) => ({ RecordId: res.id, Friend: res.friendsWith })
      ))
  }

  console.log(await getUserFriends())
}

void main()
