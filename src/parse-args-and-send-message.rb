#!/usr/bin/ruby -w

name = ARGV.first.split('•••')[0]
phoneOrEmail = ARGV.first.split('•••')[1]
message = ARGV.first.split('•••')[2] || ""
message.strip!

puts "No message provided" if message == ""

system("osascript ./src/send-message.scpt \"#{phoneOrEmail}\" '#{message}'")

puts "#{phoneOrEmail} sent '#{message}'" if message != ""
