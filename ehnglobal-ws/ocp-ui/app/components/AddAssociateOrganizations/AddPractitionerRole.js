import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import SearchBar from 'components/SearchBar';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import PractitionerRoleForOrganizationTable from 'components/PractitionerRoleForOrganizationTable';
import messages from './messages';


function AddPractitionerRole(props) {
  const { onCloseDialog, onSearch, onChangePage, onAddPractitionerRole, organizations, roleType, specialtyType, existingOrganizations } = props;
  const { data, loading, currentPage, totalNumberOfPages } = organizations;
  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <LinearProgressIndicator loading={loading} />
      {!loading && data && data.length === 0 &&
      <CenterAlign>
        <NoResultsFoundText><FormattedMessage {...messages.noOrganizationsFound} /></NoResultsFoundText>
      </CenterAlign>
      }
      {!loading && data && data.length > 0 &&
      <div>
        <PractitionerRoleForOrganizationTable
          organizations={data}
          existingOrganizations={existingOrganizations}
          roleType={roleType}
          specialtyType={specialtyType}
          onCloseDialog={onCloseDialog}
          onAddPractitionerRole={onAddPractitionerRole}
        />
        <CenterAlignedUltimatePagination
          currentPage={currentPage}
          totalPages={totalNumberOfPages}
          onChange={onChangePage}
        />
      </div>
      }
    </div>
  );
}

AddPractitionerRole.propTypes = {
  onCloseDialog: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onAddPractitionerRole: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
  }),
  existingOrganizations: PropTypes.array,
  roleType: PropTypes.array,
  specialtyType: PropTypes.array,
};

export default AddPractitionerRole;
