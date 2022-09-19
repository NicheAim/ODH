import { makeSelectPatient } from 'containers/App/contextSelectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PROP_TYPES } from './prop-types';
import { makeSelectGoals } from './selectors';

export function render(GoalsComponent, goalType) {
  GoalsComponent.propTypes = PROP_TYPES;

  const goalsSelector = makeSelectGoals(goalType);

  const mapStateToProps = createStructuredSelector({
    goals: goalsSelector(),
    patient: makeSelectPatient(),
  });

  function mapDispatchToProps(dispatch) {
    return {};
  }

  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  return compose(withConnect)(GoalsComponent);
}
