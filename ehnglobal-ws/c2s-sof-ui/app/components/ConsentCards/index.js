/**
 *
 * ConsentCards
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinearProgress } from 'material-ui-next/Progress';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RecordsRange from 'components/RecordsRange';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import ConsentCard from 'components/ConsentCard';
import messages from './messages';


function ConsentCards(props) {
  const { consentData } = props;
  return (
    <div>
      {consentData.loading && <LinearProgress />}

      {!consentData.loading && consentData.data && consentData.data.length === 0 &&
      <CenterAlign>
        <NoResultsFoundText><FormattedMessage {...messages.noConsentFoundText} /></NoResultsFoundText>
      </CenterAlign>
      }

      {!consentData.loading && consentData.data && consentData.data.length > 0 &&
      <div>
        {!isEmpty(consentData.data) && consentData.data.map((consent) => (
          <ConsentCard
            key={uniqueId()}
            consent={consent}
            handleDeleteConsent={consentData.handleDeleteConsent}
            user={consentData.user}
          />
        ))}
        <CenterAlignedUltimatePagination
          currentPage={consentData.currentPage}
          totalPages={consentData.totalNumberOfPages}
          onChange={consentData.handlePageClick}
        />
        <RecordsRange
          currentPage={consentData.currentPage}
          totalPages={consentData.totalNumberOfPages}
          totalElements={consentData.totalElements}
          currentPageSize={consentData.currentPageSize}
        />
      </div>
      }
    </div>
  );
}

ConsentCards.propTypes = {
  consentData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handlePageClick: PropTypes.func.isRequired,
    handleDeleteConsent: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
      status: PropTypes.string,
      fromActor: PropTypes.array,
      toActor: PropTypes.array,
      period: PropTypes.shape({
        start: PropTypes.date,
        end: PropTypes.date,
      }),
    })).isRequired,
    user: PropTypes.shape({
      isPatient: PropTypes.bool.isRequired,
      fhirResource: PropTypes.shape({
        logicalId: PropTypes.string,
        name: PropTypes.array,
        identifiers: PropTypes.arrayOf(PropTypes.shape({
          system: PropTypes.string,
          oid: PropTypes.string,
          value: PropTypes.string,
          priority: PropTypes.number,
          display: PropTypes.string,
        })),
      }),
    }),
  }).isRequired,
};

export default ConsentCards;
