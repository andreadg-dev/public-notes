# AZ-104 Azure Administrator Associate Notes

`Tag: [NOTES_ANY_AZ-104]`

**Index**

- [AZ-104 Azure Administrator Associate Notes](#az-104-azure-administrator-associate-notes)
  - [Useful Portals and Links](#useful-portals-and-links)
  - [Note about Microsoft Graph vs Az PowerShell Modules](#note-about-microsoft-graph-vs-az-powershell-modules)
  - [Module Discovery and Installation](#module-discovery-and-installation)
    - [Examples](#examples)
    - [Az PowerShell](#az-powershell)
    - [Microsoft Graph PowerShell](#microsoft-graph-powershell)
  - [Command Discovery and Help](#command-discovery-and-help)
    - [Examples](#examples-1)
    - [Azure CLI](#azure-cli)
    - [Az PowerShell](#az-powershell-1)
    - [Microsoft Graph PowerShell](#microsoft-graph-powershell-1)
    - [Output Examples](#output-examples)
    - [Note](#note)
  - [Authentication and Context](#authentication-and-context)
    - [Notes about `Connect-AzAccount`](#notes-about-connect-azaccount)
      - [Simple Rule of Thumb](#simple-rule-of-thumb)
      - [Exam Tip](#exam-tip)
    - [Examples](#examples-2)
    - [Azure CLI](#azure-cli-1)
    - [Az PowerShell](#az-powershell-2)
    - [Microsoft Graph PowerShell](#microsoft-graph-powershell-2)
    - [Notes](#notes)
  - [Subscription Information](#subscription-information)
    - [Examples](#examples-3)
    - [Azure CLI](#azure-cli-2)
    - [Az PowerShell](#az-powershell-3)
  - [Entra ID / Azure AD Users](#entra-id--azure-ad-users)
    - [Examples](#examples-4)
    - [Azure CLI](#azure-cli-3)
    - [Az PowerShell](#az-powershell-4)
    - [Microsoft Graph PowerShell](#microsoft-graph-powershell-3)
  - [Entra ID / Azure AD Groups](#entra-id--azure-ad-groups)
    - [Examples](#examples-5)
    - [Azure CLI](#azure-cli-4)
    - [Az PowerShell](#az-powershell-5)
    - [Microsoft Graph PowerShell](#microsoft-graph-powershell-4)
  - [Device and Intune Lookups](#device-and-intune-lookups)
    - [Examples](#examples-6)
    - [Microsoft Graph PowerShell](#microsoft-graph-powershell-5)
  - [Bulk Import Users](#bulk-import-users)
    - [What it does](#what-it-does)
    - [Portal path](#portal-path)
    - [Basic process](#basic-process)
    - [Notes](#notes-1)
  - [Microsoft Entra Domain Services](#microsoft-entra-domain-services)
    - [What it is](#what-it-is)
    - [What it is used for](#what-it-is-used-for)
    - [Key points](#key-points)
    - [About the domain name / UPN](#about-the-domain-name--upn)
    - [Short summary](#short-summary)
  - [Azure Management Groups](#azure-management-groups)
    - [What they are](#what-they-are)
    - [Main benefits](#main-benefits)
    - [Important note](#important-note)
    - [Short summary](#short-summary-1)
  - [Self-Service Password Reset (SSPR)](#self-service-password-reset-sspr)
    - [What it is](#what-it-is-1)
    - [Portal path](#portal-path-1)
    - [Main configuration](#main-configuration)
    - [Notes](#notes-2)
    - [Why it matters](#why-it-matters)
    - [Short summary](#short-summary-2)
  - [Identity Protection](#identity-protection)
    - [What it is](#what-it-is-2)
    - [Portal path](#portal-path-2)
    - [Dashboard examples](#dashboard-examples)
    - [What it looks for](#what-it-looks-for)
    - [Main policies](#main-policies)
      - [User risk policy](#user-risk-policy)
      - [Sign-in risk policy](#sign-in-risk-policy)
      - [MFA registration policy](#mfa-registration-policy)
    - [Notes](#notes-3)
    - [Short summary](#short-summary-3)
  - [Enabling MFA](#enabling-mfa)
    - [Portal path for authentication methods](#portal-path-for-authentication-methods)
      - [What you configure there](#what-you-configure-there)
    - [Monitoring paths](#monitoring-paths)
      - [Useful monitoring pages](#useful-monitoring-pages)
      - [What "Capable" means](#what-capable-means)
    - [Per-user MFA](#per-user-mfa)
      - [Per-user MFA states](#per-user-mfa-states)
      - [Meaning of Enforced](#meaning-of-enforced)
    - [Best practice note](#best-practice-note)
  - [Blocking Users / MFA Lockout](#blocking-users--mfa-lockout)
    - [What it is](#what-it-is-3)
    - [Portal paths](#portal-paths)
    - [Account lockout](#account-lockout)
    - [Block / unblock users](#block--unblock-users)
    - [Important notes](#important-notes)
  - [Microsoft Entra Connect](#microsoft-entra-connect)
    - [What it is](#what-it-is-4)
    - [Why it is useful](#why-it-is-useful)
    - [Main sync options](#main-sync-options)
      - [Cloud Sync](#cloud-sync)
        - [Characteristics](#characteristics)
        - [Notes](#notes-4)
      - [Connect Sync](#connect-sync)
        - [Characteristics](#characteristics-1)
        - [Typical advanced capabilities](#typical-advanced-capabilities)
    - [Cloud Sync deployment notes](#cloud-sync-deployment-notes)
      - [Download agent](#download-agent)
      - [Basic setup](#basic-setup)
    - [Notes](#notes-5)



## Useful Portals and Links

| Tool | URL | Purpose |
|---|---|---|
| Microsoft Azure Portal | https://portal.azure.com | Main Azure management portal |
| Microsoft Entra admin center | https://entra.microsoft.com/ | Identity and access management |
| Microsoft Intune admin center | https://intune.microsoft.com | Device and endpoint management |
| Graph Explorer | https://developer.microsoft.com/en-us/graph/graph-explorer | Test Microsoft Graph API queries |
| Microsoft Certified: Azure Administrator Associate Certification | https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/?practice-assessment-type=certification | AZ-104 Certification learning path, info etc |


## Note about Microsoft Graph vs Az PowerShell Modules

For Microsoft Entra ID administration, Microsoft Graph PowerShell is generally preferred over Az PowerShell because it is more aligned with Microsoft’s modern identity management model.
Az PowerShell remains the preferred choice for Azure resource and subscription management.

## Module Discovery and Installation

| Goal | Azure CLI | Az PowerShell | Microsoft Graph PowerShell | Notes |
|---|---|---|---|---|
| Show installed modules | `N/A` | `Get-Module Az* -ListAvailable` | `Get-Module Microsoft.Graph* -ListAvailable` | PowerShell module discovery |
| Install module | `N/A` | `Install-Module Az -Scope CurrentUser` | `Install-Module Microsoft.Graph.DeviceManagement -Scope CurrentUser` | Installs module for current user |
| Update modules | `N/A` | `Update-Module Az*` | `Update-Module Microsoft.Graph* -Scope CurrentUser` | Keeps tooling current |

### Examples
---
### Az PowerShell
```powershell
Get-Module Az* -ListAvailable
Install-Module Az -Scope CurrentUser
Update-Module Az*
```

### Microsoft Graph PowerShell
```powershell
Get-Module Microsoft.Graph* -ListAvailable | Select Name, Version
Install-Module Microsoft.Graph.DeviceManagement -Scope CurrentUser
Update-Module Microsoft.Graph* -Scope CurrentUser
```

## Command Discovery and Help

| Goal | Azure CLI | Az PowerShell | Microsoft Graph PowerShell | Notes |
|---|---|---|---|---|
| Show general help | `az -h` | `Get-Command -Module Az*` | `Get-Command -Module Microsoft.Graph*` | Azure CLI uses `-h` or `--help` |
| Show Entra-related help | `az ad -h` | `Get-Command -Module Az.Resources *AD*` | `Get-Command *Mg*User*`, `Get-Command *Mg*Group*` | `az ad help` is not valid |
| Show user command help | `az ad user -h` | `Get-Command *Az*AD*User*` | `Get-Command *Mg*User*` | Good starting point for discovery |
| Show group command help | `az ad group -h` | `Get-Command *Az*AD*Group*` | `Get-Command *Mg*Group*` | Finds group-related commands |
| Show examples for one command | `az ad user create -h` | `Get-Help New-AzADUser -Examples` | `Get-Help New-MgUser -Examples` | PowerShell has richer example help |
| Finds matching user-related cmdlets | `az find "az ad user"` | `Get-Command *Az*AD*User*` | `Get-Command *Mg*User*` | No exact equivalent to `az find` |
| Azure CLI interactive configuration | `az configure` | No direct equivalent | No direct equivalent  | In PowerShell, configuration is handled differently |

### Examples
---
### Azure CLI
```bash
az -h
az ad -h
az ad user -h
az ad group -h
az ad user create -h
```

### Az PowerShell
```powershell
Get-Command -Module Az*
Get-Command -Module Az.Resources *AD*
Get-Command *Az*AD*User*
Get-Help New-AzADUser -Examples
```

### Microsoft Graph PowerShell
```powershell
Get-Command -Module Microsoft.Graph*
Get-Command *Mg*User*
Get-Command *Mg*Group*
Get-Help New-MgUser -Examples
```

### Output Examples
---
Output for `az find "az ad user"`:
```plaintext
Finding examples...

Here are the most common ways to use [az ad user]:

Create a user (autogenerated)
az ad user create --display-name myuser --password password --user-principal-name myuser@contoso.com

Delete Azure Active Directory users. (autogenerated)
az ad user delete --id myuser@contoso.com

List all the Azure Active Directory users
az ad user list
```
---

Output for `az configure`:

```plaintext
Welcome to the Azure CLI! This command will guide you through logging in and setting some default values.

Your settings can be found at C:\Users\[user]\.azure\config
Your current configuration is as follows:

[cloud]
name = AzureCloud

Do you wish to change your settings? (y/N): N # you are prompted for input here

You're all set! Here are some commands to try:
 $ az login
 $ az vm create --help
 $ az feedback
```

### Note
`az configure` can prompt for user input and stores settings in the local Azure CLI config file. See an example of the output below:




## Authentication and Context

| Goal | Azure CLI | Az PowerShell | Microsoft Graph PowerShell | Notes |
|---|---|---|---|---|
| Sign in interactively | `az login` | `Connect-AzAccount` | `Connect-MgGraph` | Standard login methods |
| Sign in to a specific tenant | `az login --tenant TENANT_ID` | `Connect-AzAccount -TenantId "TENANT_ID"` | `Connect-MgGraph -TenantId "TENANT_ID"` | Useful in multi-tenant environments |
| Show current context | `az account show` | `Get-AzContext` | `Get-MgContext` | Shows active session details |
| Set subscription context | `az account set --subscription "NAME_OR_ID"` | `Set-AzContext -Subscription "NAME_OR_ID"` | `N/A` | Graph has no subscription context |
| Clear/disconnect session | `az account clear` | `Disconnect-AzAccount` | `Disconnect-MgGraph` | Ends active session |

### Notes about `Connect-AzAccount`
---
| Command | Authentication type | User interaction | Typical use case |
|---|---|---|---|
| `Connect-AzAccount` | Interactive user login | Yes | Normal admin sign-in |
| `Connect-AzAccount -UseDeviceAuthentication` | Device code login | Yes, through browser and code | Remote terminal or no popup login |
| `Connect-AzAccount -Identity` | Managed identity | No | Azure-hosted automation |

#### Simple Rule of Thumb

- Use **`Connect-AzAccount`** for normal interactive administration
- Use **`Connect-AzAccount -UseDeviceAuthentication`** when interactive popup login is not practical. Graph has `Connect-MgGraph -UseDeviceCode`
- Use **`Connect-AzAccount -Identity`** for automation running inside Azure with a managed identity: Azure VM, Azure Automation, Azure Functions, Azure App Service, other Azure-hosted workloads. Graph has `Connect-MgGraph -Identity`


#### Exam Tip

For **AZ-104**, remember:

- **interactive login** = normal admin sign-in
- **device authentication** = useful when browser popup is unavailable
- **managed identity** = best for secure automation without stored credentials

### Examples
---
### Azure CLI
```bash
az login
az login --tenant TENANT_ID
az account show
az account list
az account set --subscription "SUBSCRIPTION_NAME_OR_ID"
az account clear
```

### Az PowerShell
```powershell
Connect-AzAccount
Connect-AzAccount -TenantId $tenantId
Connect-AzAccount -UseDeviceAuthentication
Connect-AzAccount -Identity
Get-AzContext
Get-AzSubscription
Set-AzContext -Subscription $subscriptionIdName
Disconnect-AzAccount
```

### Microsoft Graph PowerShell
```powershell
Connect-MgGraph
Connect-MgGraph -TenantId $tenantId
Connect-MgGraph -UseDeviceCode
Connect-MgGraph -Identity
Get-MgContext
Disconnect-MgGraph
```

### Notes
- If multiple tenants are available, you may be prompted to choose one.
- Some tenants may not have accessible subscriptions.
- Use `--tenant` or `-TenanId` when you must target a specific directory.



## Subscription Information

| Goal | Azure CLI | Az PowerShell | Microsoft Graph PowerShell | Notes |
|---|---|---|---|---|
| List subscriptions | `az account list --output table` | `Get-AzSubscription \| Format-Table` | `N/A` | Subscription management belongs to Azure, not Graph |
| Show current subscription | `az account show` | `Get-AzContext` | `N/A` | Graph does not expose Azure subscription context |
| List subscriptions for a tenant | `az account list` | `Get-AzSubscription -TenantId "TENANT_ID"` | `N/A` | Useful in multi-tenant environments |

### Examples
---
### Azure CLI
```bash
az account list --output table
az account show
```

### Az PowerShell
```powershell
Get-AzSubscription | Format-Table
Get-AzSubscription -TenantId $tenantId
Get-AzContext
```

## Entra ID / Azure AD Users

| Goal | Azure CLI | Az PowerShell | Microsoft Graph PowerShell | Notes |
|---|---|---|---|---|
| List users | `az ad user list` | `Get-AzADUser` | `Get-MgUser` | Graph is often the most modern option |
| List only display names | `az ad user list --query "[].displayName"` | `Get-AzADUser \| Select-Object DisplayName` | `Get-MgUser \| Select-Object DisplayName` | Output shaping |
| Get user by UPN | `az ad user show --id user@domain.com` | `Get-AzADUser -UserPrincipalName "user@domain.com"` | `Get-MgUser -UserId "user@domain.com"` | UPN commonly works as user ID |
| Create user | `az ad user create --display-name "John Doe" --password "..." --user-principal-name john@domain.com` | `New-AzADUser -DisplayName "John Doe" -UserPrincipalName "john@domain.com" -Password $securePassword` | `New-MgUser ...` | Graph creation usually needs more properties |
| Update user | `az ad user update ...` | `Update-AzADUser ...` | `Update-MgUser -UserId "user@domain.com" ...` | Syntax varies by property |
| Delete user | `az ad user delete --id user@domain.com` | `Remove-AzADUser -UPNOrObjectId "user@domain.com"` | `Remove-MgUser -UserId "user@domain.com"` | Destructive command |

### Examples
---
### Azure CLI
```bash
az ad user list
az ad user list --query "[].displayName"
az ad user show --id johndoe@example.com
az ad user create --display-name "John Doe" --password "Passw0rd123ABC" --user-principal-name johndoe@example.com
az ad user delete --id johndoe@example.com
```

### Az PowerShell
```powershell
Get-AzADUser
Get-AzADUser | Select-Object DisplayName
Get-AzADUser -UserPrincipalName $userUpn

$securePassword = ConvertTo-SecureString 'Pa$$w0rd123ABC' -AsPlainText -Force
New-AzADUser -DisplayName $displayName `
  -UserPrincipalName $userUpn `
  -Password $securePassword

Update-AzADUser -UPNOrObjectId $userUpnOrId -City "Brussels"
Remove-AzADUser -UPNOrObjectId $userUpnOrId
```

### Microsoft Graph PowerShell
```powershell
Get-MgUser
Get-MgUser | Select-Object DisplayName
Get-MgUser -UserId $userUpnOrId

$passwordProfile = @{
  Password = 'Pa$$w0rd123ABC'
  ForceChangePasswordNextSignIn = $true
}

New-MgUser `
  -DisplayName $displayName `
  -UserPrincipalName $userUpnOrId `
  -AccountEnabled `
  -PasswordProfile $passwordProfile

Update-MgUser -UserId $userUpnOrId -City "Brussels"
Remove-MgUser -UserId $userUpnOrId
```

---

## Entra ID / Azure AD Groups

| Goal | Azure CLI | Az PowerShell | Microsoft Graph PowerShell | Notes |
|---|---|---|---|---|
| List groups | `az ad group list` | `Get-AzADGroup` | `Get-MgGroup` | Basic group listing |
| List group display names | `az ad group list --query "[].displayName"` | `Get-AzADGroup \| Select-Object DisplayName` | `Get-MgGroup \| Select-Object DisplayName` | Cleaner output |
| Get one group | `az ad group show --group "GroupName"` | `Get-AzADGroup -DisplayName "GroupName"` | `Get-MgGroup -Filter "displayName eq 'GroupName'"` | Graph often uses OData filter |
| List group members | `az ad group member list --group "GroupName"` | `Get-AzADGroupMember -GroupDisplayName "GroupName"` | `Get-MgGroupMember -GroupId "<group-id>"` | Graph usually requires group ID |

### Examples
---
### Azure CLI
```bash
az ad group list
az ad group list --query "[].displayName"
az ad group list --display-name "HR Team"
az ad group show --group "HR Team"
az ad group member list --group "HR Team"

#gets the display names of all the members of a specific group
az ad group member list --group "{group_display_name/group_id}" --query [].displayName 

#gets the UPNs of all the members of a specific group
az ad group member list --group "{group_display_name/group_id}" --query [].userPrincipalName 

#returns a table of only group members whose UPN is not null and list both displayName and userPrincipalName
az ad group member list --group "{group_display_name/group_id}" --query "[?userPrincipalName].{Name:displayName,UPN:userPrincipalName}" --output table 

#returns a table of all group members and list both displayName and userPrincipalName
az ad group member list --group "{group_display_name/group_id}" --query "[].{Name:displayName,UPN:userPrincipalName}" --output table 

```

### Az PowerShell
```powershell
Get-AzADGroup
Get-AzADGroup | Select-Object DisplayName
Get-AzADGroup -DisplayName $displayName
Get-AzADGroupMember -GroupDisplayName $displayName
Get-AzADGroupMember -GroupObjectId $groupId

#gets the display names of all the members of a specific group
Get-AzADGroupMember -GroupDisplayName $displayName | Select-Object -ExpandProperty DisplayName 

#gets the UPNs of all the members of a specific group
Get-AzADGroupMember -GroupDisplayName $displayName | Select-Object -ExpandProperty UserPrincipalName 

# Returns a table of only group members whose UPN is not null and list both displayName and userPrincipalName
Get-AzADGroupMember -GroupDisplayName $displayName  | Where-Object {$_.UserPrincipalName} | Select-Object DisplayName, UserPrincipalName 

# Returns a table of all group members and list both displayName and userPrincipalName
Get-AzADGroupMember -GroupDisplayName $displayName  | Select-Object DisplayName, UserPrincipalName 

# Return the group names a user is member of
Get-AzADUserMemberOf -UserPrincipalName $userUpnOrId |
Select-Object -ExpandProperty DisplayName |
Sort-Object

```

### Microsoft Graph PowerShell
```powershell
Get-MgGroup
Get-MgGroup | Select-Object DisplayName
Get-MgGroup -Filter "displayName eq '$displayName'"

# Return group member default information
$group = Get-MgGroup -Filter "displayName eq '$displayName'"
Get-MgGroupMember -GroupId $group.Id

# Return group member displaynames and UPNs
Get-MgGroupMember -GroupId $group.Id -All |
Where-Object { $_.'@odata.type' -eq '#microsoft.graph.user' } |
Select-Object @{ Name = 'DisplayName';Expression = { $_.AdditionalProperties.displayName } }, @{ Name = 'UserPrincipalName'; Expression = { $_.AdditionalProperties.userPrincipalName } }


# Return the group names a user is member of
(Get-MgUserMemberOf -UserId $userUpnOrId | Select-Object -ExpandProperty AdditionalProperties).displayName | Sort-Object
```



##  Device and Intune Lookups

| Goal | Azure CLI | Az PowerShell | Microsoft Graph PowerShell | Notes |
|---|---|---|---|---|
| Get Entra device by name | `N/A` | `N/A` | `Get-MgDevice -Filter "displayName eq 'DEVICE01'"` | Best handled with Graph |
| Get Intune managed device by serial | `N/A` | `N/A` | `Get-MgDeviceManagementManagedDevice -Filter "serialNumber eq 'ABC123'"` | Requires Graph device management module |

### Examples
---
### Microsoft Graph PowerShell
```powershell
Get-MgDevice -Filter "displayName eq '$displayName'" | Format-List
Get-MgDeviceManagementManagedDevice -Filter "serialNumber eq '$serialNumber'"
```



## Bulk Import Users

### What it does
Lets you create many Microsoft Entra ID users at once by uploading a CSV file.

### Portal path
`portal.azure.com/entra.microsoft.com > Users > All users > Bulk operation > Bulk create`

### Basic process
1. Download the CSV template
2. Fill in the required user details
3. Upload the CSV
4. Submit the bulk create job
5. Review the results for any errors

### Notes
- Use the **latest template** downloaded from the portal
- One row usually represents one user
- This is useful for onboarding many users quickly without scripting
- Bulk operations may have service limits, so very large imports may need to be split into smaller files


## Microsoft Entra Domain Services

### What it is
Microsoft Entra Domain Services provides **managed domain services** in Azure, such as:

- domain join
- LDAP
- Kerberos
- NTLM
- Group Policy support for joined machines

### What it is used for
It is mainly used for **legacy applications and workloads** that need traditional Active Directory features, but where you do not want to deploy and manage domain controllers manually.

### Key points
- It is a **managed service**
- It is deployed into an **Azure virtual network (VNet)**
- It can support VMs and applications that require classic AD-compatible authentication
- It does **not** replace Microsoft Entra ID; it complements it for legacy scenarios

### About the domain name / UPN
- By default, Microsoft Entra users often have the `onmicrosoft.com` domain
- If you add a **custom domain**, users can sign in with that domain instead
- In practice, the **UPN suffix can use the custom domain**, but this depends on how identities are configured and synchronized

### Short summary
Use Microsoft Entra Domain Services when cloud-hosted workloads still need traditional AD features without managing your own domain controllers.


## Azure Management Groups

### What they are
Management groups are containers placed **above subscriptions** in Azure. They help you organize multiple subscriptions and apply governance at scale.

### Main benefits
- central policy management
- centralized RBAC assignment
- delegated cloud administration
- consistent compliance and security controls across subscriptions
- better governance, which can help reduce unnecessary cloud costs

### Important note
Management groups do **not directly reduce costs** by themselves.  
They help reduce costs **indirectly** through better governance, policy enforcement, and administrative control.

### Short summary
Use management groups to manage many subscriptions consistently from a higher level.

---

## Self-Service Password Reset (SSPR)

### What it is
Self-Service Password Reset lets users reset or unlock their password/account without needing helpdesk support.

### Portal path
`portal.azure.com > Manage: Password reset > Properties > Self service password reset enabled`

### Main configuration
Set **Self service password reset enabled** to:
- **None**
- **Selected** = only selected groups
- **All** = all users in the tenant

### Notes
- SSPR mainly applies to **end users**
- Administrator accounts have additional protections and separate considerations
- Users must register authentication methods before they can use SSPR
- In many cases, users need to have signed in successfully at least once before completing registration

### Why it matters
- reduces helpdesk workload
- improves user autonomy
- supports secure password recovery

### Short summary
SSPR allows users to reset their own passwords securely, reducing admin effort.

---

## Identity Protection

### What it is
Microsoft Entra ID Protection helps detect and respond to **identity-based risks**.

### Portal path
`portal.azure.com > Manage: Security > Identity Protection`

### Dashboard examples
The dashboard can show items such as:
- risky users
- risky sign-ins
- risk detections
- trends and summaries of identity-related risk activity

### What it looks for
Examples of suspicious activity include:
- leaked credentials
- unusual sign-in behavior
- risky locations
- impossible travel
- unfamiliar sign-in properties

### Main policies

#### User risk policy
`portal.azure.com > Manage: Security > Identity Protection > User risk policy`
Targets the **risk level of the user account**.  
Example action:
- require password change
- by default applied to all users but disabled. So it needs to be enabled

#### Sign-in risk policy
`portal.azure.com > Manage: Security > Identity Protection > Sign-in risk policy`
Targets the **risk level of a specific authentication attempt**.  
Example action:
- require MFA
- block access

#### MFA registration policy
`portal.azure.com > Manage: Security > Identity Protection > Multifactor authentication registration policy `
Can require users to register for Microsoft Entra MFA.

### Notes
- Policies often exist but must be **enabled**
- They can target:
  - all users
  - specific users
  - selected groups
- Identity Protection is more effective when used together with Conditional Access

### Short summary
Identity Protection detects risky users and risky sign-ins, then helps enforce remediation actions like MFA or password reset.

---

## Enabling MFA

### Portal path for authentication methods
---
`portal.azure.com > Manage: Security > Authentication methods > Policies`

#### What you configure there
You can enable or control methods such as:
- Microsoft Authenticator
- SMS
- voice call
- Temporary Access Pass
- FIDO2 security keys
- software OATH tokens

### Monitoring paths
---
`portal.azure.com > Manage: Security > Authentication methods > Monitoring`

#### Useful monitoring pages
- **User registration details**
- **Registration and reset events**

#### What "Capable" means
In **User registration details**, a user shown as **Capable** means the user has a registered method that can be used for MFA and/or self-service password reset, depending on the policy and method.

### Per-user MFA
---
Legacy per-user MFA can still be managed here:

`portal.azure.com > Users > Per-user MFA`

#### Per-user MFA states
- **Disabled**
- **Enabled**
- **Enforced**

#### Meaning of Enforced
The user has MFA enabled and has completed registration of an MFA method.

### Best practice note
---
For modern environments, prefer:
- **Conditional Access**
- **Authentication methods policies**

instead of relying only on legacy **per-user MFA**.



## Blocking Users / MFA Lockout

### What it is
Microsoft Entra can block or lock MFA activity when suspicious behavior or repeated denials occur.

### Portal paths
- `portal.azure.com > Manage: Security > Multifactor authentication > Account lockout`
- `portal.azure.com > Manage: Security > Multifactor authentication > Block/unblock users`

### Account lockout
This lets you configure settings such as:
- number of MFA denials before lockout
- reset period for the counter
- automatic unblock time

### Block / unblock users
Admins can manually unblock users who were blocked for MFA-related reasons.

### Important notes
- Blocking in this area affects **MFA attempts**, not necessarily the entire user account sign-in
- Users listed here are usually users relevant to MFA management
- Microsoft can also automatically respond to reported fraud or suspicious MFA activity

When an Entra ID (Azure AD) user is blocked due to an MFA fraud alert, the account remains blocked for 90 days unless an administrator manually unblocks it.

---

## Microsoft Entra Connect

### What it is
Microsoft Entra Connect links **on-premises Active Directory** with **Microsoft Entra ID** so identities can be synchronized.

### Why it is useful
It helps avoid:
- manual recreation of accounts in the cloud
- duplicate identity management
- inconsistent user information across on-prem and cloud

### Main sync options
---
There are two main approaches:

#### Cloud Sync
---
A lightweight, cloud-managed synchronization option.

##### Characteristics
- uses a lightweight on-premises provisioning agent
- configuration is managed in Microsoft Entra
- good for simpler or multi-forest scenarios
- supports syncing users and groups from on-prem AD to Entra ID
- supports password hash sync
- sync frequency is very short, typically every few minutes

##### Notes
- simpler to deploy than full Entra Connect Sync
- does **not** support all advanced hybrid scenarios
- feature set is more limited than Connect Sync

#### Connect Sync
---
The traditional and more feature-rich synchronization option.

##### Characteristics
- requires an on-premises server
- supports more advanced hybrid identity features
- supports more complex filtering and configuration scenarios
- commonly used for richer hybrid environments
- configuration is managed on the on-prem AD server
- entra ID tenant custom DNS domain name has to match the on-premises AD domain name

##### Typical advanced capabilities
Depending on design and version, Connect Sync can support scenarios such as:
- password hash sync
- password writeback
- device-related hybrid scenarios
- more advanced filtering and synchronization options


### Cloud Sync deployment notes
---
Typical high-level process:

#### Download agent
`portal.azure.com > Micosoft Entra Connect > Manage > Manage from the cloud: Cloud Sync > Download Provisioning agent`

#### Basic setup
1. Install the provisioning agent on a server joined to the on-prem AD environment
2. Sign in with an Entra admin account
3. Provide on-prem AD credentials
4. Create a new cloud sync configuration
5. Select the AD domain to sync
6. Optionally enable password hash sync
7. Review and enable the configuration

The users on Entra ID will now list a On-Premise Directory Synchonization account, whereas a gMSA account will appear in the Managed Service Account o the on-prem AD forest

### Notes
- Cloud Sync uses a **gMSA** (group Managed Service Account) in supported scenarios
- Synced users in Entra ID are shown as coming from on-premises directory synchronization
- Cloud Sync is generally simpler, while Connect Sync is generally more powerful
