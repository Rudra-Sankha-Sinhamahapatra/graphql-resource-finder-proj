export interface Resource {
  id: string;
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const mockResources: Resource[] = [
  {
    id: '1',
    name: 'React Documentation',
    description: 'Official React documentation with tutorials and API reference',
    link: 'https://react.dev',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    userId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: 'user1',
      username: 'techie',
      email: 'techie@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: '2',
    name: 'TypeScript Handbook',
    description: 'Learn TypeScript from basics to advanced concepts',
    link: 'https://www.typescriptlang.org/docs/',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
    userId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: 'user1',
      username: 'techie',
      email: 'techie@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: '3',
    name: 'GraphQL Tutorial',
    description: 'Comprehensive guide to GraphQL API development',
    link: 'https://www.apollographql.com/tutorials/',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg',
    userId: 'user2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: 'user2',
      username: 'graphqldev',
      email: 'graphql@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
]; 