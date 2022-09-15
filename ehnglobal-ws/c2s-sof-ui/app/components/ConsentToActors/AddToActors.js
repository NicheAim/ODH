import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import union from 'lodash/union';

import Organizations from 'containers/Organizations';
import Practitioners from 'containers/Practitioners';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import OrganizationActors from 'components/SelectConsentActors/OrganizationActors';
import PractitionerActors from 'components/SelectConsentActors/PractitionerActors';
import messages from './messages';

class AddToActors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPractitioners: [],
      selectedOrganizations: [],
    };
    this.handleOrganizationSelect = this.handleOrganizationSelect.bind(this);
    this.handlePractitionerSelect = this.handlePractitionerSelect.bind(this);
    this.handleAddSelectedActors = this.handleAddSelectedActors.bind(this);
  }

  handleOrganizationSelect(selectedOrganization) {
    const orgReference = {
      reference: {
        logicalId: selectedOrganization.logicalId,
        type: 'Organization',
      },
      display: selectedOrganization.name,
      identifiers: selectedOrganization.identifiers,
    };
    this.setState({
      selectedOrganizations: [...this.state.selectedOrganizations, orgReference],
    });
  }

  handlePractitionerSelect(selectedPractitioner) {
    const practitionerReference = {
      reference: {
        logicalId: selectedPractitioner.logicalId,
        type: 'Practitioner',
      },
      display: mapToName(selectedPractitioner.name),
      identifiers: selectedPractitioner.identifiers,
    };
    this.setState({
      selectedPractitioners: [...this.state.selectedPractitioners, practitionerReference],
    });
  }

  handleAddSelectedActors() {
    const toActors = union(this.state.selectedPractitioners, this.state.selectedOrganizations);
    const fieldName = this.props.arrayHelpers.name;
    this.props.arrayHelpers.form.setFieldValue(fieldName, union(toActors, this.props.addedToActors));
    this.props.onCloseDialog();
  }

  render() {
    const {
      onCloseDialog,
      addedActors,
    } = this.props;
    return (
      <div>
        <Grid columns={1}>
          <Cell>
            <Organizations
              addedActors={addedActors}
              component={OrganizationActors}
              pageSize={3}
              onOrganizationClick={this.handleOrganizationSelect}
            />
          </Cell>
          <Cell>
            <Practitioners
              addedActors={addedActors}
              component={PractitionerActors}
              pageSize={3}
              onPractitionerSelect={this.handlePractitionerSelect}
            />
          </Cell>
          <Cell>
            <HorizontalAlignment position="end">
              <Grid columns={2}>
                <Cell>
                  <StyledRaisedButton fullWidth onClick={this.handleAddSelectedActors}>
                    <FormattedMessage {...messages.confirmButton} />
                  </StyledRaisedButton>
                </Cell>
                <Cell>
                  <StyledFlatButton fullWidth onClick={onCloseDialog}>
                    <FormattedMessage {...messages.cancelButton} />
                  </StyledFlatButton>
                </Cell>
              </Grid>
            </HorizontalAlignment>
          </Cell>
        </Grid>
      </div>
    );
  }
}

function mapToName(nameArray) {
  let name;
  if (!isEmpty(nameArray)) {
    const [{ firstName, lastName }] = nameArray;
    name = [firstName, lastName].filter(identity).join(' ');
  }
  return name;
}

AddToActors.propTypes = {
  onCloseDialog: PropTypes.func.isRequired,
  arrayHelpers: PropTypes.shape({
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  addedToActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
  addedActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
};

export default AddToActors;
