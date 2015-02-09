
# <%= appName %>

Version: <%= appVersion %>

<%= appDesc %>

### Generated with GCCG

## Requirements

* npm
* bundle  (`gem install bundle`)

## Gulp Tasks

* coffee  -- compile, uglify all coffeescript
* index   -- publish index file
* bower   -- copy over all bower distribution files
* sass    -- compile all sass into css
* serve   -- run a lightweight server :3000
* watch   -- watch coffee, index
* dev     -- server & watch
* clean   -- nuke public/