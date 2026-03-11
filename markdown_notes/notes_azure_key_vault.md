# MY AZURE KEYVAULT NOTES #

- [MY AZURE KEYVAULT NOTES](#my-azure-keyvault-notes)
  - [Using PowerShell and Az Modules](#using-powershell-and-az-modules)
    - [Connect to Azure using Device Authentication (logged-in user)](#connect-to-azure-using-device-authentication-logged-in-user)
    - [Connect to Azure using Managed Identity authentication (for instance an Azure server)](#connect-to-azure-using-managed-identity-authentication-for-instance-an-azure-server)
  - [Using JavaScript](#using-javascript)
    - [Connect to Azure using Device Authentication (logged-in user)](#connect-to-azure-using-device-authentication-logged-in-user-1)
    - [Connect to Azure using Managed Identity Authentication](#connect-to-azure-using-managed-identity-authentication)


An Azure Keyvault is a really useful tool to safely store credentials, client id, client secret, certificates etc.

Once created, the access to the corresponding groups and resources (for instance Azure Servers) can be provided in the KeyVault `Access Control (IAM)` page. The group/s that have to manage the KeyVault (CRUD secrets, certificates etc), must have the `Key Vault Administrator` role and the group/s or resources that have to be able to retrieve secret or certificate info must have the `Key Vault Secrets User` and `Key Vault Certificate User` roles accordingly.

## Using PowerShell and Az Modules ##

Make sure that at least the `Az.KeyVault` and `Az.Accounts` modules are installed on the device:
```ps1
Install-Module -Name Az.KeyVault -Scope CurrentUser -Force
Install-Module -Name Az.Accounts -Scope CurrentUser -Force
```

Authentication can happen either by using **device authentication** or by **managed identity authentication**. Device authentication would use the device logged-in corporate Windows credentials and the user might be prompted for further interaction to authenticate and the managed identity would use the server credentials without external user interaction. 

The first kind of a authentication is useful during the development phase and the second kind is useful when deploying a scheduled automation script to an Azure Server, Workbook etc.

### Connect to Azure using Device Authentication (logged-in user) ###
```ps1
Import-Module Az.KeyVault
Import-Module Az.Accounts
Enable-AzContextAutosave -Scope CurrentUser | Out-Null

function New-AzLogin {
    try {
        $ctx = Get-AzContext
        if (-not $ctx -or -not $ctx.Account) {
            Write-Host "No cached Azure context found. Logging in..." -ForegroundColor Cyan
            Connect-AzAccount -UseDeviceAuthentication | Out-Null
            Set-AzContext -SubscriptionId "{KEYVAULT_RESOURCE_SUBSCRIPTION_ID}"
        }
        else {
            # Optionally verify subscription or tenant if you want
            Write-Host "Reusing cached Azure session for: $($ctx.Account.Id)" -ForegroundColor Cyan
        }
    }
    catch {
        Write-Warning "Azure context missing or invalid. Re-authenticating..." -ForegroundColor Cyan
        Connect-AzAccount -UseDeviceAuthentication | Out-Null
        Set-AzContext -SubscriptionId "{KEYVAULT_RESOURCE_SUBSCRIPTION_ID}"
    }
}

New-AzLogin

# Retrieve the keyvault secret
$vaultName = "{YOUR_KEYVAULT_DISPLAYNAME}"
$yourSecret = Get-AzKeyVaultSecret -VaultName $vaultName -Name "{ANY_OF_YOUR_KEYVAULT_SECRETS_NAME}" -AsPlainText
```
The `Enable-AzContextAutosave` is useful when using resources stored in a single tenant. On the other hand, in case resources are spread across a multi-tenant configuration, you'd better specify the tenantId when connecting to Az, for instance:
```ps1
# Device Authentication
Connect-AzAccount -UseDeviceAuthentication -Tenant "{TENANT_ID}"
Set-AzContext -SubscriptionId "{KEYVAULT_RESOURCE_SUBSCRIPTION_ID}" -Tenant "{TENANT_ID}"

# Managed Identity Authentication
Connect-AzAccount -Identity -Tenant "{TENANT_ID}"
Set-AzContext -SubscriptionId "{KEYVAULT_RESOURCE_SUBSCRIPTION_ID}" -Tenant "{TENANT_ID}"
```



### Connect to Azure using Managed Identity authentication (for instance an Azure server) ###

```ps1
# Import Az modules, connect to Az using the Azure Server Managed Identity and set Az context to the keyvault id
Import-Module Az.KeyVault
Import-Module Az.Accounts
Connect-AzAccount -Identity
Set-AzContext -SubscriptionId "{KEYVAULT_RESOURCE_SUBSCRIPTION_ID}"

# Retrieve the keyvault secret
$vaultName = "{YOUR_KEYVAULT_DISPLAYNAME}"
$yourSecret = Get-AzKeyVaultSecret -VaultName $vaultName -Name "{ANY_OF_YOUR_KEYVAULT_SECRETS_NAME}" -AsPlainText

```


## Using JavaScript ##

### Connect to Azure using Device Authentication (logged-in user) ###
```js
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

//Setting up azure key vault object
const vaultUrl = process.env.KEYVAULT_URL ?? "{YOUR_KEYVAULT_VAULTURI}";
const tenantId = process.env.AZURE_TENANT_ID;
const credential = new DefaultAzureCredential({tenantId,});
const client = new SecretClient(vaultUrl, credential);

async function getAzureKeyVaultSecret(secretName) {
  if (!secretName || typeof secretName !== "string") {
    throw new Error(
      "ERROR: Secret name must be a non-empty string. Terminating script!"
    );
  }

  try {
    const secret = await client.getSecret(secretName);
    console.log(`✅ Retrieved secret: ${secretName}.`);
    return String(secret.value);
  } catch (error) {
    console.error(`❌ Error retrieving secret "${secretName}":`, error.message);
    throw new Error(
      `Failed to retrieve secret "${secretName}": ${error.message}`
    );
  }
}

// RETRIEVE A SECRET
const YOUR_SECRET = await getAzureKeyVaultSecret("{ANY_OF_YOUR_KEYVAULT_SECRETS_NAME}");
```


### Connect to Azure using Managed Identity Authentication ###
```js
import { ManagedIdentityCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

//Setting up azure key vault object
const vaultUrl = process.env.KEYVAULT_URL ?? "{YOUR_KEYVAULT_VAULTURI}";
const credential = new ManagedIdentityCredential();
const client = new SecretClient(vaultUrl, credential);

async function getAzureKeyVaultSecret(secretName) {
  if (!secretName || typeof secretName !== "string") {
    throw new Error(
      "ERROR: Secret name must be a non-empty string. Terminating script!"
    );
  }

  try {
    const secret = await client.getSecret(secretName);
    console.log(`✅ Retrieved secret: ${secretName}.`);
    return String(secret.value);
  } catch (error) {
    console.error(`❌ Error retrieving secret "${secretName}":`, error.message);
    throw new Error(
      `Failed to retrieve secret "${secretName}": ${error.message}`
    );
  }
}

// RETRIEVE A SECRET
const YOUR_SECRET = await getAzureKeyVaultSecret("{ANY_OF_YOUR_KEYVAULT_SECRETS_NAME}");
```