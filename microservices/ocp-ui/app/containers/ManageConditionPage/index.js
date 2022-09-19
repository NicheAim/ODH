/**
 *
 * ManageConditionPage
 *
 */

import uniqueId from 'lodash/uniqueId';
import ManageCondition from 'components/ManageCondition';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import PageHeader from 'components/PageHeader';
import { getLookupsAction } from 'containers/App/actions';
import { CONDITIONS_PATIENT } from 'containers/App/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { makeSelectConditionsPatient } from 'containers/App/lookupSelectors';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createCondition, getCondition, updateCondition } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCondition } from './selectors';

export class ManageConditionPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const conditionId = this.props.match.params.id;
    if (conditionId) {
      this.props.getCondition(conditionId);
    }
  }

  handleSave(condition, actions) {
    console.log('handleSave');
    console.log(condition);
    console.log(actions);
    const conditionId = this.props.match.params.id;
    const mappedCondition = {
      ...condition,
      // code: condition.conditionCode,
      recordedDate:
        condition && condition.recordedDate
          ? moment(condition.recordedDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
          : null,
    };

    if (conditionId) {
      const conditionWithId = { ...mappedCondition, conditionId };
      this.props.updateCondition(conditionWithId, () =>
        actions.setSubmitting(false)
      );
    } else {
      this.props.createCondition(mappedCondition, () =>
        actions.setSubmitting(false)
      );
    }
  }

  render() {
    const { match, conditionsPatient, patient, condition } = this.props;
    const editMode = !isUndefined(match.params.id);
    let selectedCondition = null;
    if (editMode && condition) {
      selectedCondition = condition;
    }
    const manageConditionProps = {
      conditionsPatient,
      patient,
      editMode,
      selectedCondition,
    };
    return (
      <Page key={uniqueId()}>
        <Helmet>
          <title>Manage Condition</title>
          <meta
            name="description"
            content="Description of ManageConditionPage"
          />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          <ManageCondition {...manageConditionProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageConditionPage.propTypes = {
  conditionsPatient: PropTypes.array,
  match: PropTypes.object,
  createCondition: PropTypes.func.isRequired,
  updateCondition: PropTypes.func.isRequired,
  getLookups: PropTypes.func.isRequired,
  getCondition: PropTypes.func.isRequired,
  patient: PropTypes.object,
  condition: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  conditionsPatient: makeSelectConditionsPatient(),
  patient: makeSelectPatient(),
  condition: makeSelectCondition(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([CONDITIONS_PATIENT])),
    getCondition: (conditionId) => dispatch(getCondition(conditionId)),
    createCondition: (condition, handleSubmitting) =>
      dispatch(createCondition(condition, handleSubmitting)),
    updateCondition: (condition, handleSubmitting) =>
      dispatch(updateCondition(condition, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageConditionPage', reducer });
const withSaga = injectSaga({ key: 'manageConditionPage', saga });

export default compose(withReducer, withSaga, withConnect)(ManageConditionPage);
