import { ManagedObjectType } from "./ManagedObjectType";

/** represents the base object that can be managed by the app */
export default interface ManagedObject{
    /** the name of the object */
    name: string;
    /** the  */
    description: string;
    /** the name of the object */
    type: ManagedObjectType;
    /** an array with the relations */
    relations: Array<string>
}