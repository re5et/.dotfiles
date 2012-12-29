# Path to your oh-my-zsh configuration.
export ZSH=$HOME/.dotfiles/oh-my-zsh

# Set to the name theme to load.
# Look in ~/.oh-my-zsh/themes/
export ZSH_THEME="re5et"

# Set to this to use case-sensitive completion
# export CASE_SENSITIVE="true"

# Comment this out to disable weekly auto-update checks
export DISABLE_AUTO_UPDATE="true"

# Uncomment following line if you want to disable colors in ls
# export DISABLE_LS_COLORS="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git ssh-agent)

source $ZSH/oh-my-zsh.sh

# Customize to your needs...

EDITOR="emacsclient -c"
BROWSER=/usr/bin/firefox
PATH=$PATH:~/bin

# aliases
alias scp='scp -r'
alias l.='l ./*(.)'
alias l/='l -d ./*(/)'
alias lm='l --sort time -r'
alias lc='l | wc -l'

alias gp='ps aux | grep'
alias gk='grepkill'

alias be='bundle exec'
alias rake='be rake'
alias rc='be rails c'
alias rdbc='be rails dbconsole'
alias rs='be rails s'
alias rg='be rails g'

alias cwip='RAILS_ENV=test rake cucumber:wip'
alias cok='RAILS_ENV=test rake cucumber:ok'
alias cokwip='cok && cwip'

# for rvm
unsetopt auto_name_dirs
[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm"  # This loads RVM into a shell session.

[[ -s "$HOME/.nvm/nvm.sh" ]] && . "$HOME/.nvm/nvm.sh"  # This loads NVM into a shell session.

umask 022

export RUBY_HEAP_MIN_SLOTS=1000000
export RUBY_HEAP_SLOTS_INCREMENT=1000000
export RUBY_HEAP_SLOTS_GROWTH_FACTOR=1
export RUBY_GC_MALLOC_LIMIT=1000000000
export RUBY_HEAP_FREE_MIN=500000
