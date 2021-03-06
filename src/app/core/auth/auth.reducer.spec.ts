import { authReducer, AuthState } from './auth.reducer';
import {
  AddAuthenticationMessageAction,
  AuthenticateAction,
  AuthenticatedAction,
  AuthenticatedErrorAction,
  AuthenticatedSuccessAction,
  AuthenticationErrorAction,
  AuthenticationSuccessAction,
  CheckAuthenticationTokenAction,
  CheckAuthenticationTokenErrorAction,
  LogOutAction,
  LogOutErrorAction,
  LogOutSuccessAction,
  RedirectWhenAuthenticationIsRequiredAction,
  RedirectWhenTokenExpiredAction,
  RefreshTokenAction,
  RefreshTokenErrorAction,
  RefreshTokenSuccessAction,
  ResetAuthenticationMessagesAction,
  SetRedirectUrlAction
} from './auth.actions';
import { AuthTokenInfo } from './models/auth-token-info.model';
import { EpersonMock } from '../../shared/testing/eperson-mock';

describe('authReducer', () => {

  let initialState: AuthState;
  let state: AuthState;
  const mockTokenInfo = new AuthTokenInfo('test_token');
  const mockError = new Error('Test error message');

  it('should properly set the state, in response to a AUTHENTICATE action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      loading: false,
    };
    const action = new AuthenticateAction('user', 'password');
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      loaded: false,
      error: undefined,
      loading: true,
      info: undefined
    };

    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a AUTHENTICATE_SUCCESS action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      error: undefined,
      loading: true,
      info: undefined
    };
    const action = new AuthenticationSuccessAction(mockTokenInfo);
    const newState = authReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it('should properly set the state, in response to a AUTHENTICATE_ERROR action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      error: undefined,
      loading: true,
      info: undefined
    };
    const action = new AuthenticationErrorAction(mockError);
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      loaded: false,
      loading: false,
      info: undefined,
      authToken: undefined,
      error: 'Test error message'
    };

    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a AUTHENTICATED action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      error: undefined,
      loading: true,
      info: undefined
    };
    const action = new AuthenticatedAction(mockTokenInfo);
    const newState = authReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it('should properly set the state, in response to a AUTHENTICATED_SUCCESS action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      error: undefined,
      loading: true,
      info: undefined
    };
    const action = new AuthenticatedSuccessAction(true, mockTokenInfo, EpersonMock);
    const newState = authReducer(initialState, action);
    state = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a AUTHENTICATED_ERROR action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      error: undefined,
      loading: true,
      info: undefined
    };
    const action = new AuthenticatedErrorAction(mockError);
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      authToken: undefined,
      error: 'Test error message',
      loaded: true,
      loading: false,
      info: undefined
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a CHECK_AUTHENTICATION_TOKEN action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      loading: false,
    };
    const action = new CheckAuthenticationTokenAction();
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      loaded: false,
      loading: true,
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a CHECK_AUTHENTICATION_TOKEN_ERROR action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      loading: true,
    };
    const action = new CheckAuthenticationTokenErrorAction();
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      loaded: false,
      loading: false,
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a LOG_OUT action', () => {
    initialState = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock
    };

    const action = new LogOutAction();
    const newState = authReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it('should properly set the state, in response to a LOG_OUT_SUCCESS action', () => {
    initialState = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock
    };

    const action = new LogOutSuccessAction();
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      authToken: undefined,
      error: undefined,
      loaded: false,
      loading: false,
      info: undefined,
      refreshing: false,
      user: undefined
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a LOG_OUT_ERROR action', () => {
    initialState = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock
    };

    const action = new LogOutErrorAction(mockError);
    const newState = authReducer(initialState, action);
    state = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: 'Test error message',
      loading: false,
      info: undefined,
      user: EpersonMock
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a REFRESH_TOKEN action', () => {
    initialState = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock
    };
    const newTokenInfo = new AuthTokenInfo('Refreshed token');
    const action = new RefreshTokenAction(newTokenInfo);
    const newState = authReducer(initialState, action);
    state = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock,
      refreshing: true
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a REFRESH_TOKEN_SUCCESS action', () => {
    initialState = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock,
      refreshing: true
    };
    const newTokenInfo = new AuthTokenInfo('Refreshed token');
    const action = new RefreshTokenSuccessAction(newTokenInfo);
    const newState = authReducer(initialState, action);
    state = {
      authenticated: true,
      authToken: newTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock,
      refreshing: false
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a REFRESH_TOKEN_ERROR action', () => {
    initialState = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock,
      refreshing: true
    };
    const action = new RefreshTokenErrorAction();
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      authToken: undefined,
      error: undefined,
      loaded: false,
      loading: false,
      info: undefined,
      refreshing: false,
      user: undefined
    };
    expect(newState).toEqual(state);
  });

  beforeEach(() => {
    initialState = {
      authenticated: true,
      authToken: mockTokenInfo,
      loaded: true,
      error: undefined,
      loading: false,
      info: undefined,
      user: EpersonMock
    };

    state = {
      authenticated: false,
      authToken: undefined,
      loaded: false,
      loading: false,
      error: undefined,
      info: 'Message',
      user: undefined
    };
  });

  it('should properly set the state, in response to a REDIRECT_AUTHENTICATION_REQUIRED action', () => {
    const action = new RedirectWhenAuthenticationIsRequiredAction('Message');
    const newState = authReducer(initialState, action);
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a REDIRECT_TOKEN_EXPIRED action', () => {
    const action = new RedirectWhenTokenExpiredAction('Message');
    const newState = authReducer(initialState, action);
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a ADD_MESSAGE action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      loading: false,
    };
    const action = new AddAuthenticationMessageAction('Message');
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      loaded: false,
      loading: false,
      info: 'Message'
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a RESET_MESSAGES action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      loading: false,
      error: 'Error',
      info: 'Message'
    };
    const action = new ResetAuthenticationMessagesAction();
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      loaded: false,
      loading: false,
      error: undefined,
      info: undefined
    };
    expect(newState).toEqual(state);
  });

  it('should properly set the state, in response to a SET_REDIRECT_URL action', () => {
    initialState = {
      authenticated: false,
      loaded: false,
      loading: false
    };
    const action = new SetRedirectUrlAction('redirect.url');
    const newState = authReducer(initialState, action);
    state = {
      authenticated: false,
      loaded: false,
      loading: false,
      redirectUrl: 'redirect.url'
    };
    expect(newState).toEqual(state);
  });
});
