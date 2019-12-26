#!/usr/bin/ruby -w
query = ARGV.first.split(' ')[0]

message = ARGV.first.split(' ')
message.shift
message = message.join ' '

system("swift ./src/contacts.swift #{query} \"#{message}\"")
