import React from 'react';
import PropTypes from 'prop-types';
import PanelToolbar from 'components/PanelToolbar';
import InfoSection from 'components/InfoSection';
import StyledText from 'components/StyledText';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import ConsentActorBanner from 'components/ConsentActorBanner';

class OrganizationActors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onSearch, flattenOrganizationData, organizationData, onOrganizationClick, addedActors } = this.props;
    const addedActorLogicalIds = addedActors.map((actor) => actor.reference.logicalId);
    return (
      <div>
        <StyledText fontWeight="700">Organizations</StyledText>
        <PanelToolbar
          showToDoSpecificFilters={false}
          sticky={false}
          onSearch={onSearch}
        />
        <InfoSection margin="0 0 10px 0">
          {organizationData.data && organizationData.data.map((organization) => (
            <ConsentActorBanner
              key={organization.logicalId}
              onSelectActor={onOrganizationClick}
              flattenActorData={flattenOrganizationData}
              actor={organization}
              isActorSelected={addedActorLogicalIds.includes(organization.logicalId)}
            />
          ))}
          <CenterAlignedUltimatePagination
            currentPage={organizationData.currentPage}
            totalPages={organizationData.totalNumberOfPages}
            onChange={organizationData.handlePageClick}
          />
        </InfoSection>
      </div>
    );
  }
}

OrganizationActors.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onOrganizationClick: PropTypes.func,
  flattenOrganizationData: PropTypes.func.isRequired,
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
  addedActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
};

export default OrganizationActors;
