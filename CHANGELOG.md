### 1.0.3

![alert](https://i.imgur.com/ecW3kCU.png)

From now on, forced users users will be suspended until they choose a role (users with "Edit user groups" permission will be excluded).

- **Fix** hidden groups were not choosable through the extension.
- **Fix** `GroupsChanged` event was not firing. Now you can see users actions through logger extensions (like the "Audit Log").
- **Add** compatibility for `flarum/suspend` so suspended users will be excluded from this extension's functions.

Other changes involves changing of control mechanisms, code standardization, small improvements on styling etc.

### 1.0.2
- **Fix** nested `m.redraw.sync()` call error. (issue #10)
- **Fix** existing users can't choose a role even when they forced to. (issue #11)
- **Fix** restricted users can self-assign roles when users forced to have at least one role. (issue #12)
- **Add** customizable helper text for the sign-up modal. (issue #1)

### 1.0.1
- **Pull** commits from @imorland's fork.

Testing for bugs, work-in-progress.

### 1.0.0

I practically rewritten the whole thing.

- **Add** force existing users to assign at least one role to themselves option.

### 0.1.3
- **Fix** settings modal won't open when there are no settings present in the database.
- **Fix** button colors for default Flarum themes.

### 0.1.2
- **Fix** OAuth releated issues.

### 0.1.1
- **Fix** users can't be edited from their profile pages.

### 0.1.0
First release.
