import { createReducer, on } from '@ngrx/store';
import { authMe, authMeFailure, authMeSuccess, loadChannelsByUserId, loadChannelsByUserIdFailure, loadChannelsByUserIdSuccess, loadMessagesByChannelId, loadMessagesByChannelIdFailure, loadMessagesByChannelIdSuccess, loadUsers, loadUsersByChannelId, loadUsersByChannelIdFailure, loadUsersByChannelIdSuccess, loadUsersFailure, loadUsersSuccess, login, loginFailure, loginSuccess, sendMessageToChannel, sendMessageToChannelFailure, sendMessageToChannelSuccess, setActiveChannelId, updateStatus, updateStatusFailure, updateStatusSuccess } from './chat.actions';
import { UserModel } from 'app/model/UserModel';
import { ChannelModel } from 'app/model/ChannelModel';
import { MessageModel } from 'app/model/MessageModel';
import { UserRole } from 'app/model/Roles';

export const chatFeatureKey = 'chat';

export interface ChatState {
  token: string | null;
  loading: boolean;
  error: string | null;
  user: UserModel | null;

  activeChannel: string | null;

  channels: {
    loading: boolean;
    error: string | null;
    items: ChannelModel[];
  };
  channelUsers: {
    [id: string]: {
      loading: boolean;
      error: string | null;
      items: UserModel[]
    }
  };
  channelMessages: {
    [id: string]: {
      loading: boolean;
      error: string | null;
      items: MessageModel[]
    }
  };
  allUsers: {
    items: UserModel[];
    loading: boolean;
    error: string | null;
  };
  allChannels: {
    items: ChannelModel[];
    loading: boolean;
    error: string | null;
  };
}

export const initialState: ChatState = {
  token: null,
  loading: false,
  error: null,

  user: null,

  activeChannel: null,

  channels: {
    loading: false,
    error: null,
    items: [],
  },
  channelUsers: {

  },
  channelMessages: {
  },
  allUsers: {
    items: [],
    loading: false,
    error: null,
  },
  allChannels: {
    items: [],
    loading: false,
    error: null,
  }
};

export const _reducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, { user }) => ({ ...state, loading: false, user })),
  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(authMe, (state) => ({ ...state, loading: true, error: null })),
  on(authMeSuccess, (state, { user }) => ({ ...state, loading: false, user })),
  on(authMeFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(updateStatus, (state) => ({ ...state, loading: true, error: null })),
  on(updateStatusSuccess, (state, user ) => ({ ...state, loading: false, user })),
  on(updateStatusFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

  on(setActiveChannelId, (state, { channelId }) => ({
    ...state,
    activeChannel: channelId
  })),

  on(loadUsers, state => ({
    ...state,
    allUsers: {
      loading: true,
      error: null,
      items: []
    }

  })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    allUsers: {
      loading: false,
      error: null,
      items: users
    }
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    allUsers: {
      loading: false,
      error: error,
      items: []
    }
  })),

  on(loadChannelsByUserId, state => ({
    ...state,
    channels: {
      loading: true,
      error: null,
      items: []
    }

  })),
  on(loadChannelsByUserIdSuccess, (state, { channels }) => ({
    ...state,
    channels: {
      loading: false,
      error: null,
      items: channels
    }
  })),
  on(loadChannelsByUserIdFailure, (state, { error }) => ({
    ...state,
    channels: {
      loading: false,
      error: error,
      items: []
    }
  })),

  on(loadUsersByChannelId, (state, { channelId }) => ({
    ...state,
    channelUsers: {
      ...state.channelUsers,
      [channelId]: {
        loading: true,
        error: null,
        items: []
      }
    }

  })),
  on(loadUsersByChannelIdSuccess, (state, { users, channelId }) => ({
    ...state,
    channelUsers: {
      ...state.channelUsers,
      [channelId]: {
        ...state.channelUsers[channelId],
        loading: false,
        items: users
      }
    }
  })),
  on(loadUsersByChannelIdFailure, (state, { error, channelId }) => ({
    ...state,
    channelUsers: {
      ...state.channelUsers,
      [channelId]: {
        loading: false,
        error: error,
        items: []
      }
    }
  })),

  on(loadMessagesByChannelId, (state, { channelId }) => ({
    ...state,
    channelMessages: {
      ...state.channelMessages,
      [channelId]: {
        loading: true,
        error: null,
        items: []
      }
    }

  })),
  on(loadMessagesByChannelIdSuccess, (state, { messages, channelId }) => ({
    ...state,
    channelMessages: {
      ...state.channelMessages,
      [channelId]: {
        ...state.channelMessages[channelId],
        loading: false,
        items: messages
      }
    }
  })),
  on(loadMessagesByChannelIdFailure, (state, { error, channelId }) => ({
    ...state,
    channelMessages: {
      ...state.channelMessages,
      [channelId]: {
        loading: false,
        error: error,
        items: []
      }
    }
  })),

  on(sendMessageToChannel, (state, { content }) => ({
    ...state,
    channelMessages: {
      ...state.channelMessages,
    }

  })),
  on(sendMessageToChannelSuccess, (state, messageData) => ({
    ...state,
    channelMessages: {
      ...state.channelMessages,
      [messageData.channelId]: {
        ...state.channelMessages[messageData.channelId],
        items: [...state.channelMessages[messageData.channelId].items, messageData]
      }
    }
  })),
  on(sendMessageToChannelFailure, (state, { error, channelId, messageId }) => ({
    ...state,
    channelMessages: {
      ...state.channelMessages,
      [channelId]: {
        ...state.channelMessages[channelId],
        items: state.channelMessages[channelId].items.map((el) => {
          if (messageId === el.id) {
            return {
              ...el,
              error: 'Couldn"t send the message'
            }
          }
          return el
        })
      }
    }
  }))
);

export function chatReducer(state: ChatState | undefined, action: any) {
  return _reducer(state, action);
}
