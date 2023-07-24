import Subscription from "./Subscription";

export default class User{
    room : string;
    socketId : string;
    subscriptions : Subscription[];
}

