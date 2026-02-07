# MY CMD NOTES #

- [MY CMD NOTES](#my-cmd-notes)
  - [Basics](#basics)
  - [Variables](#variables)
  - [File Output](#file-output)


## Basics ##

```cmd
    :: Turn off command echoing. You can use :: or REM for comments
        @echo off

    :: Suspend execution
        pause
```

## Variables ##
```cmd
    :: Set a variable — no spaces around '='
        set variablename=variablevalue

    :: Retrieve a variable
        echo %variablename%
```

## File Output ##
```cmd
    :: Overwrite file with output of a command
        ipconfig /all > C:\\temp\\ipconfig.log
        ipconfig /all > C:\\temp\\ipconfig.txt
        ipconfig /all > "C:\\directory with space\\ipconfig.txt"

    :: Overwrite a file with a blank line
        ECHO. > "C:\\directory with space\\Myfile.log"

    :: Append a blank line to a file
        ECHO. >> "C:\\My folder\\Myfile.log"

    :: Append text to a file
        ECHO Some text >> "C:\\My folder\\Myfile.log"

    :: Append a variable to a file
        ECHO %MY_VARIABLE% >> "C:\\My folder\\Myfile.log"

    :: Overwrite a file with the output of multiple commands
        > C:\\temp\\output.log (
            ipconfig /all
            ipconfig
        )
```