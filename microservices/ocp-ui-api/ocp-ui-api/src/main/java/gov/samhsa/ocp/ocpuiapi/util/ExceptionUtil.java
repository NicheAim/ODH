package gov.samhsa.ocp.ocpuiapi.util;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.service.exception.BadRequestException;
import gov.samhsa.ocp.ocpuiapi.service.exception.DuplicateResourceFoundException;
import gov.samhsa.ocp.ocpuiapi.service.exception.FisClientInterfaceException;
import gov.samhsa.ocp.ocpuiapi.service.exception.PreconditionFailedException;
import gov.samhsa.ocp.ocpuiapi.service.exception.ResourceNotFoundException;
import gov.samhsa.ocp.ocpuiapi.service.exception.UaaClientException;
import gov.samhsa.ocp.ocpuiapi.service.exception.UserAuthenticationFailure;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class ExceptionUtil {

    public static void handleFeignException(FeignException fe, String logErrorMessage) {
        int causedByStatus = fe.status();
        String errorMessage = getErrorMessageFromFeignException(fe);
        String logErrorMessageWithCode;
        switch (causedByStatus) {
            case 400:
                logErrorMessageWithCode = "Fis client returned a 400 - BAD REQUEST status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new BadRequestException(errorMessage);
            case 401:
                logErrorMessageWithCode = "Fis client returned a 401 - UNAUTHORIZED status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new UserAuthenticationFailure(errorMessage);
            case 404:
                logErrorMessageWithCode = "Fis client returned a 404 - NOT FOUND status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new ResourceNotFoundException(errorMessage);
            case 409:
                logErrorMessageWithCode = "Fis client returned a 409 - CONFLICT status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new DuplicateResourceFoundException(errorMessage);
            case 412:
                logErrorMessageWithCode = "Fis client returned a 412 - Precondition Failed status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new PreconditionFailedException(errorMessage);
            default:
                log.error("Fis client returned an unexpected instance of FeignException", fe);
                throw new FisClientInterfaceException("An unknown error occurred while attempting to communicate with Fis Client");
        }
    }

    public static void handleFeignExceptionFailToLogin(FeignException fe, String logErrorMessage) {
        int causedByStatus = fe.status();
        String errorMessage = getErrorMessageFromFeignException(fe);
        String logErrorMessageWithCode;
        switch (causedByStatus) {
            case 400:
                logErrorMessageWithCode = "Fis client returned a 400 - BAD REQUEST status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new BadRequestException(errorMessage);
            case 401:
                logErrorMessageWithCode = "Uaa client returned a 401 - UNAUTHORIZED status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new UserAuthenticationFailure(errorMessage);
            default:
                log.error("Uaa client returned an unexpected instance of FeignException", fe);
                throw new UaaClientException("An unknown error occurred while attempting to communicate with Uaa Client");
        }
    }

    public static void handleUaaException(FeignException fe, String logErrorMessage) {
        int causedByStatus = fe.status();
        String errorMessage = fe.getMessage();
        String logErrorMessageWithCode;
        switch (causedByStatus) {
            case 400:
                logErrorMessageWithCode = "UAA client returned a 400 - BAD REQUEST status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new BadRequestException(errorMessage);
            case 401:
                logErrorMessageWithCode = "UAA client returned a 401 - UNAUTHORIZED status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new UserAuthenticationFailure(errorMessage);
            case 404:
                logErrorMessageWithCode = "UAA client returned a 404 - NOT FOUND status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new ResourceNotFoundException(errorMessage);
            case 409:
                logErrorMessageWithCode = "UAA client returned a 409 - CONFLICT status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new DuplicateResourceFoundException(errorMessage);
            case 412:
                logErrorMessageWithCode = "UAA client returned a 412 - Precondition Failed status, indicating " + logErrorMessage;
                log.error(logErrorMessageWithCode, fe);
                throw new PreconditionFailedException(errorMessage);
            default:
                log.error("UAA client returned an unexpected instance of FeignException", fe);
                throw new FisClientInterfaceException("An unknown error occurred while attempting to communicate with Fis Client");
        }
    }

    private static String getErrorMessageFromFeignException(FeignException fe) {
        String detailMessage = fe.getMessage();
        String array[] = detailMessage.split("message");
        if (array.length > 1) {
            return array[1].substring(array[1].indexOf("\":\"") + 3, array[1].indexOf("\",\""));
        } else {
            return detailMessage;
        }
    }
}
