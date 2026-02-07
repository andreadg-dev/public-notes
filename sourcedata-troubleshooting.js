const placeholders = {
  sp_instance: `<span class="placeholder ph-sp_instance">{SP_INSTANCE}</span>`,
  sp_sitename: `<span class="placeholder ph-sp_sitename">{SP_SITENAME}</span>`,
};

const troubleshooting = {
  title: "troubleshooting",
  type: "list",
  navcategory: "menu",
  snippets: [
    {
      item: "notepad.exe",
      description: "Opens Notepad",
      category: "win-app",
      tags: ["windows", "apps"],
    },
    {
      item: "snippingtool.exe",
      description: "Opens Snipping tool",
      category: "win-app",
      tags: ["windows", "apps"],
    },
    {
      item: "netsh winsock reset catalog",
      description: "description",
      category: "win-network",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "netsh int ip reset resetlog.txt",
      description: "description",
      category: "win-network",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "netsh advfirewall reset",
      description: "description",
      category: "win-network",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "ipconfig /release",
      description:
        "ipconfig /release is a command used in Windows operating systems to release the current IP address assigned to a network interface. When you release the IP address, the interface effectively disconnects from the network, making it available for reassignment by a DHCP (Dynamic Host Configuration Protocol) server. This command is often used when troubleshooting network connectivity issues or when you want to obtain a new IP address from the DHCP server.",
      category: "win-network",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "ipconfig /renew",
      description: "description",
      category: "win-network",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "ipconfig /flushdns",
      description: "description",
      category: "win-network",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: `diskpart<br/>list disk<br/>select disk 0<br/>list volume<br/>select volume 1<br/>assign letter=z<br/>exit`,
      description: `Assign the letter Z to the volume 1 of the main disk (disk 0). This could be useful in case
        of a boot issue and if there are problem with a drive.`,
      category: "win-disk",
      tags: ["windows", "diskpart", "cmd", "drives"],
    },
    {
      item: `diskpart<br/>list disk<br/>select disk 0<br/>clean<br/>create partition primary<br/>format fs=ntfs quick<br/>assign letter=C<br/>exit`,
      description: `Create a primary partition and assigning the letter C to it.`,
      category: "win-disk",
      tags: ["windows", "diskpart", "cmd", "drives"],
    },
    {
      item: `diskpart<br/>list disk<br/>select disk 0<br/>list partition<br/>exit`,
      description: `Lists all the partitions of the main disk (disk 0)`,
      category: "win-disk",
      tags: ["windows", "diskpart", "cmd", "drives"],
    },
    {
      item: "net use T: \\\\network\\drive\\path",
      description:
        "Maps/assigns \\\\network\\drive\\path network drive to the letter T:",
      category: "win-path",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "net use T: /delete",
      description: "Disconnects the network drive with the letter T:",
      category: "win-path",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "[Net.ServicePointManager]::SecurityProtocol",
      description: "Displays the current security protocol(s) in use",
      category: "win-sec",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "[enum]::GetNames([Net.SecurityProtocolType])",
      description:
        "Lists all possible security protocols that can be configured",
      category: "win-sec",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12",
      description:
        "Sets the security protocol to TLS 1.2 for all new connections",
      category: "win-sec",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "net user",
      description:
        "Displays a list of all user accounts for the local computer",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net user 'sampleaccount'",
      description: "Displays information about the user account sampleaccount",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'docker-users' /add",
      description: "Creates a local group called docker-users",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'docker-users' /delete",
      description: "Deletes the local group called docker-users",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'administrators' 'domain\\username' /add",
      description: "Adds domain/username to the administrators group",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'administrators' 'domain\\username' /delete",
      description: "Removes domain/username from the administrator group",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'docker-users' 'domain\\username' /add",
      description:
        "Adds domain/username to the docker-users group in case the user wants to use the Docker app",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "whoami /user",
      description:
        "Displays the current domain and user name and the security identifier (SID)",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "whoami /all",
      description:
        "Displays user, group and privileges information for the user who is currently logged on to the local system. If used without parameters, whoami displays the current domain and user name",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "Get-LocalGroup",
      description: "Retrieves all local groups on a device",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "powershell"],
    },
    {
      item: "New-LocalGroup -Name 'docker-users' -Description 'Docker users group'",
      description: "Creates a new local group called docker-users",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "powershell"],
    },
    {
      item: "Add-LocalGroupMember -Group 'docker-users' -Member '$((Get-WMIObject -class Win32_ComputerSystem | select username).username)'",
      description: "Adds current logged-on user to the docker-users group",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "powershell"],
    },
    {
      item: "Remove-LocalGroup -Name 'docker-users'",
      description: "Deletes the local group called docker-users",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "powershell"],
    },
    {
      item: "(Get-WMIObject -class Win32_ComputerSystem | Select-Object -Property username).username",
      description: "Retrieves current logged-on user",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "powershell"],
    },
    {
      item: "([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)",
      description:
        "Returns true if the current session's account is an administrator and false if it is not",
      category: "win-lusrmgr",
      tags: ["windows", "lusrmgr", "powershell"],
    },
    {
      item: "Ctrl+K, Ctrl+J",
      description: "Expands all regions in VS Code (functions, variables, etc)",
      category: "win-shortcuts",
      tags: ["windows", "keyboard", "vscode"],
    },
    {
      item: "Ctrl+K, Ctrl+1",
      description: "Folds/minimizes all regions to a specific level in VS Code",
      category: "win-shortcuts",
      tags: ["windows", "keyboard"],
    },
    {
      item: "Ctrl+Shift+I",
      description: "Opens Copilot in VS Code",
      category: "win-shortcuts",
      tags: ["windows", "keyboard", "vscode"],
    },
    {
      item: "Ctrl+C",
      description: "Copies selected text",
      category: "win-shortcuts",
      tags: ["windows", "keyboard", "vscode"],
    },
    {
      item: "Ctrl+X",
      description: "Cuts selected text",
      category: "win-shortcuts",
      tags: ["windows", "keyboard"],
    },
    {
      item: "Ctrl+V",
      description: "Pastes copied text",
      category: "win-shortcuts",
      tags: ["windows", "keyboard"],
    },
    {
      item: "Windows key+V",
      description: "Opens CLIPBOARD HISTORY",
      category: "win-shortcuts",
      tags: ["windows", "keyboard"],
    },
    {
      item: "Ctrl+Shift+ESC",
      description: "Opens TASK MANAGER",
      category: "win-shortcuts",
      tags: ["windows", "keyboard"],
    },
    {
      item: "ncpa.cpl",
      description: "Opens NETWORK CONNECTIONS",
      category: "win-network",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "appwiz.cpl",
      description: "Opens PROGRAMS AND FEATURES",
      category: "win-app",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "timedate.cpl",
      description: "Opens DATE AND TIME",
      category: "win-cpl",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "inetcpl.cpl",
      description: "Opens INTERNET OPTIONS",
      category: "win-cpl",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "powercfg.cpl",
      description: "Opens POWER OPTIONS",
      category: "win-cpl",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "intl.cpl",
      description: "Opens LANGUAGE AND REGION control",
      category: "win-cpl",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "control.exe srchadmin.dll",
      description: "Opens INDEXING OPTIONS",
      category: "win-cpl",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "shell:::{A8A91A66-3A7D-4424-8D24-04E180695C7A}",
      description:
        "Opens CONTROL PANEL\\HARDWARE AND SOUND\\DEVICES AND PRINTERS",
      category: "win-cpl",
      tags: ["windows", "control_panel", "run"],
    },
    {
      item: "lusrmgr.msc",
      description: "Opens LOCAL USERS AND GROUPS wizard",
      category: "win-lusrmgr",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "devmgmt.msc",
      description: "Opens DEVICE MANAGER",
      category: "win-cpl",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "diskmgmt.msc",
      description: "Opens DISK MANAGEMENT",
      category: "win-disk",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "dsregcmd /status",
      description: `Windows command-line tool used to check Azure AD / Entra ID device registration status, including: Azure AD Join, Hybrid Join, Intune MDM enrollment, SSO / PRT status, Tenant information`,
      category: "win-system",
      tags: ["windows", "system", "autopilot", "intune"],
    },
    {
      item: "shutdown /r /f /t 0",
      description: `Windows command-line tool that forces a Windows computer to immediately restart by restarting the computer (/r), forcing all applications to close without warning (/f), and setting the timeout to zero seconds (/t 0). This command will cause you to lose any unsaved data in open programs, so use it with caution.`,
      category: "win-system",
      tags: ["windows", "system"],
    },
    {
      item: `[Text.Encoding]::ASCII.GetString([Text.Encoding]::GetEncoding("Cyrillic").GetBytes("Ññèéáà"))`,
      description: `Converts a string containing accented characters into ASCII. The output in this case would be <code>Nneeaa</code>`,
      category: "win-system",
      tags: ["windows", "system"],
    },
    {
      item: `[System.Globalization.RegionInfo]::new("DE")`,
      description: `Retrieves a country basic info, for instance:
      <pre><code>
      Name                         : DE
      EnglishName                  : Germany
      DisplayName                  : Germany
      NativeName                   : Deutschland
      TwoLetterISORegionName       : DE
      ThreeLetterISORegionName     : DEU
      ThreeLetterWindowsRegionName : DEU
      IsMetric                     : True
      GeoId                        : 94
      CurrencyEnglishName          : Euro
      CurrencyNativeName           : Euro
      CurrencySymbol               : €
      ISOCurrencySymbol            : EUR
      </code></pre>
      `,
      category: "win-system",
      tags: ["windows", "system"],
    },
    {
      item: "eventvwr.msc",
      description: "Opens EVENT VIEWER",
      category: "win-system",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "gpedit.msc",
      description: "Opens LOCAL GROUP POLICY EDITOR",
      category: "win-system",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "msinfo32",
      description: "Opens SISTEM INFORMATION",
      category: "win-system",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "regedit",
      description: "Opens REGISTRY EDITOR",
      category: "win-system",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "taskmgr",
      description: "Opens TASK MANAGER",
      category: "xwin-system",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "services.msc",
      description: "Opens SERVICES",
      category: "win-system",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "winver",
      description: "Opens WINDOWS VERSION wizard",
      category: "win-system",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: `(Get-ItemProperty -Path "HKLM:\\HARDWARE\\DESCRIPTION\\System\\BIOS" -Name "SystemProductName").SystemProductName`,
      description: "Retrieves a device model from regedit using powershell",
      category: "win-system",
      tags: ["windows", "powershell", "regedit"],
    },
    {
      item: `(Get-ItemProperty -Path "HKLM:\\HARDWARE\\DESCRIPTION\\System\\BIOS" -Name "SystemManufacturer").SystemManufacturer`,
      description:
        "Retrieves a device manufacturer from regedit using powershell",
      category: "win-system",
      tags: ["windows", "powershell", "regedit"],
    },
    {
      item: "printmanagement.msc",
      description: "Opens PRINT MANAGEMENT wizard",
      category: "win-cpl",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "sfc /scannow",
      description: "description",
      category: "win-disk",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "dism /online /cleanup-image /checkhealth",
      description: "description",
      category: "win-disk",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "dism /online /cleanup-image /scanhealth",
      description: "description",
      category: "win-disk",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "dism /online /cleanup-image /restorehealth",
      description: "description",
      category: "win-disk",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "Get-ComputerInfo | Select-Object -ExpandProperty OSUptime",
      description:
        "Retrieves the duration the operating system has been running since the last boot",
      category: "win-system",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "(Get-CimInstance Win32_OperatingSystem).LastBootUpTime",
      description: "Retrieves the date when the device was last booted",
      category: "win-system",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "wmic path win32_operatingsystem get lastbootuptime",
      description: "Retrieves the date when the device was last booted",
      category: "win-system",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "start ms-settings:",
      description: "Opens SYSTEM SETTINGS",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:workplace",
      description: "Opens SYSTEM SETTINGS > ACCOUNTS > ACCESS WORK OR SCHOOL",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:emailandaccounts",
      description: "Opens SYSTEM SETTINGS > ACCOUNTS > EMAIL & ACCOUNTS",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:signinoptions",
      description: "Opens SYSTEM SETTINGS > ACCOUNTS > SING-IN OPTIONS",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:appsfeatures-app",
      description: "Opens SYSTEM SETTINGS > APPS > INSTALLED APPS",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:defaultapps",
      description: "Opens SYSTEM SETTINGS > APPS > DEFAULT APPS",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:startupapps",
      description: "Opens SYSTEM SETTINGS > APPS > STARTUP",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:network-advancedsettings",
      description:
        "Opens SYSTEM SETTINGS > NETWORK & INTERNET > ADVANCED NETWORK SETTINGS",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:sound-devices",
      description: "Opens SYSTEM SETTINGS > SYSTEM > SOUND > ALL SOUND DEVICES",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:sound",
      description: "Opens SYSTEM SETTINGS > SYSTEM > SOUND",
      category: "win-settings",
      tags: ["windows", "system"],
    },
    {
      item: `Get-AppXPackage -AllUsers | ForEach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\\AppXManifest.xml"}`,
      description: `Re-registers all built-in Microsoft Store (AppX) apps for every user on the machine. It can fix: Microsoft Store not opening, Built-in apps missing or broken, Apps failing to launch, Start Menu tiles not working, App registration corruption after Windows Updates. It must be run with an elevated powershell terminal.`,
      category: "win-system",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: `manage-bde -status`,
      description: `Windows command-line tool command used to check the status of BitLocker Drive Encryption on a system. Must be run as administrator. For each drive, it reports things like:
                      <ul>
                      <li>Conversion Status: Fully Encrypted, Fully Decrypted, Encryption in Progress / Decryption in Progress</li>
                      <li>Percentage Encrypted</li>
                      <li>Encryption Method: (e.g., XTS-AES 128-bit, XTS-AES 256-bit)</li>
                      <li>Protection Status: Protection On (BitLocker is enforcing encryption)/Protection Off (encryption exists but is not enforced)</li>
                      <li>Lock Status (for data drives): Locked / Unlocked</li>
                      <li>Key Protectors: (TPM, PIN, recovery password, startup key, etc.)</li>
                      </ul>
                      Output Example:
                      <pre>
                      <code>
          Size:                 474,74 GB
          BitLocker Version:    2.0
          Conversion Status:    Used Space Only Encrypted
          Percentage Encrypted: 100,0%
          Encryption Method:    XTS-AES 256
          Protection Status:    Protection On
          Lock Status:          Unlocked
          Identification Field: Unknown
          Key Protectors:
              TPM And PIN
              Numerical Password
                      </code>
                      </pre>`,
      category: "win-disk",
      tags: ["windows", "system", "disk"],
    },
    {
      item: `manage-bde -protectors -get [VOLUME_LETTER]`,
      description: `Windows command-line tool command used to retrieve the a volume Bitlocker ID and Key. Must be run as administrator. For instance, when running <code>manage-bde -protectors -get c:</code>
          <pre>
          <code>
          Volume C: [OS]
          All Key Protectors

              TPM And PIN:
                ID: {7288B918-7BAD-*sanitized*}
                PCR Validation Profile:
                  7, 11
                  (Uses Secure Boot for integrity validation)

              Numerical Password:
                ID: {7F94E17A-9291-*sanitized*}
                Password:
                  610214-390621-*sanitized*
                Backup type:
                  AAD backup
          </code>
          </pre>`,
      category: "win-disk",
      tags: ["windows", "system", "disk"],
    },
    {
      item: `manage-bde -protectors c: -adbackup -id [NUMERICAL_PASSWORD_ID]`,
      description: `Windows command-line tool command used to back up Bitlocker Recovery key in AD. Must be run as administrator. If successful, you will get this
      output message <code>Recovery information was successfully backed up to Active Directory</code>`,
      category: "win-disk",
      tags: ["windows", "system", "disk"],
    },
    {
      item: `certutil -encode "inputimage.png" "outputbase64.txt"`,
      description: `Convert an image to base64. You can then copy the base64 string and add it to <code>src</code> <code>img</code> attribute to hardcode the 
      image in your html file, for instance <code>&lt;img src="data:image/[type];base64,[Base64-string]" alt="Description"&gt;</code>`,
      category: "win-system",
      tags: ["windows", "system"],
    },
    {
      item: `dcu-cli.exe`,
      description: `CLI functionality to managed Dell driver updates by using <strong>Dell Command Update</strong>. Usually it gets installed here
      <code>C:\\Program Files\\Dell\\CommandUpdate</code>. For all CLI commands, see
      <a href="https://www.dell.com/support/manuals/fr-be/command-update/dcu_rg/dell-command-update-cli-commands?guid=guid-92619086-5f7c-4a05-bce2-0d560c15e8ed&lang=en-us">
      https://www.dell.com/support/manuals/fr-be/command-update/dcu_rg/dell-command-update-cli-commands?guid=guid-92619086-5f7c-4a05-bce2-0d560c15e8ed&lang=en-us</a>.
       You can download <strong>Dell Command Update</strong>: <a href="https://dl.dell.com/FOLDER13922605M/1/Dell-Command-Update-Application_5CR1Y_WIN64_5.6.0_A00.EXE">https://dl.dell.com/FOLDER13922605M/1/Dell-Command-Update-Application_5CR1Y_WIN64_5.6.0_A00.EXE</a>`,
      category: "win-drivers",
      tags: ["windows", "dell", "drivers"],
    },
    {
      item: `[System.IO.File]::WriteAllBytes("C:\\path\\output_image.png",[System.Convert]::FromBase64String("BASE64IMAGESTRING"))`,
      description: `Decode an image base64 string back to an image file (png, jpeg etc). It should also work with PDF files. Most file types have distinct “magic numbers” in their binary headers, which, when Base64-encoded, show up as recognizable prefixes. These prefixes let you identify the file type without fully decoding it.
                    <div style="margin-top:1rem"><strong>Common File Types & Base64 Prefixes</strong></div><ul><li>JPEG / JPG &gt; base64 prefix: <code>/9j/</code></li><li>PNG &gt; base64 prefix: <code>iVBORw0KGgo</code></li><li>GIF &gt; base64 prefix: <code>R0lGOD</code></li><li>PDF &gt; base64 prefix: <code>JVBERi0</code></li><li>ZIP / DOCX / XLSX / PPTX &gt; base64 prefix: <code>UEsDB</code></li><li>MP3 &gt; base64 prefix: <code>//uQ</code> or <code>SUQz</code></li><li>MP4 / MOV &gt; base64 prefix: <code>AAAAFGZ0</code></li><li>BMP &gt; base64 prefix: <code>Qk</code></li><li>TIFF / TIF &gt; base64 prefix: <code>SUkq</code></li><li>WebP &gt; base64 prefix: <code>UklGR</code></li><li>RAR &gt; base64 prefix: <code>UmFy</code></li><li>7z &gt; base64 prefix: <code>77u/</code></li><li>ICO / CUR &gt; base64 prefix: <code>AAABAA</code></li><li>FLAC &gt; base64 prefix: <code>fLaC</code></li><li>OGG / OGV / OGA &gt; base64 prefix: <code>T2dn</code></li></ul>`,
      category: "win-system",
      tags: ["windows", "system"],
    },
    {
      item: `[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("BASE64STRING"))`,
      description: `Decode a base64 string. Useful, for instance, when decoding an API Basic Auth string`,
      category: "win-system",
      tags: ["windows", "system"],
    },
    {
      item: `[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("USERNAME:PASSWORD"))`,
      description: `Encode to base64. Useful, for instance, when encoding an API Basic Auth string`,
      category: "win-system",
      tags: ["windows", "system"],
    },
    {
      item: `function prompt { "PS> " }`,
      description: `To remove the directory path from your PowerShell (PS) terminal line, you can customize the prompt function. This can be done temporarily 
      for your current session or permanently by modifying your profile. This method is temporary change (Current Session) to hide the path immediately in your 
      active window. For the permanent method, you need to open your ps profile file <code>notepad $PROFILE</code> (if not created, it will prompt to create one),
      then open it copy/paste this <code>function prompt {"$((Get-Location).Path.Split('\')[-1]):  "}</code> and then call the function with <code>. $PROFILE</code>`,
      category: "win-system",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "dir env:",
      description:
        "Displays the environment variables specific to the current session",
      category: "win-env",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "Get-ChildItem env:",
      description:
        "Displays the environment variables specific to the current session",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:ALLUSERSPROFILE",
      description: "Retrieves env variable, for instance 'C:\\ProgramData'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:APPDATA",
      description:
        "Retrieves env variable, for instance 'C:\\Users\\username\\AppData\\Roaming'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:COMPUTERNAME",
      description: "Retrieves env variable, for instance 'NTTD-J92HGL3'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:HOMEDRIVE",
      description: "Retrieves env variable, for instance 'C:'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:HOMEPATH",
      description: "Retrieves env variable, for instance '\\Users\\username'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:LOCALAPPDATA",
      description:
        "Retrieves env variable, for instance 'C:\\Users\\username\\AppData\\Local'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:Model",
      description:
        "Retrieves the device model env variable, for instance '5520'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:OneDrive",
      description:
        "Retrieves env variable, for instance 'C:\\Users\\username\\OneDrive'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:OneDriveCommercial",
      description:
        "Retrieves env variable, for instance 'C:\\Users\\username\\OneDrive-Company'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:OS",
      description: "Retrieves env variable, for instance 'Windows_NT'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:Path",
      description: "Retrieves current path variable",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:POWERSHELL_DISTRIBUTION_CHANNEL",
      description:
        "Retrieves env variable, for instance 'MSI:Windows 10 Enterprise'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:PROCESSOR_ARCHITECTURE",
      description: "Retrieves env variable, for instance 'AMD64'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:ProgramData",
      description: "Retrieves env variable, for instance 'C:\\ProgramData'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:ProgramFiles",
      description: "Retrieves env variable, for instance 'C:\\Program Files'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:ProgramFiles(x86)",
      description:
        "Retrieves env variable, for instance 'C:\\Program Files (x86)'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:Serial",
      description: "Retrieves env variable, for instance 'J92HGL3'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:Type",
      description:
        "Retrieves device type env variable, for instance 'Latitude'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:USERDNSDOMAIN",
      description: "Retrieves the user dns domain env variable'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:USERDOMAIN",
      description: "Retrieves the user domain env variable",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:USERNAME",
      description: "Retrieves the username env variable",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "$env:USERPROFILE",
      description: "Retrieves env variable, for instance 'C:\\Users\\username'",
      category: "win-env",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: "%localappdata%\\Microsoft\\OneDrive\\onedrive.exe /reset",
      description: "Resets OneDrive if installed in that location",
      category: "win-onedrive",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "%programfiles%\\Microsoft OneDrive\\onedrive.exe /reset",
      description: "Resets OneDrive if installed in that location",
      category: "win-onedrive",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "%programfiles(x86)%\\Microsoft OneDrive\\onedrive.exe /reset",
      description: "Resets OneDrive if installed in that location",
      category: "win-onedrive",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "Get-Service -Name Windefend, Sense | Select-Object -Property Name, DisplayName, Status | Format-Table",
      description:
        "Retrieves Windows Defender Advanced Threat Protection Service and Microsoft Defender Antivirus Service service info",
      category: "win-system",
      tags: ["windows", "system", "powershell"],
    },
    {
      item: 'cmd /k "[command]"',
      description:
        'Opens a new Command Prompt window and runs the specified command between double-quotes ("[command]"). The /k switch keeps the Command Prompt window open after the command has executed, allowing you to see the output',
      category: "win-system",
      tags: ["windows", "system", "run"],
    },
    {
      item: 'powershell -NoExit -Command "write \\"Hostname: ${env:COMPUTERNAME}\\"; gsv Windefend, Sense | select Name, DisplayName, Status | fl"',
      description:
        "Retrieves hostname, Windows Defender Advanced Threat Protection Service and Microsoft Defender Antivirus Service service info and it can be run from RUN",
      category: "win-system",
      tags: ["windows", "system", "run"],
    },
    {
      item: 'powershell -NoExit -Command "[command]"',
      description:
        'Starts a new PowerShell process and keeps the window open after executing the command between double-quotes ("[command]") and it can be run from RUN',
      category: "win-system",
      tags: ["windows", "system", "run"],
    },
    {
      item: 'cmd /k "sc query Windefend && sc query Sense"',
      description:
        "Retrieves Windows Defender Advanced Threat Protection Service and Microsoft Defender Antivirus Service service info and it can be run from RUN",
      category: "win-system",
      tags: ["windows", "system", "run"],
    },
    {
      item: 'taskkill /IM "winword.exe" /F',
      description: "Kills all MS Words processes",
      category: "win-app",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "teams.exe" /F',
      description: "Kills all MS Teams Classic processes",
      category: "win-app",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "ms-teams.exe" /F',
      description: "Kills all MS New Teams processes",
      category: "win-app",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "outlook.exe" /F',
      description: "Kills all MS Outlook processes",
      category: "win-app",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "powerpnt.exe" /F',
      description: "Kills all MS PowerPoint processes",
      category: "win-app",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "excel.exe" /F',
      description: "Kills all MS Excel processes",
      category: "win-app",
      tags: ["windows", "system"],
    },
    {
      item: "New-ItemProperty -Path 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\FileSystem' -Name 'LongPathsEnabled' -Value 1 -PropertyType DWORD -Force",
      description:
        "Enables paths longer than 256 characters. Source: https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=powershell",
      category: "win-reg",
      tags: ["windows", "regedit", "powershell"],
    },
    {
      item: "reg add 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\Printers\\PointAndPrint' /v RestrictDriverInstallationToAdministrators /t REG_DWORD /d 0 /f",
      description:
        "Disable the restriction to allow printer driver installation only to device's administrators. See: https://support.microsoft.com/en-gb/topic/kb5005652-manage-new-point-and-print-default-driver-installation-behavior-cve-2021-34481-873642bf-2634-49c5-a23b-6d8e9a302872",
      category: "win-reg",
      tags: ["windows", "regedit", "cmd"],
    },
    {
      item: "reg add HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System /v EnableLUA /t REG_DWORD /d 0 /f",
      description:
        "Disables the User Account Control (UAC) that prompts user to confirm something that got executed and for administrator's credentials if the logged in account does not have the required rights",
      category: "win-reg",
      tags: ["windows", "regedit", "cmd"],
    },
    {
      item: "reg add HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System /v EnableLUA /t REG_DWORD /d 1 /f",
      description:
        "Enables the User Account Control (UAC) that prompts user to confirm something that got executed and for administrator's credentials if the logged in account does not have the required rights",
      category: "win-reg",
      tags: ["windows", "regedit", "cmd"],
    },
    {
      item: "Computer\\HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
      description:
        "Navigates to the regkey containing the info for the uninstaller exe/msi for each app installed on the device",
      category: "win-reg",
      tags: ["windows", "regedit"],
    },
    {
      item: "Computer\\HKEY_CLASSES_ROOT\\Installer\\Products",
      description:
        "Navigates to the regkey containing the info of all the software installed on a device",
      category: "win-reg",
      tags: ["windows", "regedit"],
    },
    {
      item: "Computer\\HKEY_CURRENT_USER\\Control Panel\\Desktop",
      description:
        "Navigates to the regkey containing the Wallpaper info, transcoded image and wallpaper path",
      category: "win-reg",
      tags: ["windows", "regedit"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_api/web/associatedownergroup/users`,
      description:
        "Provided that the user is logged in their Micrsoft tenant, they will get an XML response with the owners of a specific SharePoint site.",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser", "api", "sharepoint"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_api/web/lists/getbytitle('{sp_list_name}')/items?$filter=substringof('valuecontained', Column1Name) and Column2Name eq 'NO' and substringof('2025-08', Column3Name)`,
      description:
        "Provided that the user is logged in their Micrsoft tenant, they will get an XML response with the items of the corresponding list that match the filter criteria. Substringof refers to a value that is contained in Column1, Colum2 has to equal to 'NO' and Colum3 has to contain the string '2025-08'",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser", "api", "sharepoint"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/people.aspx?MembershipGroupId=0`,
      description:
        "Navigates to the corresponding MS Cloud collection's access right page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/people.aspx?MembershipGroupId=3`,
      description:
        "Navigates to the corresponding MS Cloud collection's owners page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/people.aspx?MembershipGroupId=4`,
      description:
        "Navigates to the corresponding MS Cloud collection's visitors page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/people.aspx?MembershipGroupId=5`,
      description:
        "Navigates to the corresponding MS Cloud collection's members page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/user.aspx`,
      description:
        "Navigates to the corresponding MS Cloud collection's permissions page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/RecycleBin.aspx?view=5`,
      description:
        "Navigates to corresponding MS Cloud collection recycle bin page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/RecycleBin.aspx?view=13`,
      description:
        "Navigates to corresponding MS Cloud collection second stage recycle bin page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/storman.aspx`,
      description:
        "Navigates to corresponding MS Cloud collection storage metrics page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/AppPrincipals.aspx`,
      description:
        "Navigates to corresponding MS Cloud collection app permissions page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: `https://${placeholders.sp_instance}.sharepoint.com/sites/${placeholders.sp_sitename}/_layouts/15/appinv.aspx`,
      description:
        "Navigates to corresponding MS Cloud collection storage app permission creation when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      category: "ms-sharepoint",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/options/general/storage",
      description:
        "Navigates to corresponding Outlook mailbox storage metrics page when added to the base mailbox url, for instance: https://outlook.office.com/mail/mailbox@domain/options/general/storage",
      category: "ms-outlook",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "https://myaccount.microsoft.com/device-list",
      description:
        "Navigates to corresponding user device list page where they can retrieve their BitLocker Recovery Key(s)",
      category: "ms-account",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "%programdata%\\Cisco\\Cisco AnyConnect Secure Mobility Client\\Profile",
      description: "Opens Cisco AnyConnect's profile path - VPN",
      category: "win-path-cisco",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Cisco\\Cisco AnyConnect Secure Mobility Client",
      description: "Opens Cisco AnyConnect's local appdata path - VPN",
      category: "win-path-cisco",
      tags: ["windows", "path"],
    },
    {
      item: "%programdata%\\Cisco\\Cisco Secure Client\\VPN\\Profile",
      description: "Opens Cisco Secure Client's profile path - VPN",
      category: "win-path-cisco",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Cisco\\Cisco Secure Client\\VPN",
      description: "Opens Cisco Secure Client's local appdata path - VPN",
      category: "win-path-cisco",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%",
      description: "Opens C:\\Users\\{loggedInUser}\\AppData\\Local",
      category: "win-app",
      tags: ["windows", "path"],
    },
    {
      item: "%appdata%",
      description: "Opens C:\\Users\\{loggedInUser}\\AppData\\Roaming",
      category: "win-app",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Packages\\MSTeams_8wekyb3d8bbwe",
      description: "Opens the New Teams app's cache folder",
      category: "win-path-teams",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Packages\\MSTeams_8wekyb3d8bbwe\\LocalCache\\Microsoft\\MSTeams\\Backgrounds",
      description: "Opens the New Teams app's backgrounds folder",
      category: "win-path-teams",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Microsoft\\TeamsMeetingAdd-in",
      description:
        "Opens path to the Outlook's New Teams meeting add-in. The dll can be found for instance: '...\\TeamsMeetingAdd-in\\1.24.09301\\x64\\Microsoft.Teams.AddinLoader.dll'",
      category: "win-path-teams",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Microsoft\\Teams",
      description:
        "Opens the Teams Classic's cache folder stored in Local Appdata",
      category: "win-path-teams",
      tags: ["windows", "path"],
    },
    {
      item: "%appdata%\\Microsoft\\Teams",
      description:
        "Opens the Teams Classic's cache folder stored in Roaming Appdata",
      category: "win-path-teams",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Microsoft\\Outlook",
      description:
        "Opens the folder where Outlook client app keeps .ost, .nst and .pst files",
      category: "win-path-outlook",
      tags: ["windows", "path"],
    },
    {
      item: "C:\\Windows\\System32\\drivers\\etc",
      description:
        "Opens the folder where the hosts file is kept. This file is an operating system file that maps hostnames to IP addresses and it is used to override the DNS system for testing purposes so that a Web browser or other application can be redirected to a specific IP address",
      category: "win-system",
      tags: ["windows", "path"],
    },
    {
      item: "C:\\Program Files\\nodejs",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      category: "win-path-nodejs",
      tags: ["windows", "path"],
    },
    {
      item: "%USERPROFILE%\\AppData\\Roaming\\npm",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      category: "win-path-npm",
      tags: ["windows", "path"],
    },
    {
      item: "%USERPROFILE%\\go\\bin",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      category: "win-path-go",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Programs\\Python\\Launcher\\",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      category: "win-path-python",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Programs\\Python\\Python312",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      category: "win-path-python",
      tags: ["windows", "path"],
    },
    {
      item: "shell:appsfolder",
      description:
        "Command to quickly open the Applications folder. This folder contains all the installed applications on your system, including both traditional desktop programs and universal Windows apps",
      category: "win-app",
      tags: ["windows", "path"],
    },
    {
      item: "/opt/cisco/anyconnect/profile",
      description: "Opens Cisco AnyConnect's profile path - VPN",
      category: "mac-path-cisco",
      tags: ["MacOS", "path"],
    },
    {
      item: "/opt/cisco/secureclient/vpn/profile",
      description: "Opens Cisco Secure Client's profile path - VPN",
      category: "mac-path-cisco",
      tags: ["MacOS", "path"],
    },
    {
      item: "sudo jamf removeMDMProfile",
      description: "Removes the MDM profile from a MacBook",
      category: "mac-jamf",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "sudo jamf removeFramework",
      description: "Removes the JAMF agent from a MacBook",
      category: "mac-jamf",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "sudo jamf policy",
      description: "Forces an MDM profile policy check in from the client",
      category: "mac-jamf",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "sudo jamf recon",
      description: "Forces a full inventory check from the client",
      category: "mac-jamf",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "jamf about",
      description: "Checks for enrollment and Jamf version on local Mac",
      category: "mac-jamf",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "jamf help",
      description: "Retrieves useful Jamf related commands",
      category: "mac-jamf",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "sudo purge",
      description: "Clears RAM on a MacBook",
      category: "mac-jamf",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: `devices
    | where device.hardware.manufacturer = "Hewlett-Packard"
    | list device.name, device.entity, device.hardware.model, device.hardware.type, device.operating_system.name, device.hardware.manufacturer, device.hardware.chassis_serial_number, device.hardware.model, device.hardware.product_line`,
      description: `Retrieves all HP devices information`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `web.events during past 7d<br/>
    | where application.name == "Zendesk"<br/>
    | summarize usage_duration = duration.sum()/ user.name.count() by ad.department<br/>
    | sort usage_duration desc`,
      description: `Zendesk web app usage duration per department (past 7 days)`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices during past 7d<br/>
        | include device_performance.events during past 7d<br/>
        | compute avg_installed_memory = installed_memory.avg(), used_memory_percentage = used_memory.avg()*100/installed_memory.avg()<br/>
        | where used_memory_percentage > 75`,
      description: `Devices with high memory usage (>75%) during past 7 days`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices during past 7d<br/>
| include device_performance.events during past 7d<br/>
| compute avg_installed_memory = installed_memory.avg(), used_memory_percentage = used_memory.avg()*100/installed_memory.avg()<br/>
| where used_memory_percentage > 75<br/>
| summarize num_devices_mem_upgrade = count() by hardware.manufacturer`,
      description: `Count of memory-upgrade candidates by manufacturer during past 7 days`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices
packages.installed_packages`,
      description: `Devices with installed packages (basic view)`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices <br/>
| with package.installed_packages<br/>
| where package.name == "*Chrome*" and package.version == "108.*"`,
      description: `Devices with specific Chrome version patterns`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices <br/>
| include package.installed_packages<br/>
| where package.name == "*Chrome*"<br/>
| compute number_of_packages_installed = package.count()<br/>
| where number_of_packages_installed == 0`,
      description: `Devices missing Chrome`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `execution.crashes during past 7d <br/>
| where binary.name in ["zscaler", "zsaservice.exe"]<br/>
| summarize num_of_crashes = number_of_crashes.sum(), devices_with_crashes = device.count(), version_with_crashes = binary.version.count() by 1d`,
      description: `Zscaler crash reporting (past 7 days)`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices during past 10d<br/>
| include device_performance.boots during past 10d<br/>
| where device_performance.boot.type == full_boot<br/>
| compute number_of_boots_ = number_of_boots.sum()<br/>
| where number_of_boots_ = null`,
      description: `Devices with missing full-boot records`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices during past 30d<br/>
| summarize device_max_memory = hardware.memory.max()`,
      description: `Maximum memory installed across devices (past 30 days)`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `web.page_views during past 7d<br/>
| summarize ratio_of_frustrating_page_loads = number_of_page_views.sumif( experience_level = frustrating ) / number_of_page_views.sum()`,
      description: `Ratio of frustrating web page loads`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `remote_action.#get_service_information_1.executions during past 7d<br/>
| list device.name, outputs.ServiceInformation`,
      description: `Service information remote action results`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices during past 24h<br/>
| with execution.events during past 24h<br/>
| where application.name == 'Microsoft Teams'<br/>
| where number_of_freezes > 3<br/>
| summarize number_of_devices_with_3_teams_freezes = count()`,
      description: `Devices with >3 Teams freezes (per 15-minute buckets). It might look like it gets all devices with a combined total of at least 3 MS Teams freezes over the day. But in fact, it only gets devices with at least one 15-minute sample where MS Teams had more than 3 freezes (in the same location and with the same connectivity status). If a device experienced 1 freeze every 10 minutes, it would not be counted!`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices during past 24h<br/>
| with execution.events during past 24h<br/>
| where application.name == 'Microsoft Teams'<br/>
| compute freezes_per_device = number_of_freezes.sum()<br/>
| where freezes_per_device > 3<br/>
| summarize devices_with_over_3_freezes = count()`,
      description: `Devices with >3 Teams freezes. To find all devices with over 3 MS Teams freezes in the last 24 hours, you must use the compute keyword and aggregate number_of_freezes per device, before filtering the number of freezes. Look at the correct query below. It will count the devices without any concern about the location, the connectivity status, or whether you're using daily samples or 15-minute samples. `,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices<br/>
| where operating_system.platform == windows and hardware.type == virtual<br/>
| list device.name, operating_system.name, hardware.type`,
      description: `Windows virtual machines`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices<br/>
| where operating_system.platform == windows<br/>
| list operating_system.name, hardware.type`,
      description: `OS name and hardware type for Windows devices`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `custom_trend.#windows_migration.snapshots during past 60d<br/>
| where device.hardware.type !in [virtual, null]<br/>
| summarize 
  windows_11_ratio = countif(operating_system_name == "*windows 11*")/count(), 
  total = count() by 1d<br/>
| sort start_time desc`,
      description: `Windows 11 migration custom trend`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `execution.events<br/>
| where application.name == '*onedrive*'<br/>
| summarize devices_using_onedrive = device.count()`,
      description: `Devices using OneDrive`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices<br/>
| include execution.crashes<br/>
| compute crash_cnt = device.count()<br/>
| summarize devices_with_crashes = crash_cnt.sum(), total_devices = count()`,
      description: `Devices with application crashes. Good exmaple for single metric gauge chart`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices <br/>
| include device_performance.system_crashes<br/>
| compute devices_with_sys_crashes = device.count()<br/>
| summarize
   without_system_crashes = count() - devices_with_sys_crashes.sum(),
   with_system_crashes = devices_with_sys_crashes.sum()`,
      description: `System crash presence summary. Example of investigation to be used with multi-metric gauge chart`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `users<br/>
| include campaign.#welcome.responses<br/>
| compute 
  answered_campaign = user.countif(state == answered), 
  not_answered_campaign = user.countif(state != answered)<br/>
| summarize 
   answered = answered_campaign.sum(),
   not_answered = not_answered_campaign.sum()`,
      description: `Campaign participation summary. Example of investigation to be used with multi-metric gauge chart`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices<br/>
| include execution.events<br/>
| where binary.name in ["firefox", "firefox.exe"]<br/>
| compute 
   num_devices_latest_versions = device.countif( binary.version >= v107),
   num_devices_firefox = device.count()<br/>
| summarize 
   running_latest_versions = num_devices_latest_versions.sum() ,
   not_running_latest_versions = num_devices_firefox.sum() - num_devices_latest_versions.sum()`,
      description: `Firefox latest-version adoption. Example of investigation to be used with multi-metric gauge chart`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `web.page_views<br/>
| summarize 
    good_experience = number_of_page_views.sumif(experience_level == good),
    frustrating_experience = number_of_page_views.sumif(experience_level == frustrating)`,
      description: `Good vs frustrating page experience. Example of investigation to be used with multi-metric gauge chart`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `devices during past 30d<br/>
| include session.events<br/>
| compute session_user = user.name.last()<br/>
| list device.name, device.entity, device.hardware.model, device.hardware.type, device.operating_system.name, login.last_login_user_name, session_user`,
      description: `Gets devices information for the past 30 days and their last session username`,
      category: `nexthink-nql`,
      tags: ["Nexthink", "nql"],
    },
    {
      item: `[string]::IsNullOrWhiteSpace([string_value])`,
      description: `The IsNullOrWhiteSpace method is a built-in static method of the .NET Framework System.String class. The [string] class in PowerShell uses the IsNullOrWhiteSpace method to determine if a string is null, empty, or contains only whitespace characters.`,
      category: `windows-script`,
      tags: ["windows", "powershell", "script"],
    },
  ],
};
