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

# Helpful Aliases
I added this alias to my `.gitconfig` to make it so that we do not have to type out `HANDELP-XX` for each commit.
Add the following lines to the `.gitconfig` to use it:
```
[alias]
	pcomm = "!f() { \
		git commit -m \"HANDELP-${1}\n${2}\"; \
	}; f"
```
Then, to commit changes, use the following command: `git pcomm <ticket number> <commit message>`
The above alias will translate that to:
```
git commit -m "HANDELP-<ticket number>
<commit message>
```