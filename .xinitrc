#!/bin/sh

# set left windows to context menu
# xmodmap -e "keycode 134 = 0xFF67"
# xmodmap -e "remove Lock = Caps_Lock"
# xmodmap -e "remove Control = Control_L"
# xmodmap -e "keysym Caps_Lock = Control_L"
# xmodmap -e "add Lock = Caps_Lock"
# xmodmap -e "add Control = Control_L"

xrandr --output eDP-1 --scale 1.5x1.5
# mouse speed
xset m 10 1

# compositing
compton -b

# run screensaver
xscreensaver &

# unity-settings-daemon &
### START EXWM
# Disable access control for the current user.
xhost +SI:localuser:$USER

# Make Java applications aware this is a non-reparenting window manager.
export _JAVA_AWT_WM_NONREPARENTING=1

# Set default cursor.
xsetroot -cursor_name left_ptr

# Set keyboard repeat rate.
xset r rate 200 50

# Uncomment the following block to use the exwm-xim module.
#export XMODIFIERS=@im=exwm-xim
#export GTK_IM_MODULE=xim
#export QT_IM_MODULE=xim
#export CLUTTER_IM_MODULE=xim

xmodmap ~/.xmodmap

# Finally start Emacs
exec emacs
### END EXWM
