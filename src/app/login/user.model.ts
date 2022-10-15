
export class User {

    constructor(public email: string, public id : string, private _token: string){

    }

    get token(){
        // if (!this._tokeExpurationDate || new Date() > this._tokeExpurationDate){
        //     return null
        // }

        return this._token
    }
}