import { faker } from '@faker-js/faker'
import prisma from './prismaClient';

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
            address: 'abc 123 SF, Cali',
            source: 'phone contact',
            ownerID: hyun.UserID
        }
    })

    //create many contacts for hyun
    const contactData = Array.from({ length: 50 }).map(() => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        ownerID: hyun.UserID,
        source: 'phone contact'
    }))

    await db.contact.createMany({
        data: [...contactData]
    })

    //create many contacts for sarah
    await db.contact.createMany({
        data: contactData.map(obj => 
            ({ ...obj, ownerID: sarah.UserID })
        )
    })

    //create birthday plan for contact oliver
    await db.plan.create({
        data: {
            description: 'Birthday plan for pedro!',
            startDate: new Date('03-07-2023'),
            endDate: new Date('03-20-2023'),
            specialEventType: 'BIRTHDAY',
            contactID: oliver.ContactID,
        }
    })

    //create birthday plan for user john
    const johnPlan = await db.plan.create({
        data: {
            description: "John's graduation",
            startDate: new Date('03-07-2023'),
            endDate: new Date('03-20-2023'),
            specialEventType: 'BIRTHDAY',
        }
    })

    //hyun becomes a pledge for john's plan
    await db.pledge.create({
        data: {
            planID: johnPlan.PlanID,
            userID: hyun.UserID,
            inviteStatus: 'ACCEPTED',
            role: 'PLAN_LEADER'
        }
    })

    //hyun sends john as a friend first
    const hyunAddsJohn = await db.userRelationship.create({
        data: {
            userID: hyun.UserID,
            friendsWithID: john.UserID,
            relationshipStatus: "PENDING_REQUEST"
        }
    })

    //john accepts and adds hyun as a friend 
    await db.userRelationship.create({
        data: {
            userID: john.UserID,
            friendsWithID: hyun.UserID,
            relationshipStatus: "FRIEND"
        }
    })

    //update hyun relationship with john to 'friend'
    await db.userRelationship.update({
        where: {
            UserRealtionshipID: hyunAddsJohn.UserRealtionshipID,
        },
        data: {
            relationshipStatus: "FRIEND"
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
        console.error(e)
        await db.$disconnect()
    })


