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

Demonstrates how to call a API endpoint from PowerShell and reliably capture the detailed error response returned by the API. In particular, it handles cases where `$_.Exception.Message` only contains a generic HTTP error and does not expose the JSON error payload returned by the API.

When available, the script retrieves the response body from the exception's response stream and reads it with `StreamReader`, allowing the actual API error details—such as the error code, message, request ID, and client request ID—to be displayed. This provides significantly more useful diagnostics than relying solely on `$_.Exception.Message`.

This approach is particularly useful when troubleshooting authentication and authorization failures, such as `InvalidAuthenticationToken`, where the underlying API response contains the actionable error message that may otherwise be hidden from the standard PowerShell exception.

In this instance I am using a MS Graph API endpoint as an example and purposely leaving out a bearer token to make the script generate an error:

```powershell
try {
    Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/me" -Method Get -UseBasicParsing
}
catch {
    $errorDetail = $_.ErrorDetails.Message
    if (-not $errorDetail -and $_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = [System.IO.StreamReader]::new($stream)
        $errorDetail = $reader.ReadToEnd()
    }
    else { $errorDetail = $_.Exception.Message }

    Write-Warning "Error when processing ${caseId}: $errorDetail"
}
```

Error output:

```json
{
  "error": {
    "code": "InvalidAuthenticationToken",
    "message": "Access token is empty.",
    "innerError": {
      "date": "2026-08-13T07:54:55",
      "request-id": "22a1ebe9-*",
      "client-request-id": "22a1ebe9-*"
    }
  }
}
```
