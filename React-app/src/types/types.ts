export type PostType = {
    _id: string,
    author: string,
    postBody: string
}

export type UserDataType = { // profilePage
    username: string,
    posts: PostType[] | [],
    status: string,
    role: 'Owner' | 'User' | null
}

export type UserType = { // usersPage
    username: string,
    id: number
}
