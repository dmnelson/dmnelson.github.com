require 'rack/jekyll'
require 'newrelic_rpm'

NewRelic::Agent.manual_start
run Rack::Jekyll.new
