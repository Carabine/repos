import axios from 'axios'
import {PostType, UserType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://localhost:5000',
})

type SignupDataType = {
    username: string,
    password: string,
    email: string
}

type LoginDataType = {
    username: string,
    password: string
}

export const authAPI = {
    async signup(formData: SignupDataType) {
        const res = await instance.post('signup', formData, {headers: {Authorization: 'Bearer ' + window.localStorage.token}})
        return res.data
    },
    async login(formData: LoginDataType) {
        const res = await instance.post('login', formData, {headers: {Authorization: 'Bearer ' + window.localStorage.token}})
        return res.data
    },
    async auth() {
        const res = await instance.get('auth', {headers: {Authorization: 'Bearer ' + window.localStorage.token}})
        return res.data
    }
}

type AddPostResType = {
    status: 'err' | 'success',
    data: {
        post: PostType
    },
    err?: any,
    message?: 'string'
}


export const postsAPI = {
    async addPost(body: string) {
        const res = await instance.post<AddPostResType>('posts', {postBody: body}, {headers: {Authorization: 'Bearer ' + window.localStorage.token}})
        return res.data
    },
    async deletePost(postId: string) {
        console.log('postId: ' + postId)
        const res = await instance.delete<AddPostResType>('posts', {headers: {Authorization: 'Bearer ' + window.localStorage.token}, params: {postId}})
        return res.data
    }
}

type GetUserDataResType = {
    status: 'err' | 'success',
    err?: any,
    message?: 'string',
    data: {
        username: string,
        role: 'Owner',
        posts: PostType[],
        status: string
    }
}

type ChangeStatusResType = {
    status: 'err' | 'success',
    err?: any,
    message?: 'string'
}

export const profileAPI = {
    async getUserData(id: number) {
        const userId = id !== undefined ? id : ''
        const res = await instance.get<GetUserDataResType>('profile/' + userId, {headers: {Authorization: 'Bearer ' + window.localStorage.token}})
        return res.data
    },
    async changeStatus(status: string) {
        const res = await instance.put<ChangeStatusResType>('profile/status', {status}, {headers: {Authorization: 'Bearer ' + window.localStorage.token}})
        return res.data
    }

}

type GetUsersResType = {
    status: 'err' | 'success',
    err?: any,
    message?: 'string',
    data: {
        users: UserType[],
        count: number
    }
}

export const usersAPI = {
    async getUsers(page: number) {
        const count = 9
        const currentPage = page !== undefined ? page : 1
        const res = await instance.get<GetUsersResType>('users/', {headers: {Authorization: 'Bearer ' + window.localStorage.token}, params:{page: currentPage, count}})
        return res.data
    }
}