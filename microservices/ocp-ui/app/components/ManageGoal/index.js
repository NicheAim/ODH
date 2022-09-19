import { Formik } from 'formik';
import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';
import ManageGoalForm from './ManageGoalForm';
import messages from './messages';

function ManageGoal(props) {
  const {
    onSave,
    goalStatuses,
    goalAchievementStatuses,
    patient,
    requester,
    organization,
    planSuggestions,
    practitioners,
    goal,
  } = props;

  console.log('planSuggestions', planSuggestions);

  const planIdHtmlId = goal ? undefined : uniqueId('planId_');
  const descriptionHtmlId = uniqueId('description_');
  const achievementStatusHtmlId = uniqueId('achievementStatus_');
  const lifecycleStatusHtmlId = uniqueId('lifecycleStatus_');
  const startDateHtmlId = uniqueId('startDate_');
  const dueDateHtmlId = uniqueId('dueDate_');
  const ownerHtmlId = uniqueId('owner_');

  const formData = {
    goal,
    goalStatuses,
    goalAchievementStatuses,
    patient,
    requester,
    organization,
    planSuggestions,
    practitioners,
    planIdHtmlId,
    descriptionHtmlId,
    lifecycleStatusHtmlId,
    achievementStatusHtmlId,
    startDateHtmlId,
    dueDateHtmlId,
    ownerHtmlId,
  };

  const today = new Date();

  return (
    <div>
      <Formik
        initialValues={{
          ...(goal
            ? {
                [descriptionHtmlId]: get(goal, 'description.text'),
                [lifecycleStatusHtmlId]: get(goal, 'lifecycleStatus'),
                [achievementStatusHtmlId]: get(
                  goal,
                  'achievementStatus.coding[0].code'
                ),
                [startDateHtmlId]: moment(get(goal, 'startDate')).toDate(),
                [dueDateHtmlId]: moment(
                  get(goal, 'target[0].dueDate')
                ).toDate(),
              }
            : {
                [startDateHtmlId]: today,
              }),
        }}
        onSubmit={(values, actions) => {
          const planDefInfo = props.planSuggestions.find(
            (item) => item.value === values[planIdHtmlId]
          );

          const mergedValues = {
            ...values,
            [descriptionHtmlId]:
              planDefInfo && planDefInfo.label
                ? planDefInfo.label
                : values[descriptionHtmlId],
          };

          onSave(mergedValues, actions);
        }}
        enableReinitialize
        validationSchema={() =>
          yup.lazy((values) => {
            return yup.object().shape({
              ...getPlanIdField(planIdHtmlId, goal),

              [lifecycleStatusHtmlId]: yup
                .string()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              [achievementStatusHtmlId]: yup
                .string()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              ...getDateField(startDateHtmlId, today, goal),
              ...getDateField(dueDateHtmlId, today, goal),
              ...getOwnerField(ownerHtmlId, goal),
            });
          })
        }
        render={(formikProps) => (
          <ManageGoalForm {...formikProps} {...formData} />
        )}
      />
    </div>
  );
}

function getPlanIdField(planIdHtmlId, goal) {
  return goal
    ? {}
    : {
        [planIdHtmlId]: yup
          .string()
          .required(<FormattedMessage {...messages.validation.required} />),
      };
}

function getDateField(dateFieldHtmlId, today, goal) {
  const startDateField = yup
    .date()
    .required(<FormattedMessage {...messages.validation.required} />);
  if (goal) {
    return {
      [dateFieldHtmlId]: startDateField,
    };
  }
  const yesterday = moment(today).add(-1, 'days').toDate();
  return {
    [dateFieldHtmlId]: startDateField.min(
      yesterday,
      <FormattedMessage {...messages.validation.minStartDate} />
    ),
  };
}

function getOwnerField(ownerHtmlId, goal) {
  return goal
    ? {}
    : {
        [ownerHtmlId]: yup
          .string()
          .required(<FormattedMessage {...messages.validation.required} />),
      };
}

ManageGoal.propTypes = {
  goal: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  planSuggestions: PropTypes.array.isRequired,
  goalStatuses: PropTypes.array.isRequired,
  goalAchievementStatuses: PropTypes.array.isRequired,
  practitioners: PropTypes.array.isRequired,
};

export default ManageGoal;
