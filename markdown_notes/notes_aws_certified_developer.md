# AWS CERTIFIED DEVELOPER - ASSOCIATE (DVA-C02) #

- [AWS CERTIFIED DEVELOPER - ASSOCIATE (DVA-C02)](#aws-certified-developer---associate-dva-c02)
  - [Introduction](#introduction)
  - [Identity and Access Management (IAM - Global Serice)](#identity-and-access-management-iam---global-serice)
  - [Amazon EC2 - Elastic Compute Cloud](#amazon-ec2---elastic-compute-cloud)


## Introduction ##
- Create a free AWS account: [Register](https://signin.aws.amazon.com/signup?request_type=register)
- Choose region depending on the use case: [AWS Regions](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/)
- Services are region-scoped
- Some services might be offered only some regions. Check service availability by region here: [Service availability by region](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/)
- There are also global services regardless of the region.,
- How to choose a region: legal data compliancy, proximity (reduced latency), availability of services, pricing,
- Regions are made up of availability zones (AZ): min 3, max 6,
- Each AZ is made up by one or more data centers and separate from each other,

## Identity and Access Management (IAM - Global Serice) ##
- Root account is created by default. It should not be used or shared (only has an Account ID),
- Users can be grouped together,
- Groups can only contain users and not other groups,
- Users do not have to belong to a group,
- Users can belong to multiple groups,
- Users and groups are assigned access/permissions policies (JSON format),
- Least privilige principle: assign no more than required permissions,
- Create an admin IAM user, create a group with AdministratorAccess policy and add the user to the group,
- Create an alias for the IAM user to customise the sign-in URL,
- Go to the sign-in page (for instance [Sign-in page](https://eu-north-1.signin.aws.amazon.com/)), type the Account ID or Alias - and then the IAM user credentials,
- IAM user has Account ID and IAM User on top right info,
- Turn on multi-sessions support > Add session. Allows to log in AWS with different accounts in the same browser,
- There are IAM Group and Inline policies (inline apply to single users),
- IAM Policy is a json consisting of 
  - Version
  - Id (optional)
  - Statement (one or more)
- A IAM Policy statement consists of: 
  - Sid (optional)
  - Effect (Allow/Deny)
  - Principal (account/user/role to which the policy is applied to)
  - Action (actions that are allowed or denied)
  - Resource (list of resources to which the actions apply to)
  - Condtion (optional). See [aws policies elements](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html)
- Policies examples: [AdministratorAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AdministratorAccess.html) and [IAMReadOnlyAccess](ttps://docs.aws.amazon.com/aws-managed-policy/latest/reference/IAMReadOnlyAccess.html)
- MFA options: Authenticator App, Security Key, Hardware TOTP Token,
- You can define a password policy in Account Settings > Password policy,
- Enable MFA for the root user: Account > Security credentials. You can add up to 8 MFA devices.,
- Access AWS: 
  - AWS Management Console
  - AWS Command Line Interface/AWS CloudShell
  - AWS Software Developer Kit      
- Install the AWS CLI as explained [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Account > Security Credentials > Access keys: Create access key (needed when using AWS CLI and SDK),
- `aws --version`: to check if the CLI is installed,
- `aws configure` then provide access key ID and secret,
- `aws iam list-users`: lists all users in your aws,
- When using the AWS CloudShell, you can upload and download files (it uses the logged in account and region by default),
- IAM Roles: allows to assign permissions to AWS services to perform actions in AWS (for instance EC2, Lambda etc). You first create a role and then assign a permission policy to it,
- IAM Security Tools: 
  - IAM Credential Report: lists all users and the status of their credentials (download a csv file)
  - IAM Last Access: shows the service permissions granted to a user and when the services where last accessed (UI via User view)
- Shared Responsibility Model for IAM: 
  - AWS: Infrastructure, Config and Vulnerability analysis, Compliance validation
  - You: Users, Groups, Roles, Policies management, Enable MFA, analyze access patters  and review permissions
- Root account > Account > IAM user and role access to Billing information: Edit > Activate IAM Access > Update. Allows access to billing for admin users,
- Admin account > Billing and Cost Management > Budgets > Use a template 
  - Zero spend budget: get an alert when reaching 1 cent
  - Monthly cost budget: get an alert when exceeding or forecast to exceeding set amount


## Amazon EC2 - Elastic Compute Cloud ##
- EC2 Service 
  - EC2 Instances: virtual machines
  - EBS: virtual drives
  - ELB: load balancing machines
  - ASG: auto-scaling group to scale services
- EC2 OS - Linux, Windows or MacOS
- EC2 User Data - lets you pass a script to an instance at the time of its first launch  and only the first one and it is run as root user. It's commonly used to: 
  -  Install software packages.
  - Configure the system.
  - Deploy applications.
  - Set up services (e.g., web servers, databases)
- EC2 Console > Instances > Launch an instance > add name > choose the OS > choose instance type > create a key pair
