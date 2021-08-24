export interface User {
    id : number;
    email : string;
    level : string;
    state : string;
    date : number;
}

export interface State {
    user: User,
    loading: Boolean,
}

export interface navbarState {
    userSideActive : Boolean
}


export interface bannerState {
    banners : any[] | [],
}



export interface administratorState {
    admins : any[] | []
}

export interface userState {
    users : any[] | [],
}

export interface embassyState {
    embassies : any[] | [],
}

export interface newsState {
    news : any[] | [],
}

export interface visaState {
    visas : any[] | [],
}