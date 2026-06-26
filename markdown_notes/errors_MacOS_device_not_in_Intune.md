# MACOS DEVICE NOT FOUND IN INTUNE

## Commands

```bash
profiles status -type enrollment
#This command is a diagnostic tool used to check the current MDM enrollment status of the Mac. When you run it, it queries the system and returns information regarding how the device is managed

sudo profiles renew -type enrollment
#Tells the macOS profile daemon to reach out to Apple's Device Enrollment servers, fetch the latest management profile assigned to this device's serial number, and prompt the device to enroll (or re-enroll). It can fix a broken connection between an already-enrolled Mac and its MDM server.
```

## UI: PROFILE

Navigate to either:

- System Settings > General > Device Management
- System Settings > Privacy & Security > Profiles (older MacOS versions)

Here you can check if MDM profiles installed.

## UI: COMPANY PORTAL APP

If the user still has the Intune Company Portal app installed, open Company Portal and click on `Reset`.
