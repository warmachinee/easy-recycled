/// <reference types="react-scripts" />

declare module "apptype" {
  export interface LineProfileData {
    userId: string;
    displayName: string;
    pictureUrl: string;
    statusMessage: string;
  }
  export interface BooleanReducerState {
    [key: string]: boolean;
  }
  export interface BooleanReducerActions {
    type: string;
    key?: string;
  }
}
