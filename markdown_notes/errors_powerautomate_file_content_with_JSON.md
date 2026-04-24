# Get file content using path failing with JSON files in PowerAutomate

`Tag: [ERROR_CLOUD_POWERAUTOMATE]`

**ERROR**: InternalServerError Encountered internal server error

The solution is toggle the Infer Content Type flag to false (`"inferContentType": false`) instead of true. It can stay on true for formats like .xlsx, .csv, .txt, .pdf but not with .json files.  it’s a known SharePoint connector bug around application/json + content negotiation. Excel works because it goes through a different internal code path. The connector tries to:

- Detect content type
- Treat JSON as “structured response”
- Apply REST metadata logic
- Fails → 500 Internal Server Error


## EXAMPLE

**CONNECTOR:** Get file content using path (name: Get_file_content_using_path)

```json
{
  "type": "OpenApiConnection",
  "inputs": {
    "parameters": {
      "dataset": "https://[domain].sharepoint.com/sites/[site_name]",
      "path": "/[pathToFile].json",
      "inferContentType": false
    },
    "host": {
      "apiId": "/providers/Microsoft.PowerApps/apis/shared_sharepointonline",
      "connection": "shared_sharepointonline",
      "operationId": "GetFileContentByPath"
    }
  },
  "runAfter": {}
}
```

**OUTPUT**
```json
{
    "statusCode": 200,
    "headers": {},
    "body": {
        "$content-type": "application/octet-stream",
        "$content": "Ww0KICB7DQogICA..."
    }
}
```

Once you get the output, the content will be in base64 so you must use the `decodeBase64()` method to decode it first and then the `json()` method if you need to parse it into an usable object by the power automate flow:

**CONNECTOR:** Compose

```json
{
  "type": "Compose",
  "inputs": "@json(decodeBase64(body('Get_file_content_using_path')?['$content']))",
  "runAfter": {
    "Get_file_content_using_path.json": [
      "Succeeded"
    ]
  }
}
```
