# Path to your oh-my-zsh configuration.
export ZSH=$HOME/.dotfiles/oh-my-zsh

# Set to the name theme to load.
# Look in ~/.oh-my-zsh/themes/
export ZSH_THEME="re5et"

# Set to this to use case-sensitive completion
# export CASE_SENSITIVE="true"

# Comment this out to disable weekly auto-update checks
# export DISABLE_AUTO_UPDATE="true"

# Uncomment following line if you want to disable colors in ls
# export DISABLE_LS_COLORS="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(ssh-agent)

source $ZSH/oh-my-zsh.sh

# Customize to your needs...
umask 022

EDITOR="emacsclient -c"
BROWSER=/usr/bin/firefox
PATH=$PATH:~/bin

# aliases
alias scp='scp -r'
alias l.='l ./*(.)'
alias l/='l -d ./*(/)'
alias lm='l --sort time -r'
alias lc='l | wc -l'
alias z='zeus'

alias gp='ps aux | head -n 1; ps aux | grep -v grep | grep'
alias gk='grepkill'

alias docker='sudo docker'
alias docker-stop-all='docker stop $(docker ps -a -q)'
alias docker-rm-all='docker rm $(docker ps -a -q)'
alias docker-rmi-all='docker rmi $(docker images -a -q)'
alias docker-purge='docker-stop-all &> /dev/null; docker-rm-all &> /dev/null; docker-rmi-all &> /dev/null'

alias rsync='rsync -rvz --rsh="ssh" --human-readable --progress'

unsetopt auto_name_dirs

# [[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm"  # This loads RVM into a shell session.

# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

eval "$(direnv hook zsh)"

export PATH="$PATH:$HOME/.rvm/bin" # Add RVM to PATH for scripting
export PATH="$PATH:$HOME/.nvm/bin" # Add NVM to PATH for scripting

export VAGRANT_USE_SSHFS=1

# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

if [ "$TERM" = "dumb" ]; then
  export ZSH_THEME
  export PS1='> '
fi

. /home/atom/.asdf/asdf.sh
. /home/atom/.asdf/completions/asdf.bash

export PATH="$HOME/.yarn/bin:$PATH"
export RAILS_SYSTEM_TESTING_SCREENSHOT=simple

# tabtab source for serverless package
# uninstall by removing these lines or running `tabtab uninstall serverless`
[[ -f /home/atom/code/hello-epics/functions/node_modules/tabtab/.completions/serverless.zsh ]] && . /home/atom/code/hello-epics/functions/node_modules/tabtab/.completions/serverless.zsh
# tabtab source for sls package
# uninstall by removing these lines or running `tabtab uninstall sls`
[[ -f /home/atom/code/hello-epics/functions/node_modules/tabtab/.completions/sls.zsh ]] && . /home/atom/code/hello-epics/functions/node_modules/tabtab/.completions/sls.zsh