
-- set theHandle to "+15555555555"
-- set textMessage to "Hello!"

tell application "Messages"
  set targetBuddy to theHandle
  set targetService to id of 1st service whose service type = iMessage
  set theBuddy to buddy targetBuddy of service id targetService
  send textMessage to theBuddy
  tell application "System Events" to tell process "Messages" to set visible to false
end tell
