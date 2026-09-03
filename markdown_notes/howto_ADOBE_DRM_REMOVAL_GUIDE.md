<br/>
⚠️ **DISCLAIMER**

**I am not responsible for any misuse of this guide.** This guide is provided for educational purposes only. You should only use these instructions if:

- You own the ebooks and have the legal right to remove DRM protections
- Your jurisdiction permits circumventing DRM for personal use
- You have explicit permission from the copyright holder
- You are removing DRM solely for interoperability with legitimate devices and applications you own

Unauthorized circumvention of DRM protections may violate laws such as the DMCA (Digital Millennium Copyright Act) or similar laws in your jurisdiction. **Use this guide responsibly and legally.**

# Adobe Adept DRM Removal Guide for Calibre

- [Prerequisites](#prerequisites)
- [Step 1: Install Required Dependency](#step-1-install-required-dependency)
- [Step 2: Extract the Adobe Adept Key](#step-2-extract-the-adobe-adept-key)
- [Step 3: Load plugin into Calibre](#step-3-load-plugin-into-calibre)
- [Step 4: Import the Adobe Adept Key to Calibre DeDRM](#step-4-import-the-adobe-adept-key-to-calibre-dedrm)
- [Step 5: Verify the Setup](#step-5-verify-the-setup)
- [Troubleshooting](#troubleshooting)
- [Notes](#notes)

## Prerequisites

- Python 3.x installed
- Adobe Digital Editions (ADE) activated on your Windows machine
- Calibre installed
- Calibre DeDRM plugin installed (you can download the plugin from https://github.com/apprenticeharper/DeDRM_tools/releases)
- Adobekey.py script (you can find it here https://github.com/apprenticeharper/DeDRM_tools/blob/master/DeDRM_plugin/adobekey.py)

## Step 1: Install Required Dependency

Open Command Prompt or PowerShell and run:

```bash
python -m pip install -U pycryptodome
```

Verify the installation:

```bash
python -c "from Crypto.Cipher import AES; print('pycryptodome installed successfully')"
```

## Step 2: Extract the Adobe Adept Key

Make sure you are running the script on the device where you have downloaded and opened the file for the first time (usually as a .ascm file that ADE decrypts and loads as an .epub file). When loaded, the decryption information is stored in the registry key `HKCU\Software\Adobe\Adept`.

1. Navigate to the directory containing `adobekey.py`
2. Run the following command to extract the key to a `.der` file:

```bash
python adobekey.py AdobeAdept.der
```

The script will automatically locate the aforementioned registry key and convert it to a DER file.

3. You should see output like:

   ```
   adobekey.py v7.0
   Copyright © 2009-2020 i♥cabbages, Apprentice Harper et al.
   Found 1 keys
   Saved a key to [path]\AdobeAdept.der
   ```

4. The `.der` file has been created in the same directory as the script.

## Step 3: Load plugin into Calibre

1. Open Calibre
2. Go to **Preferences → Advanced: Plugins → Load plugin from file**
3. Look for the downloaded and unzipped folder `DeDRM_tools_10.0.9` (check link above) and load the zip file called `DeDRM_plugin.zip`

## Step 4: Import the Adobe Adept Key to Calibre DeDRM

1. Open Calibre
2. Go to **Preferences** (or **Settings** depending on version)
3. Click **Advanced: Plugins**
4. Find and click on **DeDRM** plugin
5. Click **Customize plugin**
6. Click on **Adobe Digital Editions ebooks**
7. Click on **Add** or **Import Existing Keyfiles**
8. Navigate to and select your `AdobeAdept.der` file
9. Click **OK** to confirm
10. Apply settings and restart Calibre

## Step 5: Verify the Setup

1. In Calibre, import an Adobe DRM-protected EPUB or PDF
2. The DeDRM plugin should automatically remove the DRM using your imported key
3. The book should now be readable without DRM restrictions

## Troubleshooting

**Problem:** "`PyCrypto or OpenSSL must be installed`" error

- **Solution:** Make sure you're using the same Python interpreter that you used to install pycryptodome. Run `python -m pip list | findstr pycryptodome` to verify installation.

---

**Problem:** Adobe Adept key extraction fails with "Adobe Digital Editions not activated"

- **Solution:** Activate Adobe Digital Editions on your machine first by signing in with your Adobe ID.

---

**Problem:** Calibre DeDRM plugin doesn't recognize the key

- **Solution:** Ensure the `.der` file is valid and placed in the correct plugin directory. Restart Calibre after importing.

## Notes

- Keep your `.der` key file secure and private
- Do not share your Adobe Adept key with others
- Consider deleting the key file once imported into Calibre
- Use this process only for content you legitimately own
- You can download the script from [scripts/adobekey.py](../scripts/adobekey.py) in case you do not find in the Github repo anymore
