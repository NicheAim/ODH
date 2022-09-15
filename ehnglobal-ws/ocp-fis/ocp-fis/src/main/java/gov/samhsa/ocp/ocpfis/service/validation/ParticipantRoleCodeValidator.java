package gov.samhsa.ocp.ocpfis.service.validation;

import gov.samhsa.ocp.ocpfis.service.LookUpService;
import gov.samhsa.ocp.ocpfis.service.dto.ValueSetDto;
import gov.samhsa.ocp.ocpfis.service.exception.InvalidValueException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;
@Slf4j
public class ParticipantRoleCodeValidator implements ConstraintValidator<ParticipantRoleCodeConstraint, String> {

   @Autowired
   LookUpService lookUpService;

   @Override
   public void initialize(ParticipantRoleCodeConstraint constraint) {
   }

   public boolean isValid(String roleCodeToCheck, ConstraintValidatorContext context) {
      if(roleCodeToCheck == null) {
         //this value is optional
         return true;
      }

      List<ValueSetDto> list = lookUpService.getParticipantRoles();

      boolean isValid = list.stream().anyMatch(t -> t.getCode().equals(roleCodeToCheck));
      log.info("Participant Code Valid: "+isValid);
      if(!isValid) {
         throw new InvalidValueException("Received invalid Role Code for a Participant");
      }

      return isValid;
   }
}
