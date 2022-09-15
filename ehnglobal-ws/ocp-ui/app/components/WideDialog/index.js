/**
 *
 * WideDialog
 *
 */

import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

const WideDialog = styled(Dialog).attrs({
  contentStyle: {
    width: '85%',
    maxWidth: 'none',
  },
})('');

WideDialog.propTypes = {
  ...Dialog.propTypes,
};

export default WideDialog;

