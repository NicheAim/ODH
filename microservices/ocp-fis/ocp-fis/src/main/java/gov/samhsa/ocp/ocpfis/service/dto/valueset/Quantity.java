package gov.samhsa.ocp.ocpfis.service.dto.valueset;

public class Quantity {
    private String value;
    private String unit;
    private String system;
    private String code;

    public String getValue(){
        return this.value;
    }

    public void setValue(String value){
        this.value = value;
    }

    public String getUnit(){
        return this.unit;
    }

    public void setUnit(String unit){
        this.unit = unit;
    }

    public String getSystem(){
        return this.system;
    }

    public void setSystem(String system){
        this.system = system;
    }

    public String getCode(){
        return this.code;
    }

    public void setCode(String code){
        this.code = code;
    }
}
