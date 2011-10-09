require 'rubygems'
require 'sinatra'
require 'application'

set :public, Proc.new { File.join(root, '_site') }
disable :static

run Sinatra::Application