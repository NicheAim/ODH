package gov.samhsa.ocp.smartcore.util;

import feign.FeignException;
import gov.samhsa.ocp.smartcore.service.exception.BadRequestException;
import gov.samhsa.ocp.smartcore.service.exception.ClientInterfaceException;
import gov.samhsa.ocp.smartcore.service.exception.DuplicateResourceFoundException;
import gov.samhsa.ocp.smartcore.service.exception.PreconditionFailedException;
import gov.samhsa.ocp.smartcore.service.exception.ResourceNotFoundException;
import gov.samhsa.ocp.smartcore.service.exception.UserAuthenticationFailure;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class ExceptionUtil {

    public static void handleFeignException(FeignException fe, String logErrorMessage) {
        int causedByStatus = fe.status();
        String errorMessage = getErrorMessageFromFeignException(fe);
        String logErrorMessageWithCode;
        switch (causedByStatus) {
            case 400:
                logErrorMessageWithCode = "400 - BAD REQUEST status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new BadRequestException(errorMessage);
            case 401:
                logErrorMessageWithCode = "401 - UNAUTHORIZED status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new UserAuthenticationFailure(errorMessage);
            case 404:
                logErrorMessageWithCode = "404 - NOT FOUND status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new ResourceNotFoundException(errorMessage);
            case 409:
                logErrorMessageWithCode = "409 - CONFLICT status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new DuplicateResourceFoundException(errorMessage);
            case 412:
                logErrorMessageWithCode = "412 - Precondition Failed status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new PreconditionFailedException(errorMessage);
            default:
                log.error("An unexpected instance of FeignException", fe);
                throw new ClientInterfaceException("An unknown error occurred while attempting to communicate");
        }
    }

    private static String getErrorMessageFromFeignException(FeignException fe) {
        String detailMessage = fe.getMessage();
        String array[] = detailMessage.substring(detailMessage.indexOf("{")+1, detailMessage.indexOf("}")).split("\"");
        if (array.length > 1) {
            return array[array.length-1];
        } else {
            return detailMessage;
        }
    }
}
