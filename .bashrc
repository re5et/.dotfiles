# Check for an interactive session
[ -z "$PS1" ] && return
#
source ~/.bash_git_completion

GIT_PS1_SHOWDIRTYSTATE=true

GIT_PS1_SHOWSTASHSTATE=true

GIT_PS1_SHOWUNTRACKEDFILES=true

PS1="\[\033[32m\]┌\[\033[0m\][\[\033[32m\]\u\[\033[0m\]\[\033[36m\]@\[\033[0m\]\[\033[34m\]\H\[\033[0m\]:\w]$(__git_ps1 "[\[\033[1;33m\]%s\[\033[0m\]]")-\t\n\[\033[32m\]└\[\033[0m\]$ "
PS2=" └ "
# ─

if [ -f ~/.terminal_aliases ]; then
    . ~/.terminal_aliases
fi
