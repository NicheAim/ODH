import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import Util from 'utils/Util';

export function setInitialValue(initialValues) {
  let formValue = null;
  if (initialValues) {
    const episodeOfCare = initialValues.episodeOfCare;
    formValue = {
      ...episodeOfCare,
      startDate: new Date(episodeOfCare.startDate),
      endDate: new Date(episodeOfCare.endDate),
      careManager: episodeOfCare.careManager.reference,
    };
  }
  return formValue;
}

export function mapCareManager(values, practitioners) {
  const { careManager } = values;
  const selectedCareManager = find(practitioners, { reference: careManager });
  return {
    ...values,
    careManager: selectedCareManager,
  };
}

export function checkDuplicateEOC(episodeOfCares, formValue, editMode) {
  let isDuplicate = false;
  if (!editMode && formValue && formValue.status && formValue.type) {
    const { status, type } = formValue;
    const addedStatusesAndTypes = episodeOfCares && episodeOfCares.filter((episodeOfCare) => Util.equalsIgnoreCase(episodeOfCare.status, status) && Util.equalsIgnoreCase(episodeOfCare.type, type));
    isDuplicate = !isEmpty(addedStatusesAndTypes);
  }
  return isDuplicate;
}
