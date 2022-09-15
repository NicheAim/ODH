/**
 *
 * AddPermissionGroupForm
 *
 */

import React from 'react';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { Form, Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import yup from 'yup';
import merge from 'lodash/merge';
import filter from 'lodash/filter';
import find from 'lodash/find';
import union from 'lodash/union';

import Util from 'utils/Util';
import ListBoxField from 'components/ListBoxField';
import TextField from 'components/TextField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import PropTypes from 'prop-types';
import PermissionGroupInfoSection from './PermissionGroupInfoSection';
import messages from './messages';
import PermissionGroupPageTitle from './PermissonGroupPageTitle';

class AddPermissionGroupForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.initialValues !== null) {
      this.state = {
        selected: props.initialValues.scopes,
      };
    } else {
      this.state = {
        selected: [],
      };
    }
    this.onChange = this.onChange.bind(this);
    this.getAllOptions = this.getAllOptions.bind(this);
    this.collectScopeIdsWithinHierarchyRange = this.collectScopeIdsWithinHierarchyRange.bind(this);
    // HIERARCHY: read < update < create
    this.PERMISSION_HIERARCHY = ['read', 'update', 'create'];
  }

  onChange(selected) {
    this.setState((prevState) => {
      // Compare with previous state do identify the values added and removed
      const addedValues = selected.filter((v) => !prevState.selected.includes(v));
      const removedValues = prevState.selected.filter((v) => !selected.includes(v));
      const options = this.getAllOptions();
      // Map values to options which contains more details like displayName and description
      const addedOptions = addedValues && addedValues.map((v) => find(options, ({ value: v })));
      const removedOptions = removedValues && removedValues.map((v) => find(options, ({ value: v })));
      // Collections to keep additional adds/removes based on hierarchical relationship
      const hierarchicalAdds = this.collectScopeIdsWithinHierarchyRange(options, addedOptions, true);
      const hierarchicalRemoves = this.collectScopeIdsWithinHierarchyRange(options, removedOptions, false);
      // FinalSelection = selected + hierarchicalAdds - hierarchicalRemoves
      return ({ selected: filter(union(selected, hierarchicalAdds), (v) => !hierarchicalRemoves.includes(v)) });
    });
  }

  getAllOptions() {
    const { scopes } = this.props;
    const options = scopes.map(({ id, description, displayName }) => ({ value: id, label: description, displayName }));
    return options;
  }

  /**
   * Searches and finds other scopes following a specific naming convention
   * considering a group of moving scopes options and the hierarchical relationship direction to scan.
   *
   * In order for this to work, the scope names need to follow a naming convention as $resource_$action
   * using _ as the delimiter.
   *
   * @param allOptions the options based on all scopes
   * @param movingOptions the options based on a selected group of scopes that are moving
   * @param includeDirectionLower boolean value to specify the hierarchy include direction. true to scan lower scopes in the hierarchy, false to scan higher levels.
   * @returns {Array} array of collected additional scope IDs based on the hierarchy scan direction and relationships
   */
  collectScopeIdsWithinHierarchyRange(allOptions, movingOptions, includeDirectionLower) {
    const collectedScopeIds = [];
    // Identify and collect additional scope IDs based on moving options and hierarchy scan direction
    movingOptions.forEach(({ displayName }) => {
      // Identify the resource and action segments of the scope display name using _ as the delimiter
      const splitScope = displayName.split('_');
      // The scope display name must have two segments (resource, action) in order to qualify
      if (splitScope.length === 2) {
        const resource = splitScope[0];
        const action = splitScope[1];
        const actionIndex = this.PERMISSION_HIERARCHY.indexOf(action);
        // The action must be defined in PERMISSION_HIERARCHY in order to qualify
        if (actionIndex > -1) {
          // If the include direction is towards lower in hierarchy, the range should be [0, actionIndex]
          // If the include direction is towards higher in hierarchy, the range should be [actionIndex, lastIndex]
          const start = includeDirectionLower ? 0 : actionIndex + 1;
          const end = includeDirectionLower ? actionIndex : this.PERMISSION_HIERARCHY.length;
          for (let i = start; i < end; i += 1) {
            const collectedDisplayName = `${resource}_${this.PERMISSION_HIERARCHY[i]}`;
            filter(allOptions, { displayName: collectedDisplayName }).forEach(({ value }) => collectedScopeIds.push(value));
          }
        }
      }
    });
    return collectedScopeIds;
  }

  render() {
    const options = this.getAllOptions();
    const namePattern = new RegExp('^[a-zA-Z\\s]+$');
    const { selected } = this.state;
    const {
      handleCloseDialog,
      handleSaveGroup,
      initialValues,
    } = this.props;
    let initialGroup = null;
    if (initialValues !== null) {
      const { id, displayName, description } = initialValues;
      initialGroup = {
        id,
        displayName: Util.deCamelize(displayName.split('.').pop()),
        description,
      };
    }
    return (
      <div>
        <Formik
          onSubmit={(values, actions) => {
            if (initialValues !== null) {
              handleSaveGroup(merge(values, { id: initialValues.id }), actions);
            } else {
              handleSaveGroup(values, actions);
            }
            handleCloseDialog();
          }}
          initialValues={initialGroup}
          validationSchema={yup.object().shape({
            displayName: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />))
              .matches(namePattern, (<FormattedMessage {...messages.validation.namePattern} />)),
            description: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            scopes: yup.array()
              .min(1)
              .required((<FormattedMessage {...messages.validation.required} />)),
          })}
          render={({ isSubmitting, dirty, isValid }) => (
            <Form>
              <PermissionGroupInfoSection>
                <Grid columns={3}>
                  <Cell width={1}>
                    <TextField
                      name="displayName"
                      hintText={<FormattedMessage {...messages.hintText.groupName} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.groupName} />}
                      fullWidth
                    />
                  </Cell>
                  <Cell width={3}>
                    <TextField
                      name="description"
                      hintText={<FormattedMessage {...messages.hintText.description} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
                      fullWidth
                    />
                  </Cell>
                </Grid>
              </PermissionGroupInfoSection>
              <PermissionGroupPageTitle>Add permissions</PermissionGroupPageTitle>
              <PermissionGroupInfoSection>
                <ListBoxField
                  name="scopes"
                  canFilter
                  availableLabel={'Scopes'}
                  selectedLabel={'Added Scopes'}
                  options={options}
                  selected={selected}
                  handleChange={this.onChange}
                />
              </PermissionGroupInfoSection>
              <div>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.saveButton} />
                </StyledRaisedButton>
                <StyledFlatButton type="reset" onClick={handleCloseDialog}>
                  <FormattedMessage {...messages.cancelButton} />
                </StyledFlatButton>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

AddPermissionGroupForm.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  handleSaveGroup: PropTypes.func.isRequired,
  scopes: PropTypes.array,
  initialValues: PropTypes.object,
};

export default AddPermissionGroupForm;
