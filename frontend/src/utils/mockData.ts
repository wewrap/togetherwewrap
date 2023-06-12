import { type User, type Contact, type BrainstormIdeaPost } from './types';

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
    itemLink: 'https://www.chevrolet.com/'
  },
  {
    authorId: '2',
    id: '2',
    firstName: 'Sher',
    lastName: 'Sherrett',
    description: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus authorId sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl',
    item: 'Volkswagen',
    itemLink: 'https://www.volkswagen.com/'
  },
  {
    authorId: '3',
    id: '3',
    firstName: 'Maurizia',
    lastName: 'Ringe',
    description: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    item: 'Volkswagen',
    itemLink: 'https://www.volkswagen.com/'
  },
  {
    authorId: '4',
    id: '4',
    firstName: 'Cyb',
    lastName: 'Densumbe',
    description: 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    item: 'Ford',
    itemLink: 'https://www.ford.com/'
  },
  {
    authorId: '5',
    id: '5',
    firstName: 'Aguste',
    lastName: 'Bugdale',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    item: 'Ford',
    itemLink: 'https://www.ford.com/'
  },
  {
    authorId: '6',
    id: '6',
    firstName: 'Asa',
    lastName: 'Belone',
    description: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor authorId, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    item: 'Nissan',
    itemLink: 'https://www.nissanusa.com/'
  },
  {
    authorId: '7',
    id: '7',
    firstName: 'Kandy',
    lastName: 'Jozwik',
    description: 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem authorId ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    item: 'Suzuki',
    itemLink: 'https://www.suzuki.com/'
  },
  {
    authorId: '8',
    id: '8',
    firstName: 'Alecia',
    lastName: 'Gent',
    description: 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    item: 'Honda',
    itemLink: 'https://www.honda.com/'
  },
  {
    authorId: '9',
    id: '9',
    firstName: 'Natividad',
    lastName: 'Taylo',
    description: 'Quisque authorId justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    item: 'Nissan',
    itemLink: 'https://www.nissanusa.com/'
  },
  {
    authorId: '10',
    id: '10',
    firstName: 'Adel',
    lastName: 'Blaney',
    description: 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    item: 'Toyota',
    itemLink: 'https://www.toyota.com/'
  }
]
