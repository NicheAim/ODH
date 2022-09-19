import { Grid } from 'styled-css-grid';

const ManagePatientFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    'generalInformationSubtitle'
    'contextGroup'
    'eligible'
    'firstName'
    'lastName'
    'birthDate'
    'genderCode'
    'birthSex'
    'race'
    'ethnicity'
    'language'
    'identifierGroup'
    'medicalId'
    'addresses'
    'contacts'
    'emergency-contact'
    'flags'
    'episodeOfCares'
    'coverages'
    'buttonGroup';

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'generalInformationSubtitle generalInformationSubtitle'
      'contextGroup contextGroup'
      'eligible eligible'
      'firstName lastName'
      'birthDate genderCode'
      'birthSex race'
      'ethnicity language'
      'identifierGroup identifierGroup'
      'medicalId medicalId'
      'contacts contacts'
      'emergency-contact emergency-contact'
      'addresses addresses'
      'flags flags'
      'episodeOfCares episodeOfCares'
      'coverages coverages'
      'buttonGroup .';
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      'generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle'
      'contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup'
      'eligible . . . . . . . . . . .'
      'firstName firstName firstName firstName lastName lastName lastName lastName . . . .'
      'birthDate birthDate birthDate birthDate genderCode genderCode birthSex birthSex . . . .'
      'race race ethnicity ethnicity ethnicity language language . . . . .'
      'identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup . . . . . . .'
      'medicalId medicalId medicalId medicalId medicalId . . . . . . .'
      'contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts'
      'emergency-contact emergency-contact emergency-contact emergency-contact emergency-contact emergency-contact emergency-contact emergency-contact emergency-contact emergency-contact emergency-contact emergency-contact'
      'addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses'
      'flags flags flags flags flags flags flags flags flags flags flags flags'
      'episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares'
      'coverages coverages coverages coverages coverages coverages coverages coverages coverages coverages coverages coverages'
      'buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .';
  }
`;

ManagePatientFormGrid.propTypes = Grid.propTypes;

export default ManagePatientFormGrid;
