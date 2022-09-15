/**
 *
 * RoleSelectField
 *
 */

import styled from 'styled-components';
import SelectField from 'material-ui/SelectField';

const RoleSelectField = styled(SelectField)`
  width: ${(props) => props.width || 'auto'} !important;
`;

RoleSelectField.propTypes = {};

export default RoleSelectField;
