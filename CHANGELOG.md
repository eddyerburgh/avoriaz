2.6.5 / 07-24-2017
=================
  * [Build] Revert to previous build

2.6.1-4 / 07-22-2017
=================
  * [Fix] Fixing broken build system

2.6.0 / 07-22-2017
=================
  * [Build] Use rollup for dist file

2.5.0 / 07-18-2017
=================
  * [New] Add option to pass `attrs` to vm

2.4.4 / 07-16-2017
=================
  * [Fix] Update all props before running watchers in setProps

2.4.3 / 07-11-2017
=================
  * [Fix] Stub global components in shallow

2.4.2 / 07-03-2017
=================
  * [Fix] Only keep specific properties from stubbed components in shallow

2.4.1 / 06-30-2017
=================
  * [Fix] Only run watcher for relevant expression in `setProps`

2.4.0 / 06-26-2017
=================
  * [New] Add `mount.options.instance` to pass scoped instance

2.3.0 / 06-23-2017
=================
  * [New] Add `mount.options.context` to handle functional components

2.2.1 / 06-23-2017
=================
  * [Fix] Clone components before stubbing in `shallow`
  * [Fix] Update before calling trigger on element

2.2.0 / 06-22-2017
=================
  * [New] Add first method

2.1.3 / 06-21-2017
=================
  * [Fix] Run watchers in setProps

2.1.2 / 06-21-2017
=================
  * [Fix] Don't stub root vm lifecycle hooks

2.1.1 / 06-20-2017
=================
  * [Fix] Stub child lifecycle hooks in shallow method

2.1.0 / 06-19-2017
=================
  * [New] Add shallow method
  
2.0.0 / 06-12-2017
=================
  * [Refactor] Remove emit behavior from trigger. Breaking change
  
1.16.0 / 06-12-2017
=================
  * [Fix] Emit event on child vue instance
  * [Refactor] Use matches in place of sizzle
  * [New] Deprecate dispatch method
  * [New] Add trigger method

1.15.0 / 05-31-2017
=================
  * [New] Use sizzle to match selectors in find

1.14.0 / 05-26-2017
=================
  * [New] Add dispatch method
  * [New] Deprecate simulate method
  * [Fix] List Vue as a peer dependency

1.13.3 / 05-14-2017
=================
  * [Fix] Improve error handling of unnamed components used in .find()

1.13.2 / 05-13-2017
=================
  * [Docs] Add improved examples to README

1.13.1 / 05-08-2017
=================
  * [Fix] Delete cached Ctor before mount

1.13.0 / 05-08-2017
=================
  * [New] Add option to pass Components to slots
  * [New] Add option to pass globals in mount method
  * [New] Add setProps wrapper method

1.12.1 / 05-07-2017
=================
  * [New] Remove development mode warning log
  * [Fix] Handle slots as arrays

1.12.0 / 05-05-2017
=================
  * [New] Add slots mount option
  
1.11.2 / 04-28-2017
=================
  * [Fix] Add undocumented options argument to use method

1.11.1 / 04-14-2017
=================
  * [Fix] Mount entire component in hasStyle to accurately detect CSS
  
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
