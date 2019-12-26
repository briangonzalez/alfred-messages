-- THIS FILE IS NO LONGER USED.

on run argv
  -- set theHandle to "+15555555555"
  -- set textMessage to "Hello!"
  set theHandle to item 1 of argv
  set textMessage to item 2 of argv

  tell application "Messages"
    set targetBuddy to theHandle
    set targetService to id of 1st service whose service type = iMessage
    set theBuddy to buddy targetBuddy of service id targetService
    send textMessage to theBuddy
    tell application "System Events" to tell process "Messages" to set visible to false
  end tell
end run
