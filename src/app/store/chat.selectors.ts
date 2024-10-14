import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from './chat.reducer';

export const selectChatState = createFeatureSelector<ChatState>('user');

export const selectAllUsers = createSelector(
    selectChatState,
    (state: ChatState) => state.allUsers.items
);

export const selectUserLoading = createSelector(
    selectChatState,
    (state: ChatState) => state.allUsers.loading
);

export const selectUserError = createSelector(
    selectChatState,
    (state: ChatState) => state.allUsers.error
);

export const selectActiveChannel = createSelector(
    selectChatState,
    (state: ChatState) => state.activeChannel
);

export const selectUsersByChannelId = () =>
    createSelector(
        selectChatState,
        selectActiveChannel,
        (state: ChatState, activeChannelId) => activeChannelId ? state.channelUsers[activeChannelId]?.items : []
    );

export const selectUsersByChannelIdLoading = () =>
    createSelector(
        selectChatState,
        selectActiveChannel,
        (state: ChatState, activeChannelId) => state.channelUsers[activeChannelId || '']?.loading
    );

export const selectUsersByChannelIdError = () =>
    createSelector(
        selectChatState,
        selectActiveChannel,
        (state: ChatState, activeChannelId) => activeChannelId ? state.channelUsers[activeChannelId]?.error : null
    );

export const selectMessagesByChannelId = () =>
    createSelector(
        selectChatState,
        selectActiveChannel,
        (state: ChatState, activeChannelId) => activeChannelId ? state.channelMessages[activeChannelId]?.items : []
    );

export const selectMessagesByChannelIdLoading = () =>
    createSelector(
        selectChatState,
        selectActiveChannel,
        (state: ChatState, activeChannelId) => activeChannelId ? state.channelMessages[activeChannelId]?.loading : false
    );

export const selectMessagesByChannelIdError = () =>
    createSelector(
        selectChatState,
        selectActiveChannel,
        (state: ChatState, activeChannelId) => activeChannelId ? state.channelMessages[activeChannelId]?.error : null
    );

export const selectMyChannels = createSelector(
    selectChatState,
    (state: ChatState) => {
        console.log(state.channels.items);
        return state.channels.items
    }
);

export const selectMyChannelsIsLoading = createSelector(
    selectChatState,
    (state: ChatState) => state.channels.loading
);

export const selectMyChannelsError = createSelector(
    selectChatState,
    (state: ChatState) => state.channels.error
);

export const selectIsAuth = createSelector(
    selectChatState,
    (state: ChatState) => !!state.user
);

export const selectUserInfo = createSelector(
    selectChatState,
    (state: ChatState) => state.user
);

export const selectMyId = createSelector(
    selectChatState,
    (state: ChatState) => state.user?.id
);
