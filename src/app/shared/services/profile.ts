export interface Profile {
    profileName: string,
    joinDate: string,
    bio: string,
    bannerURL: string,
    location: string,
    link: string,
    posts: Array<any>;
    followers: number,
    following: number
}