/**
 *
 * AdminWorkspacePage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import renderOrganizationsComponent from 'containers/Organizations/render';
import renderPractitionersComponent from 'containers/Practitioners/render';
import renderPatientsComponent from 'containers/Patients/render';
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
      showCloseIcon: true,
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
      content: [
        {
          type: 'row',
          content: [{
            title: 'Organizations',
            type: 'component',
            componentName: 'organizations',
            isClosable: true,
            reorderEnabled: true,
          }],
        },
        {
          type: 'row',
          content: [
            {
              title: 'Practitioners / Resources',
              type: 'component',
              componentName: 'practitioners',
              isClosable: true,
              reorderEnabled: true,
            },
            {
              title: 'Clients',
              type: 'component',
              componentName: 'patients',
              isClosable: true,
              reorderEnabled: true,
            },
          ],
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
  { name: 'organizations', text: 'Organizations', factoryMethod: renderOrganizationsComponent },
  { name: 'practitioners', text: 'Practitioners', factoryMethod: renderPractitionersComponent },
  { name: 'patients', text: 'PATIENTS', factoryMethod: renderPatientsComponent },
];

export class AdminWorkspacePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Page color="workspaces">
        <Helmet>
          <title>Admin Workspace</title>
          <meta name="description" content="Admin workspace page of Omnibus Care Plan application" />
        </Helmet>
        <GoldenLayout
          containerHeight="85vh"
          containerWidth="95vw"
          containerId="golden-admin-workspace"
          componentMetadata={componentMetadata}
          stateMetadata={initialStateMetadata}
        />
      </Page>
    );
  }
}

AdminWorkspacePage.propTypes = {};

export default compose()(AdminWorkspacePage);
