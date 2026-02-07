# HOW TO DELETE A GITHUB REPO COMMIT HISTORY #

If we want to delete all of our commit history, but keep the code in its current state:

```sh
# Check out to a temporary branch:
git checkout --orphan TEMP_BRANCH

# Add all the files:
git add -A

# Commit the changes:
git commit -m "Initial commit"

# Delete the old branch:
git branch -D main

# Rename the temporary branch to main:
git branch -m main

# Finally, force update to our repository:
git push -f origin main
```