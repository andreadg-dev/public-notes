# USEFUL POWERSHELL FUNCTIONS

`Tag: [NOTES_ALL_POWERSHELL]`

**Index**

- [FORMAT-DATE](#format-date)

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
