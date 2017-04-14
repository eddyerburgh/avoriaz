1.11.0 / 04-14-2017
=================
  * [New] Add attachToDocument option
  * [New] Use getters to retrieve vNode
  * [Fix] Remove duplicate vNodes by comparing element node
  * [Docs] Standardize docs
  * [Docs] Add guide to using with vuex
  
1.10.0 / 04-09-2017
=================
  * [New] Support key modifiers in simulate method
  * [Docs] Add examples to docs
  
1.9.4 / 03-30-2017
=================
  * [Fix] Change propsData warning message to give a correct example
  
1.9.3 / 03-29-2017
=================
  * [Docs] Add examples to docs
  * [Docs] Fix typo in README

1.9.2 / 03-27-2017
=================
  * [Docs] Add examples to docs
  * [Feature] Log warning when computed, propsData and methods are called with details on unbound this

1.9.1 / 03-16-2017
=================
  * [Bug] Update vNode when setData is called

1.9.0 / 03-15-2017
=================
  * Add instance method

1.8.3 / 03-05-2017
=================
  * Expose use method

1.8.2 / 03-05-2017
=================
  * Update Vue and vue-compiler version

1.8.1 / 03-05-2017
=================
  * Add Vue to list of dependencies

1.8.0 / 03-05-2017
=================
  * Move Vue to list of peer dependencies

1.7.2 / 03-05-2017
=================
  * Remove use method due to bug

1.7.1 / 03-04-2017
=================
  * Move Vue to list of dependencies

1.7.0 / 03-04-2017
=================
  * Add setData method
  * Add destroy method

1.6.0 / 02-12-2017
=================
  * Add use method to add plugins to avoriaz Vue instance

1.5.2 / 02-08-2017
=================
  * Throw error if avoriaz does not have access to document

1.5.1 / 02-08-2017
=================
  * Remove babel-runtime from project

1.5.0 / 02-03-2017
=================
  * Add .hasStyle method
  * Add .hasAttribute method
  * Deprecate .style method
  * Reinstate unit tests running in jsdom

1.4.0 / 02-01-2017
=================
  * Get computedStyles instead of element.style in style method

1.3.1 / 02-01-2017
=================
  * Fix npm publishing issue

1.3.0 / 02-01-2017
=================
  * Add support for descendant combinator and multiple selectors in .find
  * Add support for direct descendant combinator in .find
  * Add style method
  * Add logo to README
  * Add changelog

1.2.3 / 01-26-2017
=================
  * Fix bug in find where Vue Components were not traversed

1.2.2 / 01-23-2017
=================
  * Fix typo in wrapper.methods()

1.2.1 / 01-17 2017
=================
  * Add support for Vue components in .find and .is methods

1.2.0 / 01-17-2017
=================
  * Change text method to use textContent instead of innerText
  * Add computed, propsData, methods and data methods to wrapper
  * Add input validation - throw errors if input is incorrect
  * Add update method
  * Add name method
  * Add isEmpty method
  * Add mocha-webpack example to README

1.0.1 / 01-13-2017
=================
  * Remove destructuring from entry index.js

1.0.0 / 01-12-2017
=================
  * Initial release.
