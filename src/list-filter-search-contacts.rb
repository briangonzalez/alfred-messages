#!/usr/bin/ruby -w

query = ARGV.first.split(' ')[0]

message = ARGV.first.split(' ')
message.shift
message = message.join ' '
message.gsub!('"', '\"')
message.gsub!("'", "\'")

cmd = "swift ./src/contacts.swift #{query} \"#{message}\""
system(cmd)
