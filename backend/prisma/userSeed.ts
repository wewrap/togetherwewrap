import prisma from '../utils/prismaClient'
import { RelationshipStatus, type User } from '@prisma/client'
import crypto from 'crypto'
const db = prisma

const realUsers = [
  {
    email: 'test1@gmail.com',
    firstName: 'john',
    lastName: 'smith'
  }, {
    email: 'test2@gmail.com',
    firstName: 'Xavier',
    lastName: 'Moss'
  }, {
    email: 'test3@gmail.com',
    firstName: 'Kaylee',
    lastName: 'Ryan'
  }, {
    email: 'test4@gmail.com',
    firstName: 'Scott',
    lastName: 'Lee'
  }, {
    email: 'test5@gmail.com',
    firstName: 'Carly',
    lastName: 'Hendrix'
  }, {
    email: 'test6@gmail.com',
    firstName: 'Ella',
    lastName: 'Haas'
  }, {
    email: 'test7@gmail.com',
    firstName: 'Shania',
    lastName: 'Baxter'
  }, {
    email: 'test8@gmail.com',
    firstName: 'Halle',
    lastName: 'Pratt'
  }, {
    email: 'test9@gmail.com',
    firstName: 'Miya',
    lastName: 'Reid'
  }, {
    email: 'test10@gmail.com',
    firstName: 'Wesley',
    lastName: 'Lowery'
  }, {
    email: 'test111@gmail.com',
    firstName: 'Bianca',
    lastName: 'Lawrence'
  }
]

const testUser = {
  email: 'test@gmail.com',
  firstName: 'bob',
  lastName: 'admin'
}

const main = async (): Promise<void> => {
  // create a test user
  const cryptoPromise = async (): Promise<User> => {
    return await new Promise((resolve, reject) => {
      try {
        const salt = crypto.randomBytes(16).toString('base64');
        crypto.pbkdf2('test', salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
          if (err !== null) throw new Error('failed to create test user')
          const user = await db.user.create({
            data: {
              email: testUser.email,
              firstName: testUser.firstName,
              lastName: testUser.lastName,
              password: hashedPassword.toString('base64'),
              salt
            }
          })
          resolve(user)
        })
      } catch (err) {
        console.error(err)
        reject(err)
      }
    })
  }

  await cryptoPromise()

  const bobTheTestUser = await db.user.findFirstOrThrow({
    where: {
      firstName: testUser.firstName
    }
  })

  // create many users
  await db.user.createMany({
    data: realUsers
  })

  // bob adds a bunch of user
  await Promise.all(realUsers.map(async user => {
    const userInDB = await db.user.findUniqueOrThrow({
      where: {
        email: user.email
      }
    })

    // bob sends friend request to a user
    const bobFriendRequestToUser = await db.userRelationship.create({
      data: {
        userID: bobTheTestUser.id,
        friendsWithID: userInDB.id,
        relationshipStatus: RelationshipStatus.SENT_FRIEND_REQUEST
      }
    })

    // User receives friend request from bob
    const UserReceivesBobRequest = await db.userRelationship.create({
      data: {
        userID: bobTheTestUser.id,
        friendsWithID: userInDB.id,
        relationshipStatus: RelationshipStatus.AWAITING_FRIEND_REQUEST
      }
    })

    // User accepts bob friend request
    await db.userRelationship.update({
      where: {
        id: UserReceivesBobRequest.id
      },
      data: {
        relationshipStatus: RelationshipStatus.FRIEND
      }
    })

    // update bob relationship to 'friend'
    await db.userRelationship.update({
      where: {
        id: bobFriendRequestToUser.id
      },
      data: {
        relationshipStatus: RelationshipStatus.FRIEND
      }
    })
  }))
}

main()
  .then(async () => {
    console.log('Script executed successfully')
    await db.$disconnect()
    console.log('Disconnected from DB')
  })
  .catch(async (e: Error) => {
    console.error(`Failed seeding database, error: ${e}`)
    await db.$disconnect()
  })
