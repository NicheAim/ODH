/**
 *
 * RefreshIndicatorLoading
 *
 */

import styled from 'styled-components';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const RefreshIndicatorLoading = styled(RefreshIndicator).attrs({
  size: 50,
  left: -25,
  top: 0,
  loadingColor: '#FF9800',
  status: 'loading',
})`
  margin-top: 33%;
  margin-left: 50%;
`;

RefreshIndicatorLoading.propTypes = {};

export default RefreshIndicatorLoading;
