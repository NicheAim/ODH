/**
 *
 * LoginStyledCard
 *
 */
import styled from 'styled-components';
import { Card } from 'material-ui/Card';

const LoginStyledCard = styled(Card).attrs({
  style: {
    backgroundColor: 'rgba(242, 242, 242, 1)',
    borderWidth: '1px',
  },
})('');

LoginStyledCard.propTypes = {};

export default LoginStyledCard;
