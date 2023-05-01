export interface Profile {
    profileName: string,
    joinDate: string,
    bio: string,
    bannerURL: string,
    location: string,
    link: string,
    posts: Array<any>;
    followers: Array<any>,
    following: Array<any>
}