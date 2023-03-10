//seeds fake users and contacts into the database.
import { faker } from '@faker-js/faker'
import prisma from './prismaClient';
import { EventType, RelationshipStatus, InviteStatus, Role } from '@prisma/client'

const db = prisma

const userData = Array.from({ length: 20 }).map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
}))


const main = async () => {

    //create many users
    await db.user.createMany({
        data: userData
    })

    //create user: hyun, john, sarah
    const hyun = await db.user.create({
        data: {
            email: 'test@gmail.com',
            firstName: 'hyun',
            lastName: 'test'
        }
    })

    const john = await db.user.create({
        data: {
            email: 'john@gmail.com',
            firstName: 'john',
            lastName: 'test'
        }
    })

    const sarah = await db.user.create({
        data: {
            email: 'sarah@gmail.com',
            firstName: 'sarah',
            lastName: 'test'
        }
    })

    //create contact 'oliver'
    const oliver = await db.contact.create({
        data: {
            firstName: 'Oliver',
            source: 'phone contact',
            ownerID: hyun.id
        }
    })

    //create many contacts for hyun
    const contactData = Array.from({ length: 50 }).map(() => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        ownerID: hyun.id,
        source: 'phone contact'
    }))

    await db.contact.createMany({
        data: contactData
    })

    //create many contacts for sarah
    await db.contact.createMany({
        data: contactData.map(obj =>
            ({ ...obj, ownerID: sarah.id })
        )
    })

    //create birthday plan for contact oliver
    await db.plan.create({
        data: {
            description: 'Birthday plan for pedro!',
            startDate: new Date('03-07-2023'),
            endDate: new Date('03-20-2023'),
            specialEventType: EventType.BIRTHDAY,
            contactID: oliver.id,
        }
    })

    //create birthday plan for user john
    const johnPlan = await db.plan.create({
        data: {
            description: "John's graduation",
            startDate: new Date('03-07-2023'),
            endDate: new Date('03-20-2023'),
            specialEventType: EventType.GRADUATION,
        }
    })

    //hyun becomes a pledge for john's plan
    await db.pledge.create({
        data: {
            planID: johnPlan.id,
            userID: hyun.id,
            inviteStatus: 'ACCEPTED',
            role: Role.PLAN_LEADER
        }
    })

    //hyun sends john as a friend first
    const hyunAddsJohn = await db.userRelationship.create({
        data: {
            userID: hyun.id,
            friendsWithID: john.id,
            relationshipStatus: RelationshipStatus.PENDING_REQUEST
        }
    })

    //john accepts and adds hyun as a friend 
    await db.userRelationship.create({
        data: {
            userID: john.id,
            friendsWithID: hyun.id,
            relationshipStatus: RelationshipStatus.FRIEND
        }
    })

    //update hyun relationship with john to 'friend'
    await db.userRelationship.update({
        where: {
            id: hyunAddsJohn.id,
        },
        data: {
            relationshipStatus: RelationshipStatus.FRIEND
        }
    })
}

main()
    .then(
        async () => {
            await db.$disconnect()
            console.log('Disconnected fom DB')
        }
    )
    .catch(async (e) => {
        console.error(`Failed seeding database, error: ${e}`)
        await db.$disconnect()
    })


