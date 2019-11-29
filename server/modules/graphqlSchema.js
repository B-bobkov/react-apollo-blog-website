const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Post {
        _id: ID,
        title: String,
        content: String
    },

    type User {
        _id: ID
        firstName: String! 
        lastName: String!
        password: String!
        bio: String
        profileImage: String
        email: String!
        userName: String!
        joinDate: String
    }

    type Token {
        token: String!
    }

    type Query {
        posts: [Post]

        post(_id: ID!): Post

        getCurrentUser: User

        getUserProfile: User

        getAllUsers: [User]

        profilePage(userName: String!): User
    },

    type Mutation {
        addPost(title: String!, content: String!): Post,

        updatePost(_id: ID!, title: String!, content: String!): Post,

        deletePost(_id: ID!): Post,
        
        signupUser(firstName: String!, lastName: String!, email: String!, userName: String!, password: String!): Token

        signinUser(userName: String!, password: String!): Token

        editProfile(email: String!, bio: String!): User

        setProfileIMG(email: String!, profileImage: String!): User
        
        changeEmail(currentEmail: String!, newEmail: String!): User

        changePassword(email: String!, password: String!): User

        passwordReset(email: String!): User
    }

`;

module.exports = typeDefs;