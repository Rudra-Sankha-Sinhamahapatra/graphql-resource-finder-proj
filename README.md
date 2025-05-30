# Full-Stack Resource Finder with GraphQL

A modern, full-stack application built with React, Apollo Client, GraphQL, and MongoDB. This project showcases best practices in authentication, resource management, and type safety using TypeScript, featuring both client and server implementations.

## 🚀 Features

- **Full-Stack Implementation**
  - React-based frontend with Apollo Client
  - GraphQL backend with Apollo Server
  - Type-safe schema definitions
  - Efficient resolver patterns
  - Custom scalar types
  - Proper error handling

- **Robust Authentication System**
  - JWT-based authentication
  - Secure password handling
  - Protected routes and resolvers
  - Context-based user identification

- **Resource Management**
  - CRUD operations for resources
  - User-resource relationships
  - Data validation
  - MongoDB integration

- **Modern Tech Stack**
  - TypeScript for type safety
  - React for frontend
  - Apollo Client/Server for GraphQL
  - Express.js backend
  - MongoDB database
  - JWT for authentication
  - Bun as JavaScript runtime

## 🛠️ Technical Stack

- **Frontend**
  - React
  - Apollo Client
  - TypeScript
  - Modern UI/UX practices

- **Backend**
  - Node.js
  - Express.js
  - Apollo Server
  - TypeScript
  - MongoDB with Mongoose
  - JSON Web Tokens

## 🔧 Setup and Installation

1. Install Bun (if not already installed):
```bash
npm i -g bun
```

2. Clone the repository:
```bash
git clone https://github.com/Rudra-Sankha-Sinhamahapatra/graphql-resource-finder-proj.git
cd graphql-resource-finder-proj
```

3. Install dependencies:

For backend:
```bash
cd server
bun i
```

For frontend:
```bash
cd client
bun i
```

4. Create a `.env` file in the server directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4000
```

5. Start the development servers:

For backend:
```bash
cd server
bun start
```

For frontend:
```bash
cd client
bun dev
```

## 📝 API Documentation

### Authentication

The API uses JWT-based authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

### GraphQL Operations

#### User Management
- Signup: Create a new user account
- Login: Authenticate and receive JWT token
- Get User Profile: Fetch authenticated user's details

#### Resource Management
- Create Resource: Add new resources
- Update Resource: Modify existing resources
- Delete Resource: Remove resources
- Query Resources: Fetch resources with filtering options

## 🔐 Security Features

- Password hashing
- JWT token authentication
- Protected resolvers
- Request validation
- Error handling
- Type safety with TypeScript


## 📈 Future Enhancements

- Real-time subscriptions
- Rate limiting
- Caching layer
- Advanced query optimization
- Enhanced error reporting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Rudra Sankha Sinhamahapatra
Project Link: [https://github.com/Rudra-Sankha-Sinhamahapatra/graphql-resource-finder-proj](https://github.com/Rudra-Sankha-Sinhamahapatra/graphql-resource-finder-proj) 