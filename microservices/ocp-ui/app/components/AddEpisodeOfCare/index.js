/**
 *
 * AddEpisodeOfCare
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next';
import teal from 'material-ui-next/colors/teal';
import isEmpty from 'lodash/isEmpty';

import FormSubtitle from 'components/FormSubtitle';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledDialog from 'components/StyledDialog';
import AddEpisodeOfCareForm from './AddEpisodeOfCareForm';
import AddEpisodeOfCareTable from './AddEpisodeOfCareTable';
import messages from './messages';


class AddEpisodeOfCare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEpisodeOFCareDialogOpen: false,
      editingEpisodeOfCare: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditEpisodeOfCare = this.handleEditEpisodeOfCare.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isEpisodeOFCareDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isEpisodeOFCareDialogOpen: false,
      editingEpisodeOfCare: null,
    });
  }

  handleEditEpisodeOfCare(index, episodeOfCare) {
    this.setState((prevState) => ({
      isEpisodeOFCareDialogOpen: !prevState.isEpisodeOFCareDialogOpen,
      editingEpisodeOfCare: { index, episodeOfCare },
    }));
  }

  render() {
    const {
      errors, patientName, practitioners, episodeOfCareType,
      episodeOfCareStatus, practitioner, episodeOfCares,
    } = this.props;
    const editMode = !isEmpty(this.state.editingEpisodeOfCare);
    const addEpisodeOfCareFormProps = {
      patientName,
      practitioners,
      practitioner,
      episodeOfCareStatus,
      episodeOfCareType,
      episodeOfCares,
      editMode,
    };
    const addedEpisodeOfCareTableProps = {
      errors,
      episodeOfCares,
      episodeOfCareType,
    };
    return (
      <div>
        <div>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledAddCircleIcon color='#3275c1' />
            <FormattedMessage {...messages.episodeOfCareButtton} />
          </AddNewItemButton>
          <FieldArray
            name="episodeOfCares"
            render={(arrayHelpers) => (
              <div>
                <StyledDialog maxWidth="md" fullWidth open={this.state.isEpisodeOFCareDialogOpen}>
                  <DialogTitle>
                    {editMode ?
                      <FormattedMessage {...messages.editEpisodeOFCareDialogHeader} /> :
                      <FormattedMessage {...messages.addEpisodeOFCareDialogHeader} />
                    }
                  </DialogTitle>
                  <DialogContent>
                    <AddEpisodeOfCareForm
                      initialValues={this.state.editingEpisodeOfCare}
                      onAddEpisodeOfCare={arrayHelpers.push}
                      onRemoveEpisodeOfCare={arrayHelpers.remove}
                      handleCloseDialog={this.handleCloseDialog}
                      patientName={patientName}
                      {...addEpisodeOfCareFormProps}
                    />
                  </DialogContent>
                </StyledDialog>
                <AddEpisodeOfCareTable
                  onEditEpisodeOfCare={this.handleEditEpisodeOfCare}
                  arrayHelpers={arrayHelpers}
                  {...addedEpisodeOfCareTableProps}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

AddEpisodeOfCare.propTypes = {
  errors: PropTypes.object,
  patientName: PropTypes.string,
  practitioner: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  practitioners: PropTypes.array,
  episodeOfCareType: PropTypes.array,
  episodeOfCareStatus: PropTypes.array,
  episodeOfCares: PropTypes.array,
};

export default AddEpisodeOfCare;
