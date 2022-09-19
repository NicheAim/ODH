/**
 *
 * ManageHealthcareServicePage
 *
 */

import ManageHealthcareService from 'components/ManageHealthcareService';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import PageHeader from 'components/PageHeader';
import { getLookupsAction } from 'containers/App/actions';
import {
  HEALTHCARESERVICECATEGORY,
  HEALTHCARESERVICEREFERRALMETHOD,
  HEALTHCARESERVICESPECIALITY,
  HEALTHCARESERVICESTATUS,
  HEALTHCARESERVICETYPE,
  TELECOMSYSTEM,
  TELECOMUSE,
} from 'containers/App/constants';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import {
  makeSelectHealthcareServiceCategories,
  makeSelectHealthcareServiceReferralMethods,
  makeSelectHealthcareServiceSpecialities,
  makeSelectHealthcareServiceStatuses,
  makeSelectHealthcareServiceTypes,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
} from 'containers/App/lookupSelectors';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Util from 'utils/Util';
import { createHealthcareService, getHealthcareServiceById, updateHealthcareService } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectHealthcareService } from './selectors';

export class ManageHealthcareServicePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getSelectedHealthcareService(logicalId);
    }
  }

  handleSave(healthcareServiceFormData, actions) {
    const hcsDataToSubmit = {};
    const {
      name, hcsProgramName, category, hcsType, hcsSpecialty, hcsStatus, hcsReferralMethod, telecomType, telecomValue,
    } = healthcareServiceFormData;

    if (!isUndefined(name)) {
      hcsDataToSubmit.name = name;
    }

    if (!isUndefined(hcsProgramName)) {
      const programName = [];
      programName.push(hcsProgramName);
      hcsDataToSubmit.programName = programName;
    }
    let code;
    if (!isUndefined(category)) {
      code = category;
      hcsDataToSubmit.category = find(this.props.healthcareServiceCategories, { code });
    }
    if (!isUndefined(hcsType)) {
      code = hcsType;
      const selectedType = find(this.props.healthcareServiceTypes, { code });
      const type = [];
      type.push(selectedType);
      hcsDataToSubmit.type = type;
    }
    if (!isUndefined(hcsSpecialty)) {
      code = hcsSpecialty;
      const selectedSpeciality = find(this.props.healthcareServiceSpecialities, { code });
      const specialty = [];
      specialty.push(selectedSpeciality);
      hcsDataToSubmit.specialty = specialty;
    }
    if (!isUndefined(hcsReferralMethod)) {
      code = hcsReferralMethod;
      const selectedReferralMethod = find(this.props.healthcareServiceReferralMethods, { code });
      const referralMethod = [];
      referralMethod.push(selectedReferralMethod);
      hcsDataToSubmit.referralMethod = referralMethod;
    }
    if (!isUndefined(telecomType) && !isUndefined(telecomValue)) {
      hcsDataToSubmit.telecom = [{
        system: telecomType,
        value: telecomValue,
      }];
    }

    Util.pickByIdentity(hcsDataToSubmit);
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      hcsDataToSubmit.active = hcsStatus;
      merge(hcsDataToSubmit, { logicalId });
      this.props.updateHealthcareService(hcsDataToSubmit, () => actions.setSubmitting(false));
    } else {
      hcsDataToSubmit.active = true;
      this.props.createHealthcareService(hcsDataToSubmit, () => actions.setSubmitting(false));
    }
  }

  render() {
    const {
      match,
      healthcareServiceCategories,
      healthcareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      healthcareServiceStatuses,
      telecomSystems,
      telecomUses,
      organization,
      healthcareService,
    } = this.props;
    const logicalId = match.params.id;
    const editMode = !isUndefined(logicalId);
    let currentHealthcareService = null;
    if (editMode && healthcareService) {
      currentHealthcareService = healthcareService;
    }
    const formProps = {
      healthcareServiceCategories,
      healthcareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      healthcareServiceStatuses,
      telecomSystems,
      telecomUses,
      organization,
      editMode,
      currentHealthcareService,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Healthcare Service</title>
          <meta name="description" content="Manage Healthcare Service page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={logicalId ?
            <FormattedMessage {...messages.updateHeader} />
            : <FormattedMessage {...messages.createHeader} />}
        />
        <PageContent>
          <ManageHealthcareService {...formProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageHealthcareServicePage.propTypes = {
  match: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  getSelectedHealthcareService: PropTypes.func.isRequired,
  healthcareServiceCategories: PropTypes.array,
  healthcareServiceTypes: PropTypes.array,
  healthcareServiceReferralMethods: PropTypes.array,
  healthcareServiceSpecialities: PropTypes.array,
  healthcareServiceStatuses: PropTypes.array,
  telecomSystems: PropTypes.array,
  telecomUses: PropTypes.array,
  organization: PropTypes.object,
  healthcareService: PropTypes.shape({
    organizationId: PropTypes.string,
    organizationName: PropTypes.string,
    locationId: PropTypes.string,
    locationName: PropTypes.string,
    active: PropTypes.bool,
    logicalId: PropTypes.string.isRequired,
    category: PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    }),
    programName: PropTypes.array,
    specialty: PropTypes.array,
    referralMethod: PropTypes.array,
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
    type: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    })),
    name: PropTypes.string,
    address: PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    }),
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
  }),
  createHealthcareService: PropTypes.func,
  updateHealthcareService: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  healthcareServiceCategories: makeSelectHealthcareServiceCategories(),
  healthcareServiceTypes: makeSelectHealthcareServiceTypes(),
  healthcareServiceReferralMethods: makeSelectHealthcareServiceReferralMethods(),
  healthcareServiceSpecialities: makeSelectHealthcareServiceSpecialities(),
  healthcareServiceStatuses: makeSelectHealthcareServiceStatuses(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  organization: makeSelectOrganization(),
  healthcareService: makeSelectHealthcareService(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([HEALTHCARESERVICECATEGORY, HEALTHCARESERVICETYPE, HEALTHCARESERVICEREFERRALMETHOD, HEALTHCARESERVICESPECIALITY, HEALTHCARESERVICESTATUS, TELECOMSYSTEM, TELECOMUSE])),
    createHealthcareService: (healthcareServiceFormData, handleSubmitting) => dispatch(createHealthcareService(healthcareServiceFormData, handleSubmitting)),
    updateHealthcareService: (healthcareServiceFormData, handleSubmitting) => dispatch(updateHealthcareService(healthcareServiceFormData, handleSubmitting)),
    getSelectedHealthcareService: (logicalId) => dispatch(getHealthcareServiceById(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageHealthcareServicePage', reducer });
const withSaga = injectSaga({ key: 'manageHealthcareServicePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageHealthcareServicePage);
