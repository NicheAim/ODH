/**
 *
 * CardHeader
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import CardHeaderContainerGrid from './CardHeaderContainerGrid';
import CardHeaderContainerCell from './CardHeaderContainerCell';
import CardTitle from './CardTitle';

function CardHeader({ title, children }) {
  const childrenCount = React.Children.count(children);
  return (
    <CardHeaderContainerGrid columns={`1fr repeat(${childrenCount}, 150px)`}>
      <CardHeaderContainerCell>
        <CardTitle>{title}</CardTitle>
      </CardHeaderContainerCell>
      {React.Children.map(children, (child) => (
        <CardHeaderContainerCell key={uniqueId()}>
          {child}
        </CardHeaderContainerCell>
      ))}
    </CardHeaderContainerGrid>);
}

CardHeader.propTypes = {
  title: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default CardHeader;
