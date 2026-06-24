# Dataverse Table and Application User Setup

`Tag: [NOTES_CLOUD_DATAVERSE]`

**Index**

- [Dataverse Table and Application User Setup](#dataverse-table-and-application-user-setup)
  - [📍 Create a Dataverse table](#-create-a-dataverse-table)
  - [📍 Create an application user](#-create-an-application-user)
  - [📍 Create a security role with access to the Dataverse table](#-create-a-security-role-with-access-to-the-dataverse-table)
  - [📍 Assign the security role to the application user](#-assign-the-security-role-to-the-application-user)
  - [📍 Add an alternate key in Dataverse (optional)](#-add-an-alternate-key-in-dataverse-optional)
  - [📍 Using views in a model-driven app](#-using-views-in-a-model-driven-app)
  - [📍 Additional recommendations](#-additional-recommendations)
  - [📍 Quick summary](#-quick-summary)

## 📍 Create a Dataverse table

1. Go to **Power Apps**.
2. Select **Tables**.
3. Select **New table**.
4. Create the table with the required name and columns.

### Possible permission error

If you see the following message:

> **"You don't have permission to create here. Switch to another environment instead and create it there."**

it usually means your account does not have sufficient permissions to create Dataverse tables in the selected environment.

### What to do if this happens

You may be able to create your own **Power Platform environment**. If you create the environment yourself, you will typically become its **System Administrator**, which allows you to create Dataverse tables in that environment.

### Important note about dev vs production environments

In many organizations, users without elevated permissions can create only a **Developer** environment. This can be useful for development and testing, but there are some limitations to keep in mind:

- A developer environment is intended for individual development and testing.
- If you later build a **model-driven app** on top of this table, access management may be more restrictive depending on your organization’s setup.
- In practice, users and app access often need to be configured explicitly.
- Production environments usually provide more appropriate governance and access management options for broader organizational use. Here you can provide access to security groups or to all users in the tenant, which you cannot do in a dev environment.

> **Note:** Exact access behavior depends on your Microsoft Power Platform tenant configuration, security roles, and whether Microsoft Entra ID groups / environment security groups are being used.

## 📍 Create an application user

1. Go to the **Power Platform admin center**.
2. Navigate to **Manage** > **Environments**.
3. Select your environment.
4. Go to **Settings**.
5. Under **Users + permissions**, select **Application users**.
6. Select **New app user**.
7. Search for your application using its **Client ID (Application ID)**.
8. Select the app and create the application user.

> **Note:** The app registration must already exist in Microsoft Entra ID (Azure AD) before you can add it as an application user.

## 📍 Create a security role with access to the Dataverse table

1. Go to the **Power Platform admin center**.
2. Navigate to **Manage** > **Environments**.
3. Select your environment.
4. Go to **Settings**.
5. Under **Users + permissions**, select **Security roles**.
6. Select **New role**.
7. After the role is created, open it.
8. Under **Custom Tables**, search for your table using the search bar in the top-right corner.
9. Grant the appropriate privileges.

### Minimum suggested table permissions

Set **Organization-level** privileges for:

- **Create**
- **Read**
- **Write**

Depending on your use case, you may also need:

- **Append**
- **Append To**

and, in some scenarios:

- **Delete**

> **Important:** If your app creates relationships between records or updates related data, **Append** and **Append To** may also be required.

### Restricting users to only their own records

If you want users to see and work only with the records they own, you can set permissions such as **Read** and **Write** to **User-level** instead of **Organization-level**.

With **User-level** access:

- users can only access records they own
- this is useful when table entries should be visible only to their respective owners
- record ownership becomes important for the security model

> **Important:** If users need to collaborate on shared data across the organization, **Organization-level** access may be more appropriate. If they should only see their own records, **User-level** access is often the better choice.

> **Important:** If your app creates relationships between records or updates related data, **Append** and **Append To** may also be required.

## 📍 Assign the security role to the application user

1. Go to the **Power Platform admin center**.
2. Navigate to **Manage** > **Environments**.
3. Select your environment.
4. Go to **Settings**.
5. Under **Users + permissions**, select **Application users**.
6. Open the corresponding application user.
7. Assign the newly created security role.

## 📍 Add an alternate key in Dataverse (optional)

An **alternate key** can help prevent duplicate entries by enforcing uniqueness on one or more columns.

1. Go to **Power Apps** and make sure you are in the correct environment.
2. Open **Tables**.
3. Select your table.
4. Go to **Schema** > **Keys**.
5. Select **New key**.
6. Enter a custom name.
7. Select the column (or columns) that should define uniqueness.
8. Save the key.

> **Note:** Alternate keys are useful when integrating with external systems and when you want to identify records by a business-specific unique value instead of the Dataverse record ID.

## 📍 Using views in a model-driven app

Views in a model-driven app let you define how table data is displayed to users. They can be used to show only relevant records and simplify the user experience.

### What you can do with views

You can create views that:

- show selected columns
- apply filters to display only certain records
- sort data in a meaningful way
- support scenarios such as “My records”, “Active records”, or records matching specific conditions

For example, you can create a view that shows only records:

- owned by the current user
- created in the last 30 days
- with a specific status

### Important note about assigning views

Views can be filtered and tailored for different scenarios, but they are **not typically assigned directly to specific users or groups as a native security mechanism**.

Instead, access is usually controlled through:

- **security roles**
- **table permissions**
- **record ownership**
- **app access**
- **personal views** created and shared by users, where supported

### System views vs personal views

- **System views** are generally available to users who have access to the table and app.
- **Personal views** can be created by individual users and may be shared with other users, depending on permissions.
- If you need different audiences to see different data, this is usually handled through a combination of:
  - security roles
  - ownership-based access
  - filtered views
  - app design

### Best practice

Use **security roles and Dataverse permissions** to control what users are allowed to access, and use **views** to improve usability and focus users on the data most relevant to them.

> **Important:** Views help shape the user experience, but they should not be treated as the primary security boundary. Security should be enforced through Dataverse roles and permissions.

## 📍 Additional recommendations

- Use clear naming conventions for:
  - tables
  - columns
  - security roles
  - alternate keys
- Verify that the application user has both:
  - the correct **security role**
  - access in the correct **environment**
- Test permissions with a simple create/read/update operation before integrating the app fully.
- If this setup is intended for production use, coordinate with your Power Platform administrator to ensure the environment and security model align with organizational policies.

## 📍 Quick summary

- Create the Dataverse table in the correct environment.
- If you do not have permission, you may need a different environment or elevated permissions.
- Create an application user for your app registration.
- Create a security role with access to the custom table.
- Assign that role to the application user.
- Optionally create an alternate key to reduce duplicate records.
