/**
 *
 * ManageUsersPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import renderUserRegistration from 'containers/UserRegistration/render';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';


export const initialStateMetadata =
  {
    settings: {
      hasHeaders: true,
      constrainDragToContainer: false,
      reorderEnabled: true,
      selectionEnabled: false,
      popoutWholeStack: false,
      blockedPopoutsThrowError: true,
      closePopoutsOnUnload: true,
      showPopoutIcon: false,
      showMaximiseIcon: true,
      showCloseIcon: false,
      responsiveMode: 'onload',
      tabOverlapAllowance: 0,
      reorderOnTabMenuClick: true,
      tabControlOffset: 10,
    },
    dimensions: {
      borderWidth: 10,
      borderGrabWidth: 15,
      minItemHeight: 200,
      minItemWidth: 450,
      headerHeight: 40,
      dragProxyWidth: 300,
      dragProxyHeight: 200,
    },
    labels: {
      close: 'close',
      maximise: 'maximise',
      minimise: 'minimise',
      popout: 'open in new window',
      popin: 'pop in',
      tabDropdown: 'additional tabs',
    },
    content: [{
      type: 'column',
      isClosable: true,
      reorderEnabled: true,
      title: '',
      content: [
        {
          title: 'User Management',
          type: 'component',
          componentName: 'userManagement',
          isClosable: true,
          reorderEnabled: true,
        },
      ],
    }],
    isClosable: true,
    reorderEnabled: true,
    title: '',
    openPopouts: [],
    maximisedItemId: null,
  };

export const componentMetadata = [
  { name: 'userManagement', text: 'userManagement', factoryMethod: renderUserRegistration },
];

export class ManageUsersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Page>
        <Helmet>
          <title>User Manage Page</title>
          <meta name="description" content="User Manage page of Omnibus Care Plan application" />
        </Helmet>
        <GoldenLayout
          containerHeight="85vh"
          containerWidth="90vw"
          containerId="golden-admin-workspace"
          componentMetadata={componentMetadata}
          stateMetadata={initialStateMetadata}
        />
      </Page>
    );
  }
}

ManageUsersPage.propTypes = {};

export default ManageUsersPage;
