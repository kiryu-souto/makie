import { Substance } from "../../1_atoms/objects/substance"

// (type_name: string): Array<Substance> | { [key: string]: Array<Substance>; } | {[key: string]: {[key: string]: Array<Substance>}}

class Store {
    strage:{ [key: string]: any}
    constructor () {
        this.strage = {}
    }

    get_type_array =  (type_name: string): { [key: string]: Array<Substance>; } | {[key: string]: {[key: string]: Array<Substance>}} => {
        return this.strage[type_name]
    }

    /**
     * 
     * @param type_name 
     * @param item 
     * 
     * 
     */

    set_item = (type_name: string, item: Substance) => {
        if (this.strage[type_name] === undefined) {
            this.strage[type_name] = [item]
        } else {
            this.strage[type_name].push(item)
        }
    }
}

export {Store}