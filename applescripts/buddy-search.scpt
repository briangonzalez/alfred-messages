use AppleScript version "2.4" -- Yosemite (10.10) or later
use scripting additions

-- set searchQuery to "Brian"

set foundBuddies to {}
tell application "Messages"
	set buddyList to (every buddy whose full name contains searchQuery)

	repeat with theBuddy in buddyList
    try
      set theId to (the id of theBuddy)
      set theName to (the name of theBuddy)
      set theHandle to (the handle of theBuddy)
      set theFullName to (the full name of theBuddy)
      set theImage to (the image of theBuddy)
      set buddyProps to { id: id, name: theName, handle: theHandle, fullName: theFullName, image: theImage }
      copy (buddyProps) to the end of foundBuddies
    end
	end repeat

	return foundBuddies
end tell
