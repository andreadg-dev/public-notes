# USEFUL POWERSHELL FUNCTIONS

`Tag: [NOTES_ALL_POWERSHELL]`

**Index**

- [Format-Date](#format-date)
- [Get-DeviceIdentityInfo](#get-deviceidentityinfo)
- [Capturing Detailed API Errors in PowerShell](#capturing-detailed-api-errors-in-powershell)

## Format-Date

`Format-Date` is a PowerShell function that validates and normalizes dates provided in multiple supported formats. It detects the input date format using regular expressions, parses it using `DateTime.ParseExact`, and returns the date in the standard `yyyy-MM-dd` format.

The function also handles null, empty, and placeholder values such as `-` by returning an empty string. If the input format is unsupported or the date cannot be parsed, it throws a descriptive error.

```powershell
function Format-Date {
    [CmdletBinding()]
    param (
        [Parameter()]
        [object]$DateString
    )

    # Returns an empty string when the input date is null
    if ($null -eq $DateString) { return $null }

    # Returns the date already formatted correctly if the type is already datetime
    if ($DateString -is [datetime]) { return $DateString.ToString('yyyy-MM-dd') }

    # Trims the date string
    $inputDate = $DateString.Trim()

    # Returns an empty string when the input date is null, empty, whitespace, or contains a placeholder value: "-", "'-", or contains any letters except for 'AM' and 'PM'
    if (
        [string]::IsNullOrWhiteSpace($inputDate) -or
        (
            $inputDate -match "[a-zA-Z]" -and
            $inputDate -notmatch "(?i)\b(?:AM|PM)\b"
        ) -or
        $inputDate -match "^'?-$"
    ) { return $null }


    # Scoped formats
    $formats = @(
        'dd/MM/yyyy HH:mm:ss',
        'dd/MM/yyyy',
        'dd-MM-yyyy HH:mm:ss',
        'dd-MM-yyyy',
        'dd MM yyyy HH:mm:ss',
        'dd MM yyyy',
        'yyyy-MM-dd HH:mm:ss',
        'yyyy-MM-dd',
        'yyyy-MM-dd HH.mm.ss',
        'yyyy/MM/dd HH:mm:ss',
        'yyyy/MM/dd',
        'yyyy/MM/dd HH.mm.ss',
        'yyyy MM dd HH:mm:ss',
        'yyyy MM dd',
        'yyyy.MM.dd HH:mm:ss',
        'yyyy.MM.dd HH.mm.ss',
        'yyyy. MM. dd HH:mm:ss',
        'yyyy,MM,dd HH:mm:ss',
        "yyyy, MM, dd HH:mm:ss"
    )

    # Use regex to identify format patterns and parse directly
    switch -Regex ($inputDate) {
        # DD/MM/YYYY patterns
        '^\d{1,2}/\d{1,2}/\d{4}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'dd/MM/yyyy HH:mm:ss' } else { 'dd/MM/yyyy' }
            break
        }

        # DD-MM-YYYY patterns
        '^\d{1,2}-\d{1,2}-\d{4}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'dd-MM-yyyy HH:mm:ss' } else { 'dd-MM-yyyy' }
            break
        }

        # DD MM YYYY patterns (space separated)
        '^\d{1,2} \d{1,2} \d{4}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'dd MM yyyy HH:mm:ss' } else { 'dd MM yyyy' }
            break
        }

        # YYYY-MM-DD patterns (ISO format)
        '^\d{4}-\d{1,2}-\d{1,2}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'yyyy-MM-dd HH:mm:ss' } else { 'yyyy-MM-dd' }
            break
        }

        # YYYY-MM-DD HH.mm.ss patterns
        '^\d{4}-\d{1,2}-\d{1,2} \d{1,2}\.\d{1,2}\.\d{1,2}$' {
            $format = 'yyyy-MM-dd HH.mm.ss'
            break
        }

        # YYYY/MM/DD patterns
        '^\d{4}/\d{1,2}/\d{1,2}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'yyyy/MM/dd HH:mm:ss' } else { 'yyyy/MM/dd' }
            break
        }

        # YYYY/MM/DD HH.mm.ss patterns
        '^\d{4}/\d{1,2}/\d{1,2} \d{1,2}\.\d{1,2}\.\d{1,2}$' {
            $format = 'yyyy/MM/dd HH.mm.ss'
            break
        }

        # YYYY MM DD patterns (space separated)
        '^\d{4} \d{1,2} \d{1,2}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'yyyy MM dd HH:mm:ss' } else { 'yyyy MM dd' }
            break
        }

        # YYYY.MM.DD patterns
        '^\d{4}\.\d{1,2}\.\d{1,2}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'yyyy.MM.dd HH:mm:ss' } else { 'yyyy.MM.dd' }
            break
        }

        # YYYY.MM.DD HH.mm.ss patterns
        '^\d{4}\.\d{1,2}\.\d{1,2} \d{1,2}\.\d{1,2}\.\d{1,2}$' {
            $format = 'yyyy.MM.dd HH.mm.ss'
            break
        }

        # YYYY. MM. DD patterns (with spaces and dots)
        '^\d{4}\. \d{1,2}\. \d{1,2}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'yyyy. MM. dd HH:mm:ss' } else { 'yyyy. MM. dd' }
            break
        }

        # YYYY,MM,DD patterns
        '^\d{4},\d{1,2},\d{1,2}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'yyyy,MM,dd HH:mm:ss' } else { 'yyyy,MM,dd' }
            break
        }

        # YYYY, MM, DD patterns (with spaces after commas)
        '^\d{4}, \d{1,2}, \d{1,2}( \d{1,2}:\d{1,2}:\d{1,2})?$' {
            $format = if ($inputDate -match ' \d{1,2}:\d{1,2}:\d{1,2}$') { 'yyyy, MM, dd HH:mm:ss' } else { 'yyyy, MM, dd' }
            break
        }

        default {
            throw "ERROR: The input provided ($inputDate) is not in a supported format: `n • $($formats -join "`n • ")"
        }
    }

    try {
        $parsedDate = [datetime]::ParseExact(
            $inputDate,
            $format,
            [cultureinfo]::InvariantCulture
        )
        return $parsedDate.ToString('yyyy-MM-dd')
    }
    catch {
        throw "ERROR: Failed to parse date '$inputDate' with detected format '$format': $($_.Exception.Message)"
    }

}
```

## Get-DeviceIdentityInfo

Collects Windows Cloud Domain Join / Entra device registration information from the local registry. The function safely handles missing or inaccessible registry keys and returns the available device and registration details without interrupting the rest of the diagnostic collection process.

```powershell
function Get-DeviceIdentityInfo {

    Write-Host "Generating identity json file..." -ForegroundColor Yellow

    $finalOutput = [PSCustomObject]@{
        envVars          = $null
        whoami           = $null
        dsergcmd         = $null
        regJoinInfo      = $null
        regIdentityCache = $null
    }


    #====================================
    # Env variables
    #====================================
    $finalOutput.envVars = [PSCustomObject]@{
        envDNSDomain    = $env:USERDNSDOMAIN
        envUserDomain   = $env:USERDOMAIN
        envUserName     = $env:USERNAME
        envComputerName = $env:COMPUTERNAME
    }


    #====================================
    # Whoami cmd
    #====================================
    $whoamiUser = whoami /user /fo csv | ConvertFrom-Csv
    $finalOutput.whoami = [PSCustomObject]@{
        Upn      = whoami /upn
        UserName = $whoamiUser.'User Name'
        UserSID  = $whoamiUser.SID
    }


    #====================================
    # Intune device registration status cmd
    #====================================
    $dsergcmdObj = $null
    try {
        $dsergcmd = dsregcmd /status
        $dsergcmdObj = [PSCustomObject]@{}
        if ($dsergcmd) {
            $dsergcmdInfo = $dsergcmd | Select-String -Pattern "Device Name|DeviceId|TenantName|TenantId|Executing Account Name"
            $dsergcmdInfo | ForEach-Object {

                # Split the line in only 2 items at the first colon found and then replaces one or many whitespace characters after the parts are trimmed
                $parts = ([string]$_).Trim() -split ":", 2

                if ($parts.Count -eq 2) {
                    $name = $parts[0].Trim() -replace '\s+', ''
                    $value = $parts[1].Trim()

                    # Adds each line as a key value pair to the object
                    $dsergcmdObj | Add-Member -MemberType NoteProperty -Name $name -Value $value
                }
            }
        }
    }
    catch {
        Write-Warning "Unable to collect dsergcmd information: $($_.Exception.Message)"
    }

    # Setting output
    $finalOutput.dsergcmd = $dsergcmdObj


    #====================================
    # Join Info
    #====================================
    $joinInfo = $null
    try {
        $joinInfoGuid = Split-Path (Get-ChildItem "HKLM:\SYSTEM\CurrentControlSet\Control\CloudDomainJoin\JoinInfo" -ErrorAction Stop | Select-Object -First 1).Name -Leaf
        $joinInfo = Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Control\CloudDomainJoin\JoinInfo\${joinInfoGuid}" -ErrorAction Stop | Select-Object IdpDomain, TenantId, UserEmail, AttestationLevel, AikCertStatus, TransportKeyStatus, DeviceDisplayName, OsVersion, DdidUpToDate, DnsFullyQualifiedName, LastSyncTime, PSPath, PSParentPath, PSChildName

    }
    catch {
        Write-Warning "Unable to collect CloudDomainJoin information: $($_.Exception.Message)"
    }
    $finalOutput.regJoinInfo = $joinInfo


    #====================================
    # Identity Cache
    #====================================
    $identityCache = $null
    try {
        $loggedInUserSID = [System.Security.Principal.WindowsIdentity]::GetCurrent().User.Value
        $identityCacheId = Split-Path (Get-ChildItem "HKLM:\SOFTWARE\Microsoft\IdentityStore\Cache\$loggedInUserSID\IdentityCache" -ErrorAction Stop  | Select-Object -First 1).Name -Leaf
        $identityCache = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\IdentityStore\Cache\$loggedInUserSID\IdentityCache\$identityCacheId" -ErrorAction Stop | Select-Object UserName, SAMName, DisplayName, ProviderName, ProviderGUID, PSPath, PSParentPath, PSChildName
    }
    catch {
        Write-Warning "Unable to collect IdentityStore information: $($_.Exception.Message)"
    }
    $finalOutput.regIdentityCache = $identityCache


    #====================================
    # Convert to json end export to file
    #====================================
    try {
        $outputPath = "C:\temp\$($env:USERNAME)-$($env:COMPUTERNAME)-$((Get-Date).ToString("yyyyMMdd")).json"
        $finalOutput | ConvertTo-Json -Depth 10 | Out-File $outputPath -Encoding utf8

        if (Test-Path $outputPath) { Write-Host "File generated successfully: $outputPath!" -ForegroundColor Green; Invoke-Item "C:\temp" }
        else { Write-Host "Issue when generating file" -ForegroundColor Red }
    }
    catch {
        Write-Warning "Error while generating output json file: $($_.Exception.Message)"
    }

}
```

## Capturing Detailed API Errors in PowerShell

`Invoke-APICall` is a reusable PowerShell wrapper around `Invoke-RestMethod` designed to provide a consistent and comprehensive error object when an API request fails.

Rather than relying solely on PowerShell's default exception message, the function collects information from multiple layers of the failed request, including the API's response body, HTTP response details, and PowerShell execution context. This makes it useful when working with different API endpoints and platforms, where error responses and response object properties may vary.

### What it captures

When an API request fails, the function attempts to collect:

- **API error details** — Reads the response body from `ErrorDetails.Message` and falls back to the HTTP response stream when necessary.
- **Structured error responses** — Attempts to deserialize JSON error responses with `ConvertFrom-Json`. If the response is not JSON, the original response is preserved as a string.
- **HTTP response information** — Captures the HTTP status code, status description, response URI, and HTTP method.
- **PowerShell exception information** — Preserves the original exception message.
- **Execution context** — Includes the position of the failing command, the command itself, and the PowerShell script stack trace.
- **Timestamp** — Records when the error was captured using an ISO 8601 timestamp.

### Cross-version compatibility

The structure of the HTTP response object can differ between PowerShell and underlying .NET versions. To account for these differences, the function uses the most directly available response properties and falls back to the corresponding `RequestMessage` properties when necessary.

For example, the HTTP method is retrieved from `Response.Method` when available and falls back to `Response.RequestMessage.Method.Method` when it is not.

This approach helps maintain consistent error information across different PowerShell environments without depending on a single response-object implementation.

### Resulting error object

The function returns a `PSCustomObject` with the following properties:

| Property           | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `ErrorTimeStamp`   | Timestamp indicating when the error was captured.                                                   |
| `ResponseDetails`  | HTTP status code, status description, response URI, and HTTP method when a response is available.   |
| `ErrorDetails`     | The API response body, deserialized when it contains valid JSON or preserved as a string otherwise. |
| `ErrorMessage`     | The PowerShell exception message.                                                                   |
| `ErrorPosition`    | The position information associated with the failed invocation.                                     |
| `Code`             | The PowerShell command that generated the error.                                                    |
| `ScriptStackTrace` | The PowerShell script stack trace at the point of failure.                                          |

### Why use this approach?

API error responses are not always consistent. One endpoint may return a structured JSON error, another may return plain text, while the PowerShell exception itself may contain additional information that is not present in the API response.

`Invoke-APICall` therefore treats the error as information coming from **multiple sources rather than a single error message**. It preserves as much of the available information as possible while presenting it through a consistent object structure.

This makes the resulting error object suitable for:

- troubleshooting API requests
- logging and diagnostics
- investigating HTTP errors
- inspecting API-specific error codes and messages
- debugging PowerShell scripts
- working across different API platforms and endpoints

The function does not assume a particular API error schema, making it broadly reusable for REST APIs accessed through `Invoke-RestMethod`.

```powershell
function Invoke-APICall {
    try {
        Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/me" -Method Get -UseBasicParsing
    }
    catch {
        $errorDetails = $_.ErrorDetails.Message
        if (-not $errorDetails -and $_.Exception.Response) {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = [System.IO.StreamReader]::new($stream)

            try { $errorDetails = $reader.ReadToEnd() }
            finally { $reader.Dispose() }
        }

        # Try to parse the API response as JSON.
        # If it isn't JSON, keep the original response as a string.
        $errorDetailsObject = $errorDetails
        if ($errorDetails) {
            try { $errorDetailsObject = $errorDetails | ConvertFrom-Json -ErrorAction Stop }
            catch {} # Not JSON - Keep the original response as a string
        }

        $errorMsg = $_.Exception.Message

        # Retrieve response details if available.
        # Response properties can differ between PowerShell/.NET versions,
        # so fall back to the corresponding RequestMessage properties when needed.
        if ($_.Exception.Response) {
            $respDetails = $_.Exception.Response | Select-Object @{N = "StatusCode"; E = { [int]$_.StatusCode } },
            @{N = "StatusDescription"; E = { if ($_.StatusDescription) { $_.StatusDescription }else { $_.ReasonPhrase } } },
            @{N = "ResponseUri"; E = { if ($_.ResponseUri) { $_.ResponseUri }else { $_.RequestMessage.RequestUri.AbsoluteUri } } },
            @{N = "Method"; E = { if ($_.Method) { $_.Method } else { $_.RequestMessage.Method.Method } } }
        }

        # Set the rest of output object properties
        $errorOutput = [PSCustomObject]@{
            ErrorTimeStamp   = (Get-Date).ToString("o")
            ResponseDetails  = $respDetails
            ErrorDetails     = $errorDetailsObject
            ErrorMessage     = $errorMsg
            ErrorPosition    = $_.InvocationInfo.PositionMessage
            Code             = $_.InvocationInfo.Line.Trim()
            ScriptStackTrace = $_.ScriptStackTrace
        }

        return $errorOutput
    }
}
```

Error output:

```json
{
  "ErrorTimeStamp": "2026-08-13T15:03:10.2041417+02:00",
  "ResponseDetails": {
    "StatusCode": 401,
    "StatusDescription": "Unauthorized",
    "ResponseUri": "https://graph.microsoft.com/v1.0/me",
    "Method": "GET"
  },
  "ErrorDetails": {
    "error": {
      "code": "InvalidAuthenticationToken",
      "message": "Access token is empty.",
      "innerError": {
        "date": "2026-08-13T13:03:10",
        "request-id": "e6ea1bde-9f04-46a8-9705-824047cfd611",
        "client-request-id": "e6ea1bde-9f04-46a8-9705-824047cfd611"
      }
    }
  },
  "ErrorMessage": "Response status code does not indicate success: 401 (Unauthorized).",
  "ErrorPosition": "At line:3 char:9\r\n+         Invoke-RestMethod -Uri \"https://graph.microsoft.com/v1.0/me\"  …\r\n+         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "Code": "Invoke-RestMethod -Uri \"https://graph.microsoft.com/v1.0/me\" -Method Get -UseBasicParsing",
  "ScriptStackTrace": "at Invoke-APICall, <No file>: line 3\r\nat <ScriptBlock>, <No file>: line 50"
}
```
