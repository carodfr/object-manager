import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import ManagedObject from '../../types/ManagedObject'
import { RootState } from '../store'

export interface ObjectManagementState {
    /** a dictionary where the key is the object ids, and the value the current object */
    managedObjects: Record<string, ManagedObject>
}

const initialState: ObjectManagementState = {
    managedObjects: {},
}

export const objectManagementSlice = createSlice({
  name: 'objectManagement',
  initialState,
  reducers: {
    importManagedObjects: (state, action: PayloadAction<Record<string, ManagedObject>>) => {
        state.managedObjects=action.payload;
    },
    addObject: (state, action: PayloadAction<ManagedObject >) => {
        const newId = (Object.keys(state.managedObjects).reduce((maxValue: number, currentValue: string)=> Math.max(maxValue, parseInt(currentValue, 10)), 0)?? 0) +1;
        state.managedObjects[newId] = action.payload;
    },
    updateObject: (state, action: PayloadAction<{id: string; updatedObject: ManagedObject}>) => {
        state.managedObjects[action.payload.id] = action.payload.updatedObject;
    },
    deleteObject: (state, action: PayloadAction<string>) => {
        const deletedId = action.payload;
        Object.values(state.managedObjects).forEach((currentObject: ManagedObject)=>currentObject.relations = currentObject.relations.filter(currentRelation => currentRelation !==deletedId));
        delete state.managedObjects[deletedId];
    },
  },
})

export const { importManagedObjects, addObject, updateObject, deleteObject } = objectManagementSlice.actions

/** returns the managed objects */
export const selectManagedObjects = (state: RootState) => state.objectManagement.managedObjects;

export default objectManagementSlice.reducer