if [[ $TERM == "dumb" ]]; then	# tramp is at it
    PS1='%(?..[%?])%!:%~%# '
    unsetopt zle
    unsetopt prompt_cr
    unsetopt prompt_subst
    unfunction precmd
    unfunction preexec
else
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
fi
