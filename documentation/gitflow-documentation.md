# Useful commands for using Gitflow

## Adding a new feature:
Instructions on how to develop a new feature using the Gitflow workflow for Git

1. Checking out `development`

   Run the following command: `git checkout development`
2. Creating feature branch:

   Execute `git checkout -b feature-name`
   
   This creates a new branch named `feature-name` and switches to it from `development`
3. Make you changes and commit
   
   Here is where you do all the development and make your commits
   
   `git add <files>`
   
   `git push origin feature-name`
4. Once you are done coding, merge back with development:

   Go back and checkout `development`: `git checkout development`
   
   Merge in changes from `feature-name`: `git merge --no-ff feature-name`
   
   The `--no-ff` flag essentially tells Git to preserve the history of the `feature-name` branch
5. Push changes to GitHub:
   
   Run `git push origin development`
6. Delete `feature-name` branch:
   
   Now that we have merged the features back in, we no longer need this branch
   
   Execute `git push --delete origin feature-name`
   
   Execute `git branch -d feature-name`
   
   The first command deletes the branch on GitHub, the second deletes it locally.

Now you should have created a new branch on which to build the new feature, merged it back into `development` and pushed changes to GitHub.
