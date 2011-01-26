#!/bin/sh

# set left windows to context menu
xmodmap -e "keycode 134 = 0xFF67"

# run screensaver
xscreensaver &

# start up synergy server
/usr/bin/synergys -f --config /etc/synergy.conf &
