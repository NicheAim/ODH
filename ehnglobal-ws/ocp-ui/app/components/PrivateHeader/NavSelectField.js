/**
 *
 * NavSelectField
 *
 */

import styled from 'styled-components';
import SelectField from 'material-ui/SelectField';

const NavSelectField = styled(SelectField).attrs({
  style: {
    width: '370px',
  },
})('');

NavSelectField.propTypes = {};

export default NavSelectField;
