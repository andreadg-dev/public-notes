# Filter array connector not finding a match when it should in PowerAutomate

`Tag: [ERROR_CLOUD_POWERAUTOMATE]`

**ERROR:** No explicit error message. No match in the filter output

Make sure that there are not leading or trailing spaces in both terms of comparison (you can make sure by using a `trim()` method) and make sure that both terms have the same letter casing since **the filter connector is CASE-SENSITIVE**. If you unsure about this, you can resort to the `toUpper()` or `toLower()` methods that can be applied on both terms so that casing is not an issue, for instance:

## EXAMPLE
**CONNECTOR**: 
```json
{
  "type": "Query",
  "inputs": {
    "from": "@body('HTTP_-_MS_Graph_GetAllDevices')?['value']",
    "where": "@equals(toUpper(item()?['serialNumber']),toUpper(variables('currentSerialNumber')))"
  },
  "runAfter": {
    "Set_Current_SerialNumber_var": [
      "Succeeded"
    ]
  }
}
```