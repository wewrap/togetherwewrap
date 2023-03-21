/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/indent */
// seeds fake users and contacts into the database.
import prisma from './prismaClient'
import { EventType, RelationshipStatus, InviteStatus, Role } from '@prisma/client'

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

const main = async (): Promise<void> => {
    // create many real users
    await db.user.createMany({
        data: realUsers
    })

    // create user: hyun, john, sarah
    const hyun = await db.user.create({
        data: {
            email: 'hyun@gmail.com',
            firstName: 'hyun',
            lastName: 'test'
        }
    })

    const john = await db.user.create({
        data: {
            email: 'john@gmail.com',
            firstName: 'john',
            lastName: 'joe'
        }
    })

    const sarah = await db.user.create({
        data: {
            email: 'sarah@gmail.com',
            firstName: 'sarah',
            lastName: 'soe'
        }
    })

    // create birthday plan for user john
    const johnPlan = await db.plan.create({
        data: {
            description: "John's graduation",
            startDate: new Date('03-07-2023'),
            endDate: new Date('03-20-2023'),
            specialEventType: EventType.GRADUATION
        }
    })

    // hyun becomes a pledge for john's plan
    await db.planMembership.create({
        data: {
            planID: johnPlan.id,
            userID: hyun.id,
            inviteStatus: 'ACCEPTED',
            role: Role.PLAN_LEADER
        }
    })

    await db.planMembership.create({
        data: {
            planID: johnPlan.id,
            userID: john.id,
            inviteStatus: InviteStatus.NOT_APPLICABLE,
            role: Role.SPECIAL_PERSON
        }
    })

    // hyun sends john as a friend first
    const hyunAddsJohn = await db.userRelationship.create({
        data: {
            userID: hyun.id,
            friendsWithID: john.id,
            relationshipStatus: RelationshipStatus.PENDING_REQUEST
        }
    })

    // john accepts and adds hyun as a friend
    await db.userRelationship.create({
        data: {
            userID: john.id,
            friendsWithID: hyun.id,
            relationshipStatus: RelationshipStatus.FRIEND
        }
    })

    // update hyun relationship with john to 'friend'
    await db.userRelationship.update({
        where: {
            id: hyunAddsJohn.id
        },
        data: {
            relationshipStatus: RelationshipStatus.FRIEND
        }
    })
}

main()
    .catch(async (e: Error) => {
        console.error(`Failed seeding database, error: ${e}`)
        await db.$disconnect()
    })
    .finally(async () => {
        console.log('Script executed successfully')
        await db.$disconnect()
        console.log('Disconnected fom DB')
    })
