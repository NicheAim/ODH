import React from 'react';
import PropTypes from 'prop-types';
import PanelToolbar from 'components/PanelToolbar';
import InfoSection from 'components/InfoSection';
import StyledText from 'components/StyledText';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import ConsentActorBanner from 'components/ConsentActorBanner';

class PractitionerActors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onSearch, onPractitionerSelect, flattenPractitionerData, practitionersData, addedActors } = this.props;
    const addedActorLogicalIds = addedActors.map((actor) => actor.reference.logicalId);
    return (
      <div>
        <StyledText fontWeight="700">Practitioners</StyledText>
        <PanelToolbar
          showToDoSpecificFilters={false}
          sticky={false}
          onSearch={onSearch}
        />
        <InfoSection margin="0 0 10px 0">
          {practitionersData.data && practitionersData.data.map((practitioner) => (
            <ConsentActorBanner
              key={practitioner.logicalId}
              onSelectActor={onPractitionerSelect}
              flattenActorData={flattenPractitionerData}
              actor={practitioner}
              isActorSelected={addedActorLogicalIds.includes(practitioner.logicalId)}
            />
          ))}
          <CenterAlignedUltimatePagination
            currentPage={practitionersData.currentPage}
            totalPages={practitionersData.totalNumberOfPages}
            onChange={practitionersData.handleChangePage}
          />
        </InfoSection>
      </div>
    );
  }
}

PractitionerActors.propTypes = {
  onSearch: PropTypes.func.isRequired,
  flattenPractitionerData: PropTypes.func.isRequired,
  onPractitionerSelect: PropTypes.func,
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

export default PractitionerActors;
