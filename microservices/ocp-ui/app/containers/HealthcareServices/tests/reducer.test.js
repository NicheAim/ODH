import { fromJS } from 'immutable';
import healthcareServicesReducer from '../reducer';
import { GET_HEALTHCARE_SERVICES_ERROR, GET_HEALTHCARE_SERVICES_SUCCESS } from '../constants';

describe('healthcareServicesReducer', () => {
  it('returns the initial state', () => {
    expect(healthcareServicesReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      error: false,
      data: [],
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    }));
  });

  it('returns the get heatlthcare services success status', () => {
    const initialState = fromJS({
      loading: false,
      error: false,
      data: [],
      organization: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    });
    const elements = [{
      logicalId: '1234',
    }];
    const action = {
      type: GET_HEALTHCARE_SERVICES_SUCCESS,
      currentPage: 1,
      includeInactive: true,
      healthcareServices: {
        totalNumberOfPages: 2,
        currentPage: 2,
        currentPageSize: 2,
        totalElements: 2,
        elements,
      },
    };
    const expectState = {
      loading: false,
      error: false,
      data: elements,
      organization: null,
      currentPage: 2,
      totalNumberOfPages: 2,
      currentPageSize: 2,
      totalElements: 2,
      includeInactive: false,
    };
    expect(healthcareServicesReducer(initialState, action)).toEqual(fromJS(expectState));
  });
  it('returns the get heatlthcare services error status', () => {
    const initialState = fromJS({
      loading: false,
      error: false,
      data: [],
      organization: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    });
    const error = new Error({
      error: 'error message',
    });
    const action = {
      type: GET_HEALTHCARE_SERVICES_ERROR,
      error,
    };
    const expectState = {
      loading: false,
      error,
      data: [],
      organization: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    };
    expect(healthcareServicesReducer(initialState, action)).toEqual(fromJS(expectState));
  });
});
