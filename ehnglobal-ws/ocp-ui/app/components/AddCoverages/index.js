/**
 *
 * AddCoverages
 *
 */

import AddCoverageForm from 'components/AddCoverages/AddCoverageForm';

import FormSubtitle from 'components/FormSubtitle';
import H1 from 'components/H1';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import { FieldArray } from 'formik';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import AddedCoverageTable from './AddedCoverageTable';
import messages from './messages';

class AddCoverages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCoverageDialogOpen: false,
      editingCoverage: null,
      isEditMode: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditCoverage = this.handleEditCoverage.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isCoverageDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isCoverageDialogOpen: false,
      editingCoverage: null,
      isEditMode: false,
    });
  }

  handleEditCoverage(index, coverage) {
    this.setState({ isEditMode: true });

    this.setState((prevState) => ({
      isCoverageDialogOpen: !prevState.isCoverageDialogOpen,
      editingCoverage: { index, coverage },
    }));
  }

  render() {
    const {
      errors,
      coverages,
      patientName,
      practitioner,
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      subscriptionOptions,
      composePatientReference,
      patient,
      getPatientFullName,
    } = this.props;
    const addCoverageFormProps = {
      patientName,
      practitioner,
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      subscriptionOptions,
      composePatientReference,
      getPatientFullName,
      patient,
    };
    const addedCoverageTableProps = {
      errors,
      coverages,
    };
    return (
      <div>
        <div>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddNewItemButton
            color="primary"
            fontWeight="bold"
            fontSize="15px"
            onClick={this.handleOpenDialog}
          >
            <StyledAddCircleIcon color="#3275c1" />
            <FormattedMessage {...messages.addCoverageButton} />
          </AddNewItemButton>
          <FieldArray
            name="coverages"
            render={(arrayHelpers) => (
              <div>
                <Dialog
                  title={
                    this.state.isEditMode ? (
                      <H1>
                        <FormattedMessage
                          {...messages.editCoverageDialogHeader}
                        />
                      </H1>
                    ) : (
                      <H1>
                        <FormattedMessage
                          {...messages.addCoverageDialogHeader}
                        />
                      </H1>
                    )
                  }
                  modal={false}
                  open={this.state.isCoverageDialogOpen}
                  onRequestClose={this.handleCloseDialog}
                >
                  <AddCoverageForm
                    initialValues={this.state.editingCoverage}
                    onAddCoverage={arrayHelpers.push}
                    onRemoveCoverage={arrayHelpers.remove}
                    handleCloseDialog={this.handleCloseDialog}
                    patientName={patientName}
                    {...addCoverageFormProps}
                  />
                </Dialog>
                <AddedCoverageTable
                  handleEditCoverage={this.handleEditCoverage}
                  arrayHelpers={arrayHelpers}
                  {...addedCoverageTableProps}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

AddCoverages.propTypes = {
  errors: PropTypes.object,
  coverages: PropTypes.array,
  patientName: PropTypes.string,
  practitioner: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  subscriptionOptions: PropTypes.array,
  policyHolderRelationship: PropTypes.array,
  coverageType: PropTypes.array,
  coverageFmStatus: PropTypes.array,
  composePatientReference: PropTypes.func,
  getPatientFullName: PropTypes.func,
  patient: PropTypes.object,
};

export default AddCoverages;
