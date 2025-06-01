
export interface User {
    id: string;
    username: string;
    email: string;
}

export interface Resource {
    id: string;
    name: string;
    description: string;
    link: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    user: User;
  }

  export interface ResourcesData {
    findAllResources: Resource[];
  }

  export interface FormData {
    name: string;
    description: string;
    link: string;
    imageUrl: string;
  }
  