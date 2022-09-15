/**
 *
 * Attachments
 *
 */
import { AddCircle, Refresh } from '@material-ui/icons';
import CenterAlign from 'components/Align/CenterAlign';
import Card from 'components/Card';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import PanelToolbar from 'components/PanelToolbar';
import StyledIconButton from 'components/StyledIconButton';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
} from 'containers/App/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import { SUMMARY_VIEW_WIDTH } from 'containers/Tasks/constants';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { default as React } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { env_vars } from '../../../env';
import AttachmentsTable from '../../components/AttachmentsTable';
import AddNewItemSpan from '../../components/PanelToolbar/AddNewItemSpan';
import {
  getBinary,
  getDocumentReference,
  getDocumentReferences,
  initializeAttachments,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAttachments } from './selectors';

export class Attachments extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      openBinaryResource: false,
    };
    this.onSize = this.onSize.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleOnRowClick = this.handleOnRowClick.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.props.initializeAttachments();

    const { patient } = this.props;

    if (patient) {
      this.props.getDocumentReferences(patient.id);
    }
  }

  refreshData() {
    this.props.initializeAttachments();

    const { patient } = this.props;

    if (patient) {
      this.props.getDocumentReferences(patient.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      attachments: { binaryReference: oldBinaryRef },
    } = this.props;
    const {
      attachments: { binaryReference },
    } = nextProps;

    if (
      !isEqual(oldBinaryRef, binaryReference) &&
      nextProps &&
      nextProps.attachments &&
      nextProps.attachments.binaryReference
    ) {
      this.props.getBinary(nextProps.attachments.binaryReference);
    }

    const {
      attachments: {
        binaryResource: { data: oldData },
      },
    } = this.props;
    const {
      attachments: {
        binaryResource: { data },
      },
    } = nextProps;

    if (
      nextProps &&
      nextProps.attachments &&
      this.state.openBinaryResource &&
      nextProps.attachments.binaryResource &&
      nextProps.attachments.binaryResource.contentType &&
      nextProps.attachments.binaryResource.data
    ) {
      const linkSource = `data:${nextProps.attachments.binaryResource.contentType};base64,${nextProps.attachments.binaryResource.data}`;
      let attachmentWindow = window.open();
      attachmentWindow.document.write(
        `<iframe width="100%" height="100%" src="${linkSource}"></iframe>`
      );
      this.setState({ openBinaryResource: false });
    }
  }

  onSize(size) {
    const isExpanded =
      size && size.width ? Math.floor(size.width) > SUMMARY_VIEW_WIDTH : false;
    this.setState({ isExpanded });
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleOnRowClick(attachmentId) {
    this.setState({ openBinaryResource: true }, () => {
      this.props.getDocumentReference(attachmentId);
    });
  }

  render() {
    const {
      attachments: { loading: loadingAttachment, data: dataAttachment },
    } = this.props;

    const reducedAttachments = dataAttachment.elements;

    const { patient } = this.props;

    const assessmentsServerBaseUrl =
      env_vars.REACT_APP_ASSESSMENTS_SERVER_BASE_URL;
    const assessmentInitialInterview =
      env_vars.REACT_APP_ASSESSMENT_INITIAL_INTERVIEW;


    return (
      <Card minWidth={'auto'}>
        <PanelToolbar
          customNewButton={[
            <AddNewItemSpan
              onClick={() => {
                this.refreshData();
              }}
            >
              <StyledIconButton
                size="x-small"
                svgIconSize="small"
                disableIconHover
              >
                <Refresh color={'#3275c1'} />
              </StyledIconButton>
              {'Reload'}
            </AddNewItemSpan>
          ]}
          allowedAddNewItemRoles={[
            CARE_COORDINATOR_ROLE_CODE,
            CARE_MANAGER_ROLE_CODE,
            ORGANIZATION_ADMIN_ROLE_CODE,
          ]}
          showSearchIcon={false}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
          onSize={this.handlePanelResize}
        />
        <LinearProgressIndicator loading={loadingAttachment} />
        {!loadingAttachment && (
          <div>
            <CenterAlign>
              <AttachmentsTable
                elements={reducedAttachments}
                onRowClick={this.handleOnRowClick}
              />
            </CenterAlign>
          </div>
        )}
      </Card>
    );
  }
}

Attachments.propTypes = {
  initializeAttachments: PropTypes.func.isRequired,
  getDocumentReferences: PropTypes.func.isRequired,
  getDocumentReference: PropTypes.func.isRequired,
  getBinary: PropTypes.func.isRequired,
  attachments: PropTypes.shape({
    data: PropTypes.shape({
      elements: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  patient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  attachments: makeSelectAttachments(),
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeAttachments: () => dispatch(initializeAttachments()),
    getDocumentReferences: (patientId) =>
      dispatch(getDocumentReferences(patientId)),
    getDocumentReference: (documentReferenceId) =>
      dispatch(getDocumentReference(documentReferenceId)),
    getBinary: (binaryId) => dispatch(getBinary(binaryId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'attachments', reducer });
const withSaga = injectSaga({ key: 'attachments', saga });

export default compose(withReducer, withSaga, withConnect)(Attachments);
