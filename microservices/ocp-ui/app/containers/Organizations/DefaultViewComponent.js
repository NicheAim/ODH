import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { combineAddress, mapToTelecoms } from 'containers/App/helpers';
import { MANAGE_ORGANIZATION_URL, OCP_ADMIN_ROLE_CODE } from 'containers/App/constants';
import PanelToolbar from 'components/PanelToolbar';
import InfoSection from 'components/InfoSection';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledFlatButton from 'components/StyledFlatButton';
import OrganizationTable from 'components/OrganizationTable';
import OrganizationSlider from 'components/OrganizationSlider';
import messages from './messages';

class DefaultViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relativeTop: 0,
      openSlider: false,
    };
    this.onSize = this.onSize.bind(this);
    this.handleSliderOpen = this.handleSliderOpen.bind(this);
    this.handleSliderClose = this.handleSliderClose.bind(this);
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handleSliderOpen() {
    this.setState({ openSlider: true });
  }

  handleSliderClose() {
    this.setState({ openSlider: false });
  }

  render() {
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_ORGANIZATION_URL,
    };
    const { onSearch, onViewAll, onOrganizationClick, isShowViewAllButton, flattenOrganizationData, organizationData, showSearchBarByDefault, hideToolbar, showSearchIcon } = this.props;
    return (
      <div>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={OCP_ADMIN_ROLE_CODE}
          onSearch={onSearch}
          onSize={this.onSize}
          showSearchBarByDefault={showSearchBarByDefault}
          hideToolbar={hideToolbar}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
          showSearchIcon={showSearchIcon}
        />
        {isShowViewAllButton &&
        <InfoSection margin="10px 0">
          <HorizontalAlignment position="end">
            <StyledFlatButton color="primary" onClick={onViewAll}>
              <FormattedMessage {...messages.viewAllButton} />
            </StyledFlatButton>
          </HorizontalAlignment>
        </InfoSection>
        }
        <InfoSection margin="0 0 10px 0">
          <OrganizationTable
            relativeTop={this.state.relativeTop}
            organizationData={organizationData}
            onRowClick={onOrganizationClick}
            flattenOrganizationData={flattenOrganizationData}
            onOrganizationViewDetails={this.handleSliderOpen}
            combineAddress={combineAddress}
            mapToTelecoms={mapToTelecoms}
          />
        </InfoSection>
        {this.props.organizationInContext &&
        <OrganizationSlider
          open={this.state.openSlider}
          onClose={this.handleSliderClose}
          organization={this.props.organizationInContext}
          flattenOrganizationData={flattenOrganizationData}
        />
        }
      </div>
    );
  }
}

DefaultViewComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onOrganizationClick: PropTypes.func.isRequired,
  onViewAll: PropTypes.func.isRequired,
  isShowViewAllButton: PropTypes.bool.isRequired,
  flattenOrganizationData: PropTypes.func.isRequired,
  organizationInContext: PropTypes.object,
  organizationData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handlePageClick: PropTypes.func.isRequired,
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
      name: PropTypes.string.isRequired,
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
    })).isRequired,
  }),
  showSearchBarByDefault: PropTypes.bool,
  hideToolbar: PropTypes.bool,
};

export default DefaultViewComponent;
