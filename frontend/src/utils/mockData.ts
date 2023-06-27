import { type User, type Contact, type BrainstormIdeaPost, type Plan } from './types';

export const contactsMockData: Contact[] = [
  {
    firstName: 'john',
    lastName: 'doe',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '1'
  },
  {
    firstName: 'joe',
    lastName: 'doe',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '2'

  },
  {
    firstName: 'sarah',
    lastName: 'doe',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '3'
  },
  {
    firstName: 'alex',
    lastName: 'doe',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '4'
  },
  {
    firstName: 'kevin',
    lastName: 'doe',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '5'
  },
  {
    firstName: 'bob',
    lastName: 'doe',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '6'
  },
  {
    firstName: 'jenny',
    lastName: 'doe',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '7'
  },
  {
    firstName: 'kim',
    lastName: 'doe',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '8'
  }, {
    firstName: 'josh',
    lastName: 'doe',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '9'
  },
  {
    firstName: 'edward',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '10'
  },
  {
    firstName: 'syd',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '11'
  },
  {
    firstName: 'jordan',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '12'
  },
  {
    firstName: 'aden',
    email: 'john@gmail.com',
    ownerID: '1',
    id: '13'
  }
]

export const usersMockData: User[] = [
  {
    id: 't3RKLEP',
    firstName: 'Emyle',
    lastName: 'Abercrombie',
    email: 'eabercrombie0@shinystat.com'
  },
  {
    id: 'fM76EmwRYa',
    firstName: 'Gale',
    lastName: 'Agnew',
    email: 'gagnew1@hubpages.com'
  },
  {
    id: 'BFkDKen7m3',
    firstName: 'Herc',
    lastName: 'Fuente',
    email: 'hfuente2@auda.org.au'
  },
  {
    id: '08C1Tkk5Naj6',
    firstName: 'Isadore',
    lastName: 'Sheekey',
    email: 'isheekey3@360.cn'
  },
  {
    id: '4oVnasezACE',
    firstName: 'Marj',
    lastName: 'Mallalieu',
    email: 'mmallalieu4@deviantart.com'
  },
  {
    id: 'hzhKMTASNuay',
    firstName: 'Courtney',
    lastName: 'Keyser',
    email: 'ckeyser5@unicef.org'
  },
  {
    id: '6kiZoZ',
    firstName: 'Glen',
    lastName: 'Kilminster',
    email: 'gkilminster6@zdnet.com'
  },
  {
    id: 'JtPiMLv',
    firstName: 'Fransisco',
    lastName: 'Gibbard',
    email: 'fgibbard7@hc360.com'
  },
  {
    id: 'J8jKiP',
    firstName: 'Blinnie',
    lastName: 'Beltzner',
    email: 'bbeltzner8@irs.gov'
  },
  {
    id: 'sC2hfFKedVc',
    firstName: 'Darlleen',
    lastName: 'Stafford',
    email: 'dstafford9@ucoz.ru'
  }
]

export const brainstormIdeasMockData: BrainstormIdeaPost[] = [
  {
    authorId: '785feee5-5a79-4c8e-93c8-f9e3358ce8e4',
    id: '1',
    firstName: 'Hyun',
    lastName: '',
    description: 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    item: 'Chevrolet',
    itemLink: 'https://www.chevrolet.com/',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    authorId: '2',
    id: '2',
    firstName: 'Sher',
    lastName: 'Sherrett',
    description: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus authorId sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl',
    item: 'Volkswagen',
    itemLink: 'https://www.volkswagen.com/',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    authorId: '3',
    id: '3',
    firstName: 'Maurizia',
    lastName: 'Ringe',
    description: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    item: 'Volkswagen',
    itemLink: 'https://www.volkswagen.com/',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    authorId: '4',
    id: '4',
    firstName: 'Cyb',
    lastName: 'Densumbe',
    description: 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    item: 'Ford',
    itemLink: 'https://www.ford.com/',
    updatedAt: new Date(),
    createdAt: new Date()
  }
]

export const hubAllPlansMockData: Plan[] = [{
  id: '1',
  description: 'Morbi ut odio.',
  startDate: '6/18/2023',
  leaderId: 'dfed0759-4908-49a2-8c65-ec920276cbcf',
  createdAt: '1/1/2023',
  updatedAt: '9/29/2022',
  title: 'Morbi vel lectus i. faucibus orci luctus et ultrfaucibus orci luctus et ultr',
  specialEventType: 'tempus'
}, {
  id: '2',
  description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.',
  startDate: '9/24/2022',
  leaderId: '0ab275bb-e201-4491-9cd1-dea2b6e08761',
  createdAt: '9/18/2022',
  updatedAt: '1/18/2023',
  title: 'Morbi vel lectus i.',
  specialEventType: 'at'
}, {
  id: '3',
  description: 'Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',
  startDate: '9/1/2022',
  leaderId: '2d1f2b40-51bb-4721-9cce-2e64b422f818',
  createdAt: '6/26/2022',
  updatedAt: '11/2/2022',
  title: 'Morbi vel lectus i.',
  specialEventType: 'tincidunt'
}, {
  id: '4',
  description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
  startDate: '2/3/2023',
  leaderId: '1900ebb7-a3a3-4184-88a6-ee1fc1d8d0b9',
  createdAt: '4/24/2023',
  updatedAt: '8/25/2022',
  title: 'Morbi vel lectus i.',
  specialEventType: 'primis'
},
{
  id: '5',
  description: 'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
  startDate: '6/15/2023',
  leaderId: 'e23c50e6-981f-4fe8-839f-89c7bf721f33',
  createdAt: '4/15/2023',
  updatedAt: '6/2/2023',
  title: 'Morbi vel lectus i.',
  specialEventType: 'ultrices'
}
]
