import prisma from './prismaClient';

const db = prisma

const reset = async () => {
    await db.userRelationship.deleteMany({})
    await db.pledge.deleteMany({})
    await db.plan.deleteMany({})
    await db.contact.deleteMany({})
    await db.user.deleteMany({})
}

const create = async () => {

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

    //create many contacts
    const contacts = [
        'pedro', 'emma', 'fahad', 'lily', 'sid', 'evie', 'aden', 'justin', 'natalie',
    ]
    contacts.forEach(async (name) => {
        await db.contact.create({
            data: {
                firstName: name,
                address: 'abc 123 SF, Cali',
                source: 'phone contact',
                ownerID: hyun.UserID
            }
        })
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

    //create a relationship bridge between john's planID and hyun (plan leader)
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
            UserRealtionshipID:hyunAddsJohn.UserRealtionshipID,
        },
        data: {
            relationshipStatus: "FRIEND"
        }
    })
}

//testing query
const query = async () => {
    const contacts = await db.user.findFirst({
        where: {
            firstName: 'hyun'
        },
        include: {
            contacts: true
        }
    })

    console.log(contacts);
}

reset()
    .then(
        () => create()
    )
    .then(
        () => query()
    )
    .then(
        async () => await db.$disconnect()
    )
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
    })


