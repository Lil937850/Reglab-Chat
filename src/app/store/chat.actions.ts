
import { createAction, props } from '@ngrx/store';
import { ChannelModel } from 'app/model/ChannelModel';
import { MessageModel } from 'app/model/MessageModel';
import { UserModel } from 'app/model/UserModel';

export const loadUsers = createAction('[Chat] Load Users');
export const loadUsersSuccess = createAction('[Chat] Load Users Success', props<{ users: UserModel[] }>());
export const loadUsersFailure = createAction('[Chat] Load Users Failure', props<{ error: string }>());

export const loadUsersByChannelId = createAction('[Chat] Load Users ByChannelId', props<{ channelId: string }>());
export const loadUsersByChannelIdSuccess = createAction('[Chat] Load Users Success ByChannelId', props<{ users: UserModel[], channelId: string }>());
export const loadUsersByChannelIdFailure = createAction('[Chat] Load Users Failure ByChannelId', props<{ error: string, channelId: string }>());

export const loadChannelsByUserId = createAction('[Chat] Load Channels ByUserId');
export const loadChannelsByUserIdSuccess = createAction('[Chat] Load Channels Success ByUserId', props<{ channels: ChannelModel[] }>());
export const loadChannelsByUserIdFailure = createAction('[Chat] Load Channels Failure ByUserId', props<{ error: string }>());

export const loadMessagesByChannelId = createAction('[Chat] Load Messages ByUserId', props<{ channelId: string }>());
export const loadMessagesByChannelIdSuccess = createAction('[Chat] Load Messages Success ByUserId', props<{ messages: MessageModel[], channelId: string }>());
export const loadMessagesByChannelIdFailure = createAction('[Chat] Load Messages Failure ByUserId', props<{ error: string, channelId: string }>());

export const setActiveChannelId = createAction('[Chat] Set ActiveChannelId', props<{ channelId: string }>());

export const login = createAction('[Chat] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Chat] Login Success', props<{ user: UserModel }>());
export const loginFailure = createAction('[Chat] Login Failure', props<{ error: string }>());
