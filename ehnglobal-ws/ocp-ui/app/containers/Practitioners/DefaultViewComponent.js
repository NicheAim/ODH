import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { combineAddress, mapToTelecoms } from 'containers/App/helpers';
import {
  MANAGE_ASSIGN_LOCATION_TO_PRACTITIONER_URL,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  DEFAULT_START_PAGE_NUMBER,
} from 'containers/App/constants';
import NewPractitionerResource from 'containers/NewPractitionerResource';
import PanelToolbar from 'components/PanelToolbar';
import InfoSection from 'components/InfoSection';
import PractitionerTable from 'components/PractitionerTable';
import messages from './messages';
import ShowHideWrapper from '../ShowHideWrapper';
import AddNewItemSpan from '../../components/PanelToolbar/AddNewItemSpan';
import StyledIconButton from '../../components/StyledIconButton';
import Refresh from '@material-ui/icons/Refresh';
import uniqueId from 'lodash/uniqueId';
import { getPractitionersInOrganization, initializePractitioners } from './actions';

class DefaultViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relativeTop: 0,
      modalOpen: false,
    };
    this.onSize = this.onSize.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleCloseModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      onClick: this.handleOpenModal,
    };
    const { onSearch, flattenPractitionerData, practitionersData, isOcpAdminRole } = this.props;
    return (
      <div>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={[OCP_ADMIN_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE]}
          onSearch={onSearch}
          customNewButton={[
            <ShowHideWrapper
              key={uniqueId()}
              allowedRoles={[
                CARE_COORDINATOR_ROLE_CODE,
                CARE_MANAGER_ROLE_CODE,
                ORGANIZATION_ADMIN_ROLE_CODE,
              ]}
            >
              <AddNewItemSpan
                onClick={() => {
                  this.props.initializePractitioners();
                  const { organization } = this.props;
                  if (organization) {
                    this.props.getPractitionersInOrganization(
                      DEFAULT_START_PAGE_NUMBER,
                      this.props.pageSize
                    );
                  }
                }}
              >
                <StyledIconButton
                  size="x-small"
                  svgIconSize="small"
                  disableIconHover
                >
                  <Refresh color={'#3275c1'} />
                </StyledIconButton>
                {'Reload'}
              </AddNewItemSpan>
            </ShowHideWrapper>,
          ]}
          onSize={this.onSize}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
        />
        <InfoSection margin="0 0 10px 0">
          <PractitionerTable
            relativeTop={this.state.relativeTop}
            practitionersData={practitionersData}
            flattenPractitionerData={flattenPractitionerData}
            combineAddress={combineAddress}
            mapToTelecoms={mapToTelecoms}
            assignLocationUrl={MANAGE_ASSIGN_LOCATION_TO_PRACTITIONER_URL}
            isOcpAdminRole={isOcpAdminRole}
          />
        </InfoSection>
        {this.state.modalOpen &&
        <NewPractitionerResource modalOpen={this.state.modalOpen} onModalClose={this.handleCloseModal} />
        }
      </div>
    );
  }
}

DefaultViewComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
  flattenPractitionerData: PropTypes.func.isRequired,
  isOcpAdminRole: PropTypes.bool,
  practitionersData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
      active: PropTypes.bool,
      name: PropTypes.array,
      addresses: PropTypes.arrayOf(PropTypes.shape({
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        stateCode: PropTypes.string,
        postalCode: PropTypes.string,
        countryCode: PropTypes.string,
        use: PropTypes.string,
      })),
      telecoms: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        value: PropTypes.string,
        use: PropTypes.string,
      })),
      practitionerRoles: PropTypes.array,
    })),
  }),
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    active: PropTypes.bool,
    name: PropTypes.string,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    })),
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }),
  pageSize: PropTypes.number,
  getPractitionersInOrganization: PropTypes.func.isRequired,
  initializePractitioners: PropTypes.func,
};

export default DefaultViewComponent;
