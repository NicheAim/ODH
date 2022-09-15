/**
 *
 * ConsentFormSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import StyledText from 'components/StyledText';
import ConsentFormSectionGrid from './ConsentFormSectionGrid';
import ConsentFormSectionCell from './ConsentFormSectionCell';
import ConsentFormSectionContentCell from './ConsentFormSectionContentCell';


function ConsentFormSection(props) {
  return (
    <ConsentFormSectionGrid columns={1}>
      <ConsentFormSectionCell>
        <StyledText color="primary" fontWeight={700} fontSize="16px">{props.title}</StyledText>
      </ConsentFormSectionCell>
      <ConsentFormSectionContentCell>
        {props.children}
      </ConsentFormSectionContentCell>
    </ConsentFormSectionGrid>
  );
}

ConsentFormSection.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default ConsentFormSection;
