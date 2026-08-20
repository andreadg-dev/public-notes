# USEFUL POWERSHELL FUNCTIONS

`Tag: [NOTES_ALL_POWERSHELL]`

In case you save these scripts in ps1 files, you can execute them via cmd with the following command: `pwsh.exe -ExecutionPolicy Bypass -File path\script.ps1`

**What does it do?**

This command starts **PowerShell 7+**, bypasses the normal PowerShell execution-policy restrictions for that process, and executes a PowerShell script named `script.ps1` located in the specified directory.

**Breakdown**

| Part                      | Meaning                                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `pwsh.exe`                | Launches **PowerShell 7+**. This is different from `powershell.exe`, which launches Windows PowerShell 5.1. |
| `-ExecutionPolicy Bypass` | Tells PowerShell to bypass execution-policy restrictions for this PowerShell process.                       |
| `-File`                   | Specifies that the following argument is a PowerShell script file to execute.                               |
| `path\script.ps1`         | Refers to `script.ps1` in the specified path                                                                |

**Index**

- [`Format-Date`](#format-date)
- [`Get-DeviceIdentityInfo`](#get-deviceidentityinfo)
- [Capturing Detailed API Errors in PowerShell](#capturing-detailed-api-errors-in-powershell)
- [Add icon to shortcut from PNG](#add-icon-to-shortcut-from-png)
- [`Get-IntuneDeviceHealth`](#get-intunedevicehealth)

## `Format-Date`

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

## `Get-DeviceIdentityInfo`

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

## Add icon to shortcut from PNG

```powershell
#===============================
# Convert the PNG to a True ICO
#===============================

# 1. Load Windows graphic systems
Add-Type -AssemblyName System.Drawing

# 2. Define your source PNG and where to save the REAL .ico file temporarily
$SourcePng = "C:\Path\To\YourSource.png"
$TrueIcoPath = "$env:TEMP\FixedIcon.ico" # Saved to Temp folder first to avoid Program Files blocks

# 3. Process the file translation
$Bitmap = [System.Drawing.Bitmap]::FromFile($SourcePng)
$IconHandle = $Bitmap.GetHicon()
$TrueIcon = [System.Drawing.Icon]::FromHandle($IconHandle)

# 4. Save the real icon container
$FileStream = New-Object System.IO.FileStream($TrueIcoPath, 'OpenOrCreate')
$TrueIcon.Save($FileStream)

# 5. Clean up system memory
$FileStream.Close()
$TrueIcon.Dispose()
$Bitmap.Dispose()

Write-Host "Success! A real .ico file has been created at: $TrueIcoPath" -ForegroundColor Green


#===============================
# Apply the Shortcut Update
#===============================

# 1. Define paths (Using the newly fixed icon from Step 1)
$ShortcutPath = "C:\Program Files\YourProgramFolder\Your Existing Shortcut.lnk"
$RealIconPath = "$env:TEMP\FixedIcon.ico"

# 2. Open the existing shortcut
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)

# 3. Inject the real icon
$Shortcut.IconLocation = "$RealIconPath, 0"

# 4. Save and commit changes
$Shortcut.Save()

# 5. Clear Windows Explorer's cache so the icon refreshes immediately
Stop-Process -Name explorer -Force
```

## `Get-IntuneDeviceHealth`

### Overview

`Get-IntuneDeviceHealth` is a local Windows PowerShell diagnostic function designed to evaluate the health of a Windows device from an Intune / MDM perspective.

The function does **not** query Microsoft Intune directly and does not require Microsoft Graph authentication. Instead, it derives its health assessment from local operating-system state:

- Windows certificate stores
- Intune Management Extension service
- Windows Device Enrollment service
- MDM enrollment event logs
- MDM synchronization events
- MDM policy-processing events

The result is returned as a structured `PSCustomObject`.

At a high level:

```text
                    Windows Device
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
     Certificates      Services        MDM Event Logs
          │               │                │
          │               │       ┌────────┼─────────┐
          │               │       │        │         │
          │               │       ▼        ▼         ▼
          │               │   Enrollment  Sync     Policy
          │               │       │        │         │
          └───────────────┴───────┴────────┴─────────┘
                                  │
                                  ▼
                         State normalization
                                  │
                                  ▼
                         Health evaluation
                                  │
                                  ▼
                          PSCustomObject
```

The function is intended for scenarios such as:

- Intune remediation scripts
- Proactive Remediations
- Endpoint diagnostics
- Device-health reporting
- Troubleshooting automation
- Local MDM state collection
- Fleet-level health reporting

---

##### Function Signature

The function exposes one optional parameter:

```powershell
Get-IntuneDeviceHealth [-LookbackDays <int>]
```

The declaration is:

```powershell
[ValidateRange(1, 90)]
[int]$LookbackDays = 30
```

The default behavior therefore examines the previous **30 days** of relevant event-log activity.

For example:

```powershell
Get-IntuneDeviceHealth
```

uses a 30-day lookback.

A 7-day window can be requested with:

```powershell
Get-IntuneDeviceHealth -LookbackDays 7
```

The accepted range is:

```text
1 <= LookbackDays <= 90
```

The maximum is intentionally limited to 90 days to prevent an accidentally expensive event-log query.

### Microsoft Intune MDM Device CA

The **Microsoft Intune MDM Device CA** certificate is a certificate authority (CA) certificate associated with **Microsoft Intune's Mobile Device Management (MDM)** infrastructure.

It is used as part of the **certificate-based trust relationship between a Windows device and Intune**. During device enrollment, Intune can provision certificates that allow the device to identify and authenticate itself as an Intune-managed device.

##### What it represents

The certificate essentially represents **trust in the Intune MDM device certificate infrastructure**. Its presence on a Windows device generally indicates that the device has been enrolled or managed through Intune/MDM and that certificate-based device management is being used.

It should **not** be confused with a certificate that identifies the user. It is primarily related to the **device's MDM identity and management relationship**.

##### What it is used for

Depending on the Intune configuration and Windows enrollment scenario, the certificate infrastructure can support:

- **Device authentication** to Intune/MDM services.
- Establishing and maintaining the device's **MDM enrollment identity**.
- Secure communication and trust between the Windows device and management infrastructure.
- Issuing or validating device certificates used by Intune-managed devices.
- Supporting certificate-based authentication for other services when configured through Intune.

##### In simple terms

You can think of **Microsoft Intune MDM Device CA** as part of the certificate-based **"chain of trust" for an Intune-managed Windows device**.

`Windows device → MDM enrollment → Intune certificate infrastructure → device authentication/management`

Its presence by itself does not mean that a particular application is using the certificate; rather, it is part of the **Intune MDM enrollment and device-management infrastructure**.

### IntuneManagementExtension and DmEnrollmentSvc services

##### `IntuneManagementExtension` (Intune Management Extension)

The **Intune Management Extension (IME)** is a Windows service used by Microsoft Intune to provide additional device-management capabilities beyond the native MDM functionality.

It is primarily used for:

- Deploying and running **PowerShell scripts**.
- Installing and managing **Win32 applications** (`.intunewin`).
- Running remediation scripts and other management tasks.
- Reporting the execution status and results of these actions back to Intune.

In short, **IME handles advanced management tasks and software/script deployment on Windows devices managed by Intune**.

##### `DmEnrollmentSvc` (Device Management Enrollment Service)

`DmEnrollmentSvc` is a Windows service associated with **device enrollment and MDM management**. It supports communication between Windows and the MDM service (such as Microsoft Intune) during enrollment and ongoing device management.

It is involved in tasks such as:

- Enrolling a Windows device into **MDM/Intune**.
- Processing MDM enrollment and management information.
- Supporting the application of **device management policies and configuration**.
- Maintaining the device's management relationship with the MDM service.

In short, **DmEnrollmentSvc supports the MDM enrollment and management infrastructure, while IntuneManagementExtension provides additional capabilities for scripts, Win32 apps, and other advanced management tasks**.

##### Quick comparison

| Service                     | Main purpose                                                            |
| --------------------------- | ----------------------------------------------------------------------- |
| `DmEnrollmentSvc`           | Windows MDM enrollment and policy/device-management communication       |
| `IntuneManagementExtension` | Intune scripts, Win32 apps, remediations, and advanced management tasks |

### Windows Event Log: DeviceManagement-Enterprise-Diagnostics-Provider/Admin

The **`Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin`** event log records events related to **Windows Mobile Device Management (MDM)** and enterprise device-management operations.

For Windows devices managed by **Microsoft Intune**, this log is useful for monitoring and troubleshooting **MDM policy processing, configuration changes, and device-management operations**.

##### Relevant Event IDs

The following event IDs can be used to distinguish successful MDM processing from operations that encountered errors:

| Event ID | Result     | Description                                                                                       |
| -------- | ---------- | ------------------------------------------------------------------------------------------------- |
| **71**   | ❌ Failure | Indicates that an MDM policy or management operation encountered a failure while being processed. |
| **72**   | ✅ Success | Indicates that the corresponding MDM policy or management operation was processed successfully.   |
| **75**   | ✅ Success | Indicates that an MDM management operation completed successfully.                                |
| **76**   | ❌ Failure | Indicates that an MDM management operation or policy processing encountered a failure.            |

##### Why these events are useful with Intune

When investigating a Windows device managed by **Microsoft Intune**, these events can help determine whether MDM operations are being successfully processed.

They are particularly useful for:

- Detecting **failed MDM policy processing**.
- Confirming that MDM operations completed successfully.
- Identifying configuration or policy application problems.
- Correlating Windows-side MDM activity with changes made through Intune.
- Investigating devices that appear enrolled but are not receiving or applying configuration correctly.

For failure events (**71 and 76**), the **event details/XML** are important because they can contain additional information such as the affected configuration, CSP, operation, and error/result code.

### Windows MDM Sync Events: DeviceManagement-Enterprise-Diagnostics-Provider

The **`Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider`** provider generates events related to **Windows MDM synchronization and policy processing**.

For Windows devices managed by **Microsoft Intune**, these events are useful for determining whether the device is successfully synchronizing with the MDM service and whether management policies are being processed successfully.

The events below can be grouped into two areas:

1. **MDM synchronization**
2. **Policy processing**

##### MDM Synchronization Events

| Event ID |        Result        | Description                                                                                                                                      |
| -------: | :------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------ |
|  **201** |      ❌ Failure      | Indicates an MDM synchronization operation that failed. This can be used as evidence of a failed device sync.                                    |
|  **202** |      ✅ Success      | Indicates a successful MDM synchronization operation. This can be used to identify the most recent successful device sync.                       |
|  **209** | ⚠️ Depends on result | Indicates an MDM synchronization operation where the **HRESULT/result value in the event determines whether the operation succeeded or failed**. |

##### Event 209 is special

Unlike events **201** and **202**, event **209** cannot be classified as success or failure based on the event ID alone.

The result is determined by the **HRESULT** contained in the event:

```text
Event 209
   │
   ├── HRESULT indicates success → ✅ Sync Success
   │
   └── HRESULT indicates failure → ❌ Sync Failure
```

This is why a monitoring script should inspect the event's HRESULT rather than automatically treating every **209** as either a success or a failure.

In the example logic:

```powershell
$lastSyncSuccess = $syncEvents | Where-Object {
    $_.Id -eq 202 -or
    ($_.Id -eq 209 -and (Test-HResultSuccess -EventInput $_))
}
```

**202** is always considered a successful sync, while **209** is considered successful only when its HRESULT indicates success.

Similarly:

```powershell
$lastSyncFailure = $syncEvents | Where-Object {
    $_.Id -eq 201 -or
    ($_.Id -eq 209 -and -not (Test-HResultSuccess -EventInput $_))
}
```

**201** is treated as a sync failure, while **209** is treated as a failure when its HRESULT indicates an unsuccessful operation.

---

##### Policy Processing Events

| Event ID |   Result   | Description                                                               |
| -------: | :--------: | ------------------------------------------------------------------------- |
|  **813** | ✅ Success | Indicates successful processing of an MDM policy/configuration operation. |
|  **814** | ✅ Success | Indicates successful processing of an MDM policy/configuration operation. |
|  **820** | ❌ Failure | Indicates that MDM policy processing encountered a failure.               |

These events are useful for determining whether **MDM policies/configuration were successfully processed on the Windows device**, rather than simply whether the device was able to perform an MDM synchronization.

The monitoring logic therefore treats:

```text
813 / 814 → Policy Success
820       → Policy Failure
```

---

##### Quick Reference

| Event ID | Category          |          Result          |
| -------: | ----------------- | :----------------------: |
|  **201** | MDM Sync          |        ❌ Failure        |
|  **202** | MDM Sync          |        ✅ Success        |
|  **209** | MDM Sync          | ⚠️ Determined by HRESULT |
|  **813** | Policy Processing |        ✅ Success        |
|  **814** | Policy Processing |        ✅ Success        |
|  **820** | Policy Processing |        ❌ Failure        |

##### Sync vs. Policy

It is useful to distinguish **synchronization** from **policy processing**:

```text
                 Windows MDM
                      │
          ┌───────────┴───────────┐
          │                       │
      MDM Sync              Policy Processing
          │                       │
   ┌──────┼──────┐          ┌─────┼─────┐
   │      │      │          │     │     │
  201    202    209        813   814   820
   ❌     ✅    ⚠️          ✅     ✅     ❌
```

A **successful sync does not necessarily mean that every policy was successfully applied**. For example, a device may successfully synchronize with Intune while a particular policy subsequently fails during processing.

Therefore, when troubleshooting an Intune-managed Windows device, it can be useful to look at both:

- **201 / 202 / 209** → _Did the device successfully synchronize with the MDM service?_
- **813 / 814 / 820** → _Was the MDM policy/configuration successfully processed?_

##### In short

**201 / 202 / 209** provide information about the **MDM synchronization state**, with **209 requiring inspection of the HRESULT** to determine success or failure.

**813 / 814 / 820** provide information about **MDM policy processing**, where **813 and 814 represent successful processing and 820 represents a failure**.

For monitoring purposes, this distinction is important because **"sync succeeded" and "policy succeeded" are two different things**.

### PowerShell Script

```powershell
function Get-IntuneDeviceHealth {

    [CmdletBinding()]
    param(
        [ValidateRange(1, 90)]
        [int]$LookbackDays = 30
    )

    # ---------------------------------------------------------
    # Helpers
    # ---------------------------------------------------------

    function Select-LatestEvent {
        [CmdletBinding()]
        param(
            [Parameter(Mandatory = $false)]
            [object[]]$Events,

            [Parameter(Mandatory = $true)]
            [int[]]$Ids
        )

        if (-not $Events) { return $null }

        return $Events |
        Where-Object { $_.Id -in $Ids } |
        Sort-Object TimeCreated -Descending |
        Select-Object -First 1
    }

    function Get-HResultValue {
        [CmdletBinding()]
        param(
            [Parameter(Mandatory = $true)]
            [System.Diagnostics.Eventing.Reader.EventRecord]$EventInput
        )

        try {
            # Prefer XML because it allows us to identify the
            # HRESULT by name rather than relying on property position.
            [xml]$xml = $EventInput.ToXml()

            $hResultNode = $xml.Event.EventData.Data |
            Where-Object { $_.Name -eq 'HRESULT' } |
            Select-Object -First 1

            if ($null -ne $hResultNode) { return [string]$hResultNode.'#text' }

            # Fallback for event schemas where HRESULT isn't exposed
            # through EventData with the expected name.
            # '^0x[0-9a-fA-F]+$' = The entire string must start with 0x and then contain one or more valid hexadecimal characters (0–9, a–f, or A–F) until the end.
            #'^-?\d+$' = The entire string must contain an optional minus sign (-) followed by one or more decimal digits (0–9), from start to end.
            if ($EventInput.Properties.Count -gt 0) {
                foreach ($property in $EventInput.Properties) {
                    if ($null -ne $property.Value) {
                        $value = [string]$property.Value

                        if ($value -match '^0x[0-9a-fA-F]+$' -or $value -match '^-?\d+$') { return $value } # Regexes: Does $value represent either a hexadecimal number starting with 0x, or a decimal integer?
                    }
                }
            }
        }
        catch { return $null }

        return $null
    }

    function Test-HResultSuccess {
        [CmdletBinding()]
        param(
            [Parameter(Mandatory = $true)]
            [System.Diagnostics.Eventing.Reader.EventRecord]$EventInput
        )

        $hResult = Get-HResultValue -EventInput $EventInput

        if ([string]::IsNullOrWhiteSpace($hResult)) { return $false }

        $normalized = $hResult.Trim()

        # '^0x0+$' = The entire string must start with 0x, followed by one or more 0 characters, and then end.
        # '^0+$' = The entire string must contain one or more zeros.
        if ($normalized -match '^0x0+$') { return $true }
        if ($normalized -match '^0+$') { return $true }
        return $false
    }

    function Get-ErrorState {
        [CmdletBinding()]
        param(
            [Parameter(Mandatory = $false)]
            $FailureEvent,

            [Parameter(Mandatory = $false)]
            $SuccessEvent
        )

        if ($null -eq $FailureEvent) { return $false }
        if ($null -eq $SuccessEvent) { return $true }
        return $FailureEvent.TimeCreated -gt $SuccessEvent.TimeCreated
    }

    function Get-EventState {
        [CmdletBinding()]
        param(
            [Parameter(Mandatory = $false)]
            $SuccessEvent,

            [Parameter(Mandatory = $false)]
            $FailureEvent
        )

        if ($null -eq $SuccessEvent -and $null -eq $FailureEvent) { return 'Unknown' }
        if ($null -eq $FailureEvent) { return 'Healthy' }
        if ($null -eq $SuccessEvent) { return 'Failed' }
        if ($FailureEvent.TimeCreated -gt $SuccessEvent.TimeCreated) { return 'Failed' }
        return 'Healthy'
    }


    # ---------------------------------------------------------
    # Initialization
    # ---------------------------------------------------------

    $collectionWarnings = @()

    $now = Get-Date
    $lookbackStart = $now.AddDays(-$LookbackDays)

    # ---------------------------------------------------------
    # Certificate
    # ---------------------------------------------------------

    $certificate = $null

    try {
        $certificate = Get-ChildItem Cert:\ -Recurse -ErrorAction Stop | Where-Object { $_.Subject -like '*Microsoft Intune MDM Device CA*' } |
        Sort-Object NotAfter -Descending |
        Select-Object -First 1
    }
    catch { $collectionWarnings += "Unable to enumerate the Windows certificate stores: $($_.Exception.Message)" }

    $certificateInstalled = $null -ne $certificate
    $certificateValid = $false
    $certificateExpiryDate = $null
    $daysToCertificateExpiry = 0

    if ($certificate) {

        $certificateExpiryDate = $certificate.NotAfter
        $certificateValid = $certificateExpiryDate -gt $now

        if ($certificateValid) {
            $daysToCertificateExpiry = [math]::Max(0, [int][math]::Floor(($certificateExpiryDate - $now).TotalDays))
        }
    }

    # This is intentionally a heuristic.
    # Presence of the Intune MDM certificate is treated as evidence
    # that the device has an Intune MDM enrollment.
    $intuneManaged = $certificateInstalled

    # ---------------------------------------------------------
    # Services
    # ---------------------------------------------------------

    $imeService = $null
    $enrollmentService = $null

    try { $imeService = Get-Service -Name 'IntuneManagementExtension' -ErrorAction SilentlyContinue }
    catch { $collectionWarnings += "Unable to query the Intune Management Extension service." }

    try { $enrollmentService = Get-Service -Name 'DmEnrollmentSvc' -ErrorAction SilentlyContinue }
    catch { $collectionWarnings += "Unable to query the Device Enrollment Service." }

    $imeServiceInstalled = $null -ne $imeService

    $imeServiceRunning =
    $imeServiceInstalled -and
    $imeService.Status -eq 'Running'

    $enrollmentServiceInstalled =
    $null -ne $enrollmentService

    $enrollmentServiceRunning =
    $enrollmentServiceInstalled -and
    $enrollmentService.Status -eq 'Running'

    # ---------------------------------------------------------
    # Enrollment / Auto-enrollment Events
    # ---------------------------------------------------------

    $adminEvents = @()

    try {
        $adminEvents = @(
            Get-WinEvent -FilterHashtable @{
                LogName   = 'Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin'
                Id        = 71, 72, 75, 76
                StartTime = $lookbackStart
                EndTime   = $now
            } -ErrorAction Stop
        )
    }
    catch { $collectionWarnings += "Unable to query the MDM Admin event log: $($_.Exception.Message)" }

    $failure71 = Select-LatestEvent -Events $adminEvents -Ids 71
    $success72 = Select-LatestEvent -Events $adminEvents -Ids 72
    $failure76 = Select-LatestEvent -Events $adminEvents -Ids 76
    $success75 = Select-LatestEvent -Events $adminEvents -Ids 75

    # Enrollment
    $enrollmentErrorDetected = Get-ErrorState -FailureEvent $failure71 -SuccessEvent $success72
    $enrollmentHealth = Get-EventState -SuccessEvent $success72 -FailureEvent $failure71

    # Automatic enrollment
    $autoEnrollmentErrorDetected = Get-ErrorState -FailureEvent $failure76 -SuccessEvent $success75
    $autoEnrollmentHealth = Get-EventState -SuccessEvent $success75 -FailureEvent $failure76

    # ---------------------------------------------------------
    # Synchronization / Policy Events
    # ---------------------------------------------------------

    $syncEvents = @()

    try {
        $syncEvents = @(
            Get-WinEvent -FilterHashtable @{
                ProviderName = 'Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider'
                Id           = 201, 202, 209, 813, 814, 820
                StartTime    = $lookbackStart
                EndTime      = $now
            } -ErrorAction Stop
        )
    }
    catch { $collectionWarnings += "Unable to query MDM synchronization events: $($_.Exception.Message)" }

    # ---------------------------------------------------------
    # Sync Success / Failure
    # ---------------------------------------------------------

    $lastSyncSuccess = $syncEvents | Where-Object { $_.Id -eq 202 -or ($_.Id -eq 209 -and (Test-HResultSuccess -EventInput $_)) } |
    Sort-Object TimeCreated -Descending |
    Select-Object -First 1

    $lastSyncFailure = $syncEvents | Where-Object { $_.Id -eq 201 -or ($_.Id -eq 209 -and -not (Test-HResultSuccess -EventInput $_)) } |
    Sort-Object TimeCreated -Descending |
    Select-Object -First 1

    # ---------------------------------------------------------
    # Policy Success / Failure
    # ---------------------------------------------------------

    $lastPolicySuccess = Select-LatestEvent -Events $syncEvents -Ids @(813, 814)
    $lastPolicyFailure = Select-LatestEvent -Events $syncEvents -Ids 820

    # ---------------------------------------------------------
    # Derived Sync / Policy State
    # ---------------------------------------------------------

    $syncHealth = Get-EventState -SuccessEvent $lastSyncSuccess -FailureEvent $lastSyncFailure
    $policyHealth = Get-EventState -SuccessEvent $lastPolicySuccess -FailureEvent $lastPolicyFailure

    $lastSyncFailed = $syncHealth -eq 'Failed'
    $lastPolicyApplyError = $policyHealth -eq 'Failed'

    # ---------------------------------------------------------
    # Health Checks
    # ---------------------------------------------------------

    $certificateHealth = $certificateInstalled -and $certificateValid
    $imeHealth = $imeServiceInstalled -and $imeServiceRunning
    $enrollmentServiceHealth = $enrollmentServiceInstalled -and $enrollmentServiceRunning

    # "Unknown" means there were no relevant events in the
    # configured lookback period. We don't automatically classify
    # an unknown state as failed.
    $enrollmentHealthPassed = $enrollmentHealth -ne 'Failed'
    $autoEnrollmentHealthPassed = $autoEnrollmentHealth -ne 'Failed'
    $syncHealthPassed = $syncHealth -ne 'Failed'
    $policyHealthPassed = $policyHealth -ne 'Failed'

    $healthChecksAllPassed =
    $intuneManaged `
        -and $certificateHealth `
        -and $imeHealth `
        -and $enrollmentServiceHealth `
        -and $enrollmentHealthPassed `
        -and $autoEnrollmentHealthPassed `
        -and $syncHealthPassed `
        -and $policyHealthPassed

    # ---------------------------------------------------------
    # Output
    # ---------------------------------------------------------

    [PSCustomObject]@{

        # -----------------------------------------------------
        # General
        # -----------------------------------------------------

        IntuneManaged                    = $intuneManaged
        HealthChecksAllPassed            = $healthChecksAllPassed
        LookbackDays                     = $LookbackDays
        DataCollectionWarnings           = if ($collectionWarnings.Count -gt 0) { $collectionWarnings -join ' | ' }else { $null }

        # -----------------------------------------------------
        # Certificate
        # -----------------------------------------------------

        CertificateInstalled             = $certificateInstalled
        CertificateValid                 = $certificateValid
        CertificateExpiryDate            = $certificateExpiryDate
        DaysToCertificateExpiry          = $daysToCertificateExpiry
        CertificateHealth                =
        if (-not $certificateInstalled) { 'Missing' }
        elseif (-not $certificateValid) { 'Expired' }
        else { 'Healthy' }

        # -----------------------------------------------------
        # Intune Management Extension
        # -----------------------------------------------------

        IMEServiceInstalled              = $imeServiceInstalled
        IMEServiceRunning                = $imeServiceRunning
        IMEHealth                        =
        if (-not $imeServiceInstalled) { 'Missing' }
        elseif (-not $imeServiceRunning) { 'Stopped' }
        else { 'Healthy' }

        # -----------------------------------------------------
        # Device Enrollment Service
        # -----------------------------------------------------

        DeviceEnrollmentServiceInstalled = $enrollmentServiceInstalled
        DeviceEnrollmentServiceRunning   = $enrollmentServiceRunning
        DeviceEnrollmentServiceHealth    =
        if (-not $enrollmentServiceInstalled) { 'Missing' }
        elseif (-not $enrollmentServiceRunning) { 'Stopped' }
        else { 'Healthy' }

        # -----------------------------------------------------
        # Enrollment
        # -----------------------------------------------------

        EnrollmentHealth                 = $enrollmentHealth
        EnrollmentErrorDetected          = $enrollmentErrorDetected
        EnrollmentErrorMessage           = if ($enrollmentErrorDetected -and $failure71) { $failure71.Message } else { $null }
        EnrollmentErrorDateTime          = if ($failure71) { $failure71.TimeCreated }else { $null }

        # -----------------------------------------------------
        # Automatic Enrollment
        # -----------------------------------------------------

        AutoEnrollmentHealth             = $autoEnrollmentHealth
        AutoEnrollmentErrorDetected      = $autoEnrollmentErrorDetected
        AutoEnrollmentErrorMessage       = if ($autoEnrollmentErrorDetected -and $failure76) { $failure76.Message }else { $null }
        AutoEnrollmentErrorDateTime      = if ($failure76) { $failure76.TimeCreated }else { $null }

        # -----------------------------------------------------
        # Synchronization
        # -----------------------------------------------------

        SyncHealth                       = $syncHealth
        LastSyncSuccessTime              = if ($lastSyncSuccess) { $lastSyncSuccess.TimeCreated }else { $null }
        LastSyncFailed                   = $lastSyncFailed
        LastSyncFailedTime               = if ($lastSyncFailure) { $lastSyncFailure.TimeCreated }else { $null }
        LastSyncFailureMessage           = if ($lastSyncFailure) { $lastSyncFailure.Message }else { $null }

        # -----------------------------------------------------
        # Policy
        # -----------------------------------------------------

        PolicyHealth                     = $policyHealth
        LastPolicyApplyError             = $lastPolicyApplyError
        LastPolicyErrorDetails           = if ($lastPolicyFailure) { $lastPolicyFailure.Message }else { $null }
        LastPolicyErrorTime              = if ($lastPolicyFailure) { $lastPolicyFailure.TimeCreated }else { $null }
    }
}

Get-IntuneDeviceHealth -LookbackDays 30


```
