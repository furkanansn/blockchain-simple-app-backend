//packages
import { SocketIO, users } from "..";

//models
import Block from "../models/Block";

class UserSubscriptionHelper{
    //TODO: Time complexity of this function is n cubes. Decrease it using database for users and subscriptions.
    
    handle(blocks : Block[]){
        blocks.forEach(block => { 
        users.forEach(element => {
            element.subscriptions.forEach(sub => {
                if(sub.bits !== block.bits){
                    SocketIO.to(element.room).emit("notification",sub);
                }
            });
        });
    });
    }
}

export default new UserSubscriptionHelper();
