import PropTypes from 'prop-types';

export const PROP_TYPES = {
  initialize: PropTypes.func.isRequired,
  getGoals: PropTypes.func.isRequired,
  getCarePlan: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  patient: PropTypes.object,
  goalType: PropTypes.string.isRequired,
  useContextDisplayFilter: PropTypes.string.isRequired,
};
