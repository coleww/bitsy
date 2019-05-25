# Bitsy
Bitsy is a little editor for games, worlds, or stories.
The goal is to make it easy to make games where you can walk around and talk to people and be somewhere!

# Bug reports
If you find a bug in Bitsy, please submit [an issue here](https://github.com/le-doux/bitsy/issues).
I am in the process of moving my bug backlog into github.

# Local Dev With Hacks
- clone `le-doux/bitsy` and `seleb/bitsy-hacks` into the same directory
- inside that directory, run `cp -r ./bitsy-hacks/dist/. ./bitsy/editor/shared/hacks`.
- update `bitsy/editor/script/exporter.js` to load the hacks that you want to use
- navigate to `bitsy/editor` and start a web server
- the hacks will not run inside the editor, but if you click the export button they will be automatically injected into the html, no more copy pasting into script tags :D
