# USEFUL POWERSHELL FUNCTIONS

`Tag: [NOTES_ALL_POWERSHELL]`

**Index**

- [FORMAT-DATE](#format-date)
- [GET-DEVICEIDENTITYINFO](#get-deviceidentityinfo)

## FORMAT-DATE

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

## GET-DEVICEIDENTITYINFO

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
