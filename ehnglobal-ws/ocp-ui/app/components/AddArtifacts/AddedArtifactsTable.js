import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CustomErrorText from 'components/CustomErrorText';
import messages from './messages';

function AddedArtifactsTable(props) {
  const tableColumns = 'repeat(2, 1fr) 80px';
  const {
    errors,
    relatedArtifact,
    arrayHelpers,
    handleEditArtifact,
  } = props;
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.addedArtifactsTable.tableHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedArtifactsTable.tableHeaderArtifactType} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.relatedArtifact &&
        <CustomErrorText>{errors.relatedArtifact}</CustomErrorText>
        }
        {relatedArtifact && relatedArtifact.map((artifact, index) => {
          const { display, type } = artifact;
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.addedArtifactsTable.tableActionEdit} />,
            onClick: () => handleEditArtifact(index, artifact),
          }, {
            primaryText: <FormattedMessage {...messages.addedArtifactsTable.tableActionRemove} />,
            onClick: () => arrayHelpers.remove(index),
          }];
          return (
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{display}</TableRowColumn>
              <TableRowColumn>{type}</TableRowColumn>
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

AddedArtifactsTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object,
  handleEditArtifact: PropTypes.func.isRequired,
  relatedArtifact: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string,
    type: PropTypes.string,
  })),
};

export default AddedArtifactsTable;
