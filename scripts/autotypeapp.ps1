Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# ============================================================
# Auto-Type - Pure PowerShell / SendKeys
# ============================================================

$form = New-Object System.Windows.Forms.Form
$form.Text = "Auto-Type"
$form.Size = New-Object System.Drawing.Size(700, 400)
$form.StartPosition = "CenterScreen"
$form.MaximizeBox = $false
$form.TopMost = $true
$form.KeyPreview = $true
$form.Add_KeyDown({
        if ($_.KeyCode -eq [System.Windows.Forms.Keys]::Escape) {
            $form.Close()
        }
    })

# Store the last window that wasn't our own form
$script:LastTargetProcess = $null

# ------------------------------------------------------------
# Send text using SendKeys
# ------------------------------------------------------------

function Send-AutoTypeText {
    param(
        [string]$Text,
        [bool]$StripIndent = $false
    )

    if ([string]::IsNullOrEmpty($Text)) { return }

    $escaped = New-Object System.Text.StringBuilder

    # Normalize line endings so each line break is a single ENTER
    $Text = $Text -replace "`r`n|`r", "`n"

    # Target editors usually auto-indent after ENTER, so drop our own leading whitespace
    if ($StripIndent) {
        $Text = ($Text -split "`n" | ForEach-Object { $_.TrimStart(" ", "`t") }) -join "`n"
    }

    foreach ($char in $Text.ToCharArray()) {

        switch ($char) {

            "`n" { [void]$escaped.Append('{ENTER}') }
            "`t" { [void]$escaped.Append('{TAB}') }

            '+' { [void]$escaped.Append('{+}') }
            '^' { [void]$escaped.Append('{^}') }
            '%' { [void]$escaped.Append('{%}') }
            '~' { [void]$escaped.Append('{~}') }
            '(' { [void]$escaped.Append('{(}') }
            ')' { [void]$escaped.Append('{)}') }
            '{' { [void]$escaped.Append('{{}') }
            '}' { [void]$escaped.Append('{}}') }
            default { [void]$escaped.Append($char) }
        
        }
    } 

    # Switch away from this application and go back to the previous focused app
    [System.Windows.Forms.SendKeys]::Send("%{TAB}")
    
    # Give time for the switch before starting typing
    Start-Sleep -Seconds 1

    # Type the string
    [System.Windows.Forms.SendKeys]::Send($escaped)
}

# ------------------------------------------------------------
# Title
# ------------------------------------------------------------

$title = New-Object System.Windows.Forms.Label
$title.Text = "Auto-Type"
$title.Location = New-Object System.Drawing.Point(20, 15)
$title.Size = New-Object System.Drawing.Size(630, 30)
$title.Font = New-Object System.Drawing.Font(
    "Segoe UI",
    16,
    [System.Drawing.FontStyle]::Bold
)

$form.Controls.Add($title)

$info = New-Object System.Windows.Forms.Label
$info.Text = "Enter your values below, then click TYPE."
$info.Location = New-Object System.Drawing.Point(20, 50)
$info.Size = New-Object System.Drawing.Size(630, 25)

$form.Controls.Add($info)

# ------------------------------------------------------------
# Info
# ------------------------------------------------------------

$info = New-Object System.Windows.Forms.Label
$info.Text = "Enter your value below, then click TYPE."
$info.Location = New-Object System.Drawing.Point(20, 50)
$info.Size = New-Object System.Drawing.Size(630, 25)

$form.Controls.Add($info)

# ------------------------------------------------------------
# Textbox label
# ------------------------------------------------------------

$label = New-Object System.Windows.Forms.Label
$label.Text = "String:"
$label.Location = New-Object System.Drawing.Point(20, 90)
$label.Size = New-Object System.Drawing.Size(100, 25)

$form.Controls.Add($label)

# ------------------------------------------------------------
# Textbox
# ------------------------------------------------------------

$textBox = New-Object System.Windows.Forms.TextBox
$textBox.Location = New-Object System.Drawing.Point(20, 120)
$textBox.Size = New-Object System.Drawing.Size(645, 150)
$textBox.Multiline = $true
$textBox.ScrollBars = [System.Windows.Forms.ScrollBars]::Vertical

$form.Controls.Add($textBox)

# ------------------------------------------------------------
# Status
# ------------------------------------------------------------

$status = New-Object System.Windows.Forms.Label
$status.Text = "Ready"
$status.Location = New-Object System.Drawing.Point(20, 310)
$status.Size = New-Object System.Drawing.Size(150, 25)
$status.ForeColor = [System.Drawing.Color]::DarkGreen

$form.Controls.Add($status)

# ------------------------------------------------------------
# TYPE button
# ------------------------------------------------------------

$button = New-Object System.Windows.Forms.Button
$button.Text = "TYPE"
$button.Location = New-Object System.Drawing.Point(350, 300)
$button.Size = New-Object System.Drawing.Size(150, 30)

$button.Add_Click({

        $text = $textBox.Text

        if ([string]::IsNullOrEmpty($text)) {
            $status.Text = "Textbox is empty."
            $status.ForeColor = [System.Drawing.Color]::DarkRed
            return
        }

        Send-AutoTypeText -Text $text -StripIndent $stripCheck.Checked

        $status.Text = "Text sent."
        $status.ForeColor = [System.Drawing.Color]::DarkGreen
    })

$form.Controls.Add($button)

# ------------------------------------------------------------
# Cancel button
# ------------------------------------------------------------

$cancelButton = New-Object System.Windows.Forms.Button
$cancelButton.Text = "Cancel"
$cancelButton.Location = New-Object System.Drawing.Point(515, 300)
$cancelButton.Size = New-Object System.Drawing.Size(150, 30)
$cancelButton.Add_Click({
        $form.DialogResult = [System.Windows.Forms.DialogResult]::Cancel
        $form.Close()
    })

$form.Controls.Add($cancelButton)

# ------------------------------------------------------------
# Clear button
# ------------------------------------------------------------

$clearButton = New-Object System.Windows.Forms.Button
$clearButton.Text = "Clear"
$clearButton.Location = New-Object System.Drawing.Point(185, 300)
$clearButton.Size = New-Object System.Drawing.Size(150, 30)
$clearButton.Add_Click({
        $textBox.Clear()
        $textBox.Focus()
        $status.Text = "Cleared."
        $status.ForeColor = [System.Drawing.Color]::DarkGreen
    })

$form.Controls.Add($clearButton)

# ------------------------------------------------------------
# Strip indentation option
# ------------------------------------------------------------

$stripCheck = New-Object System.Windows.Forms.CheckBox
$stripCheck.Text = "Strip leading indentation (for auto-indenting editors)"
$stripCheck.Location = New-Object System.Drawing.Point(20, 275)
$stripCheck.Size = New-Object System.Drawing.Size(400, 22)
$stripCheck.Checked = $true

$form.Controls.Add($stripCheck)




# ------------------------------------------------------------
# Start
# ------------------------------------------------------------

[void]$form.ShowDialog()



<#
% stands for ALT button;
n stands for n button;
{TAB} stands for TAB button;
{ENTER} stands for ENTER button.
#>