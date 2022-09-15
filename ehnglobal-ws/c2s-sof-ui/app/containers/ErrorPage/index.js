/**
 *
 * ErrorPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import queryString from 'query-string';
import { withStyles } from 'material-ui-next/styles';
import Paper from 'material-ui-next/Paper';
import Typography from 'material-ui-next/Typography';

import messages from './messages';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  }),
});

export function ErrorPage(props) {
  const { location, classes } = props;
  const { code, details } = queryString.parse(location.search);
  return (
    <div>
      <Helmet>
        <title>Error</title>
        <meta name="description" content="Error" />
      </Helmet>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          <FormattedMessage {...messages.header} />
        </Typography>
        <Typography component="p">
          {messages[code] ?
            <FormattedMessage {...messages[code]} values={{ details }} /> :
            <FormattedMessage {...messages.invalidErrorCode} values={{ details }} />}
        </Typography>
      </Paper>
    </div>
  );
}

ErrorPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  classes: PropTypes.object,
};

export default compose(
  withStyles(styles),
)(ErrorPage);
