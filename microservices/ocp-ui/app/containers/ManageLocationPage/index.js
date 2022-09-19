/**
 *
 * ManageLocationPage
 *
 */

import ManageLocation from 'components/ManageLocation';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import PageHeader from 'components/PageHeader';
import { getLookupsAction } from 'containers/App/actions';
import {
  ADDRESSUSE,
  LOCATIONIDENTIFIERSYSTEM,
  LOCATIONPHYSICALTYPE,
  LOCATIONSTATUS,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
} from 'containers/App/constants';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import {
  makeSelectAddressUses,
  makeSelectLocationIdentifierSystems,
  makeSelectLocationPhysicalTypes,
  makeSelectLocationStatuses,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
  makeSelectUspsStates,
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
import { createLocation, getLocation, updateLocation } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLocation, makeSelectSaveLocationError } from './selectors';


export class ManageLocationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSaveLocation = this.handleSaveLocation.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const locationId = this.props.match.params.id;
    if (locationId) {
      this.props.getLocation(locationId);
    }
  }

  handleSaveLocation(location) {
    const logicalId = this.props.match.params.id;
    const { physicalType } = location;
    let code;
    if (!isUndefined(physicalType)) {
      code = physicalType;
      const selectedPhysicalType = find(this.props.locationPhysicalTypes, { code });
      merge(location, { physicalType: selectedPhysicalType });
    }

    if (logicalId && location) {
      const mergedLocation = merge(location, { logicalId });
      this.props.updateLocation(mergedLocation, this.props.organization.logicalId);
    } else {
      this.props.createLocation(location, this.props.organization.logicalId);
    }
  }

  render() {
    const {
      match,
      error,
      uspsStates,
      locationPhysicalTypes,
      locationStatuses,
      telecomSystems,
      telecomUses,
      addressUses,
      identifierSystems,
      organization,
      location,
    } = this.props;
    const logicalId = match.params.id;
    const editMode = !isUndefined(logicalId);
    let selectedLocation = null;
    if (editMode && location) {
      selectedLocation = location;
    }
    const localProps = {
      error,
      uspsStates,
      locationPhysicalTypes,
      locationStatuses,
      telecomSystems,
      telecomUses,
      addressUses,
      identifierSystems,
      selectedLocation,
      editMode,
      organization,
    };

    return (
      <Page>
        <Helmet>
          <title>ManageLocationPage</title>
          <meta name="description" content="Manage Location Page" />
        </Helmet>
        <PageHeader
          title={logicalId ?
            <FormattedMessage {...messages.updateHeader} /> :
            <FormattedMessage {...messages.createHeader} />}
        />
        <PageContent>
          <ManageLocation
            {...localProps}
            onSave={this.handleSaveLocation}
          />
        </PageContent>
      </Page>
    );
  }
}

ManageLocationPage.propTypes = {
  match: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  getLocation: PropTypes.func.isRequired,
  createLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  locationPhysicalTypes: PropTypes.array,
  locationStatuses: PropTypes.array,
  telecomSystems: PropTypes.array,
  telecomUses: PropTypes.array,
  location: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    managingLocationLogicalId: PropTypes.string,
    status: PropTypes.string,
    physicalType: PropTypes.object,
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
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
  }),
  addressUses: PropTypes.array,
  organization: PropTypes.object,
  identifierSystems: PropTypes.array,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  locationPhysicalTypes: makeSelectLocationPhysicalTypes(),
  locationStatuses: makeSelectLocationStatuses(),
  telecomSystems: makeSelectTelecomSystems(),
  organization: makeSelectOrganization(),
  telecomUses: makeSelectTelecomUses(),
  addressUses: makeSelectAddressUses(),
  identifierSystems: makeSelectLocationIdentifierSystems(),
  error: makeSelectSaveLocationError(),
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, LOCATIONSTATUS, LOCATIONPHYSICALTYPE, ADDRESSUSE, TELECOMSYSTEM, TELECOMUSE, LOCATIONIDENTIFIERSYSTEM])),
    createLocation: (location, organizationId) => dispatch(createLocation(location, organizationId)),
    updateLocation: (location, organizationId) => dispatch(updateLocation(location, organizationId)),
    getLocation: (locationId) => dispatch(getLocation(locationId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageLocationPage', reducer });
const withSaga = injectSaga({ key: 'manageLocationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageLocationPage);
