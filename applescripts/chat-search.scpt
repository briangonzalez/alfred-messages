use AppleScript version "2.4" -- Yosemite (10.10) or later
use scripting additions

-- set searchQuery to "Wai"

set foundChats to {}
tell application "Messages"
	set chatList to (every text chat)
	-- set chatList to (every chat whose id equals "SMS;-;+1555555555")

	repeat with theChat in chatList
    try
      set theId to (the id of theChat)
      -- set theName to (the name of theBuddy)
      -- set theHandle to (the handle of theBuddy)
      -- set theFullName to (the full name of theBuddy)
      -- set theImage to (the image of theBuddy)
      set chatProps to { id: theId }
      copy (chatProps) to the end of foundChats
    end
	end repeat

	return foundChats
end tell
