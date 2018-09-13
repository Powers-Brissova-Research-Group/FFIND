# Information regarding importing images
## Importing new images:
1. Log in to OMERO as the import user
2. Create or select a project for import
3. Add an attachment via the menu on the right of the screen
4. Select the gear icon on the top menu
5. Navigate to `glencoe_scripts > import_scripts > import`
6. In File Annotation field, enter the Annotation ID of the file you added as an attachment (find this by hovering over it in the sidebar)
7. Select desired options and run the script

## Potential problems:
### Data not formatted properly
 - For the non-Aperio images, make sure that the file paths look like Unix file paths (`/path/to/a/file`)
 - Make sure list of tags are separated by commas

### Image not found
 - Make sure path for a given image actually exists
 
### ValidationException
 - As far as I understand it, many different things can cause this issue. OMERO provide [this explanation](https://docs.openmicroscopy.org/omero/5.4.0/developers/Modules/ExceptionHandling.html#hierarchy).
 - When getting this working version of the import script, the importer double-listed an image for a single tag, which caused it to add an extra image with no associated data.
 
## Debugging Suggestions

### Image not found
 - Check if image exists
 
### ValidationException:
Essentially we just want to narrow down what in the data causes this exception
 1. Create a test import file of ~10 images
 2. Edit import file around line 280 and restrict the number of columns used until the import succeeds
 3. Gradually re-introduce columns until import fails
 4. If a given tagset pulls values from multiple columsn (i.e. "Markers"), also restrict the specific columns the script reads from
 5. Start removing rows from the test data until the import succeeds
 6. Now find the row that caused the test to fail and look for differences between columns known to work
After finding this, debugging requires some creativity to determine what caused the import to fail--problem could lay either in how the actual data was formatted or a bug in the import script.
 
 ## Relevant info:
  - OMERO Version: 5.4
  - Import script updated: 9/13/2018
  - This document last updated: 9/13/2018
  
 As always, I will update this document as I find more information that could be helpful
