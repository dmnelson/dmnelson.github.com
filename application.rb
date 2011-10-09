require 'rubygems'
require 'sinatra'

set :public, Proc.new { File.join(root, "_site") }

# This before filter ensures that your pages are only ever served 
# once (per deploy) by Sinatra, and then by Varnish after that
before do
    response.headers['Cache-Control'] = 'public, max-age=31557600' # 1 year
end

get '/*' do |path|
    file = File.join('_site', path, 'index.html')
    file = File.join(file, 'index.html') unless file =~ /\.[a-z]+$/i
    File.exist?(file) ? send_file(file) : 404
end