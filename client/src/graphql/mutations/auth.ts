import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
mutation SignIn($email: String!,$password: String!) {
signin(email: $email,password: $password) {
    token
    data {
    id
    email
    username
    }
}
}
`

export const SIGNUP_MUTATION = gql`
mutation SignUp($email: String!,$password: String!,$username:String!) {
signup(email: $email,password: $password, username: $username) {
    token
    data {
    id
    email
    username
    }
}
}
`