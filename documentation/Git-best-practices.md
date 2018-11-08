# Git best practices for this project
## How to pull changes and keep local changes
Ref: https://stackoverflow.com/questions/10414769/git-pull-keeping-local-changes 
```
git stash
git pull
git stash pop
```
On stash pop there may be conflicts. In the case you describe there would in fact be a conflict for config.php. But, resolving the conflict is easy because you know that what you put in the stash is what you want. So do this:

`git checkout --theirs -- config.php`

## Conflicts
If conflicts exist (on git stash pop), they need to be manually fixed, or via PyCharm, right-click file > Git > Resolve conflicts, select the file and double-click it for side-by-side comparison, or select left or right acceptance.

# Helpful Aliases (test)
Trying to add an alias so we don't have to type out 'HANDELP-XX' for each commit message