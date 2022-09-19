package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.OutlookCalendarService;
import gov.samhsa.ocp.ocpfis.service.dto.OutlookCalendarDto;
import gov.samhsa.ocp.ocpfis.web.OutlookCalendarController;
import org.hamcrest.CoreMatchers;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RunWith(SpringRunner.class)
@WebMvcTest(value = OutlookCalendarController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
@Ignore
public class OutlookCalendarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OutlookCalendarService outlookCalendarService;

    @Test
    public void testGetOutlookAppointments() throws Exception {
        //Arrange
        OutlookCalendarDto outlookCalendarDto = createOutlookCalender();
        List<OutlookCalendarDto> outlookCalendarDtoList= new ArrayList<>();
        outlookCalendarDtoList.add(outlookCalendarDto);
        Mockito.when(outlookCalendarService.getOutlookCalendarAppointments("email", "12", Optional.empty(),Optional.empty())).thenReturn(outlookCalendarDtoList);

        //Act
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/outlook/calendar?emailAddress=email&password=12");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        //Assert
        Assert.assertThat(result.getResponse().getContentAsString(), CoreMatchers.containsString("thisSubject"));
    }

    private OutlookCalendarDto createOutlookCalender() {
        OutlookCalendarDto outlookCalendarDto = new OutlookCalendarDto();
        outlookCalendarDto.setSubject("thisSubject");
        return outlookCalendarDto;
    }

}