# FFIND FilterTree
In order to make our filtering menu work, we created a new data structure to hold information related to the relevant filters for a given dataset. Building the data structure tackled several problems:
1. How to represent images holding multiple filters
2. How to deal with filter groups with an arbitrary number of sub-groups

## Terminology
* **Filter Set**: A category of attributes for images within a specified category. A filter set can either have individual filters as children or more sub-filter sets
* **Filter**: A root-level attribute. For example, with a "Color" filter set, a root-level filter might be Red.

## How it works
Essentially, the FilterTree is an n-ary tree in which leaf nodes represent filters and parent nodes represent filter sets.