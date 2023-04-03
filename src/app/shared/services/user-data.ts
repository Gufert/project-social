export interface UserData{
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    lowerDN: string;
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