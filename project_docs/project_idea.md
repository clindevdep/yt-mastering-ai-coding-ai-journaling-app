## MRI idea
I want a tool that will extract all useful data about products with particular active pharmaceutical ingredient (aka API or molecule). 
The application should connect to the site: https://mri.cts-mrp.eu/portal/advanced-search .
It should interact with this javascript-heavy site, fill the molecule and click the 'execute query' button.
Than it should extract all the Procuct Keys.
It sould itereate over all the Product Keys in speparate search and extract all information from the product card.
Then information from all the product cards should be aggreagated to a csv file.
For each product Public Assessment Reports (PARs) should be downloaded and saved in a corresopnding folder, regardless if download link is on the mri site or other external site.
Tables in the PARs should be analyzed for duplicate results among and duplicates should be marked in the resulting csv file.
The project should be implemented in python and be ready for future extensions.
The search should be easily triggered by copying a single file to new project folder and executing command like "mri molecule".
Code should be executable from Windows and Linux.
 