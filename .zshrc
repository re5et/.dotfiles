    HISTFILE=~/.histfile
    HISTSIZE=5000
    SAVEHIST=5000
    setopt appendhistory autocd extendedglob nomatch notify
    unsetopt beep
    bindkey -e
    zstyle :compinstall filename '/home/atom/.zshrc'

    autoload -Uz compinit
    compinit

    autoload -U promptinit
    promptinit



function precmd {

    local TERMWIDTH
    (( TERMWIDTH = ${COLUMNS} - 1 ))


    ###
    # Truncate the path if it's too long.

    PR_FILLBAR=""
    PR_PWDLEN=""

    local promptsize=${#${(%):---(%n@%m:)---()--}}
    local pwdsize=${#${(%):-%~}}

    if [[ "$promptsize + $pwdsize" -gt $TERMWIDTH ]]; then
	    ((PR_PWDLEN=$TERMWIDTH - $promptsize))
    else
	PR_FILLBAR="\${(l.(($TERMWIDTH - ($promptsize + $pwdsize)))..${PR_HBAR}.)}"
    fi

}


preexec () {
    if [[ "$TERM" == "screen" ]]; then
	local CMD=${1[(wr)^(*=*|sudo|-*)]}
	echo -n "\ek$CMD\e\\"
    fi
}

setprompt () {
    ###
    # Need this so the prompt will work.

    setopt prompt_subst


    ###
    # See if we can use colors.

    autoload colors zsh/terminfo
    if [[ "$terminfo[colors]" -ge 8 ]]; then
	colors
    fi
    PR_NO_COLOUR="%{$terminfo[sgr0]%}"
# set some colors
    for COLOR in RED GREEN YELLOW BLUE MAGENTA WHITE BLACK CYAN; do
	eval PR_$COLOR='%{$fg[${(L)COLOR}]%}'
	eval PR_B$COLOR='%{$fg_bold[${(L)COLOR}]%}'
    done
    PR_RESET="%{${reset_color}%}";


    ###
    # See if we can use extended characters to look nicer.

    typeset -A altchar
    set -A altchar ${(s..)terminfo[acsc]}
    PR_SET_CHARSET="%{$terminfo[enacs]%}"
    PR_SHIFT_IN="%{$terminfo[smacs]%}"
    PR_SHIFT_OUT="%{$terminfo[rmacs]%}"
    PR_HBAR=${altchar[q]:--}
    PR_ULCORNER=${altchar[l]:--}
    PR_LLCORNER=${altchar[m]:--}
    PR_LRCORNER=${altchar[j]:--}
    PR_URCORNER=${altchar[k]:--}

    ###
    # Finally, the prompt.

    PROMPT='$PR_SET_CHARSET$PR_STITLE\
$PR_BLUE┌$PR_RESET $(fancy_pwd)
$PR_BLUE└$PR_RESET $PR_BGREEN%#$PR_RESET '

    RPROMPT='%D - %*'

    PS2='$PR_CYAN$PR_SHIFT_IN$PR_HBAR$PR_SHIFT_OUT\
$PR_BLUE$PR_SHIFT_IN$PR_HBAR$PR_SHIFT_OUT(\
$PR_LIGHT_GREEN%_$PR_BLUE)$PR_SHIFT_IN$PR_HBAR$PR_SHIFT_OUT\
$PR_CYAN$PR_SHIFT_IN$PR_HBAR$PR_SHIFT_OUT$PR_NO_COLOUR '
}

function fancy_pwd {

    echo $(pwd | sed "s:^$HOME:~:" | sed "s:[a-zA-Z0-9_-.]*:$PR_YELLOW&$PR_RESET:g" | sed "s:/:$PR_MAGENTA/$PR_RESET:g")

}

setprompt

if [ -f ~/.terminal_aliases ]; then
    . ~/.terminal_aliases
fi
