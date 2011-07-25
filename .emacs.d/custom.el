(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(column-highlight-mode t)
 '(column-number-mode t)
 '(crosshairs-overlay-priority 100)
 '(css-indent-level 2)
 '(css-indent-offset 2)
 '(display-time-mode t)
 '(elscreen-display-tab nil)
 '(fringe-mode nil nil (fringe))
 '(global-linum-mode t)
 '(global-whitespace-mode t)
 '(highline-selected-window t)
 '(highline-vertical (quote (1 . 1)))
 '(ido-auto-merge-delay-time 3)
 '(ido-everywhere t)
 '(indent-tabs-mode t)
 '(indicate-buffer-boundaries (quote left))
 '(indicate-empty-lines t)
 '(iswitchb-use-virtual-buffers t nil (recentf))
 '(js-indent-level 2)
 '(js2-auto-indent-p nil)
 '(js2-basic-offset 2)
 '(js2-bounce-indent-p t)
 '(js2-mirror-mode nil)
 '(kill-ring-max 200)
 '(kill-whole-line t)
 '(linum-delay t)
 '(linum-eager t)
 '(magit-commit-all-when-nothing-staged (quote ask-stage))
 '(magit-process-popup-time 0)
 '(magit-save-some-buffers nil)
 '(mumamo-chunk-coloring 10)
 '(nxml-child-indent 2)
 '(nxml-outline-child-indent 2)
 '(save-interprogram-paste-before-kill t)
 '(save-place t nil (saveplace))
 '(sgml-basic-offset 4)
 '(size-indication-mode t)
 '(tab-width 2)
 '(text-mode-hook (quote (turn-on-auto-fill text-mode-hook-identify)))
 '(uniquify-buffer-name-style (quote forward) nil (uniquify))
 '(whitespace-global-modes t)
 '(whitespace-line-column 800)
 '(yank-pop-change-selection t))

;; (custom-set-faces
;;  ;; custom-set-faces was added by Custom.
;;  ;; If you edit it by hand, you could mess it up, so be careful.
;;  ;; Your init file should contain only one such instance.
;;  ;; If there is more than one, they won't work right.
;;  '(default ((t (:inherit nil :weight normal :height 98 :width normal))))
;;  '(font-lock-builtin-face ((((class color) (min-colors 88) (background dark)) (:foreground "#F0F"))))
;;  '(font-lock-comment-delimiter-face ((default (:inherit font-lock-comment-face :foreground "#733")) (((class color) (min-colors 16)) nil)))
;;  '(font-lock-comment-face ((((class color) (min-colors 88) (background dark)) (:foreground "#666"))))
;;  '(font-lock-function-name-face ((((class color) (min-colors 88) (background dark)) (:foreground "#09F"))))
;;  '(font-lock-keyword-face ((((class color) (min-colors 88) (background dark)) (:foreground "#FF0"))))
;;  '(font-lock-negation-char-face ((t (:foreground "#F00"))))
;;  '(font-lock-regexp-grouping-backslash ((t (:inherit bold :foreground "#90F"))))
;;  '(font-lock-regexp-grouping-construct ((t (:inherit bold :foreground "#F0F"))))
;;  '(font-lock-string-face ((((class color) (min-colors 88) (background dark)) (:foreground "#383"))))
;;  '(font-lock-variable-name-face ((((class color) (min-colors 88) (background dark)) (:foreground "#F90"))))
;;  '(magit-diff-add ((((class color) (background dark)) (:foreground "#3F3"))))
;;  '(magit-diff-del ((((class color) (background dark)) (:foreground "#F33"))))
;;  '(magit-diff-hunk-header ((t (:inherit magit-header :foreground "#09F" :slant italic))))
;;  '(magit-diff-none ((t (:foreground "#444"))))
;;  '(magit-header ((t (:foreground "#FF0"))))
;;  '(magit-item-highlight ((((class color) (background dark)) (:background "#050000")))))

                                        ;(load-theme 'tango-dark)

(deftheme selwyn
  "my theme")
(custom-theme-set-faces
 'selwyn
 '(default ((t (:background "#050505" :foreground "#AAA" :height 100 :width normal :foundry "unknown" :family "dejavu sans mono"))))
 '(cursor ((t (:background "#FF0" :foreground "#F00"))))
 '(mode-line ((t (:background "#111" :foreground "#888888"))))
 '(mode-line-inactive ((t (:background "#262626" :foreground "#888888"))))
 '(fringe ((t (:background "#111"))))
 '(minibuffer-prompt ((t (:foreground "#09F" :weight bold))))
 '(font-lock-builtin-face ((t (:foreground "#F0F"))))
 '(font-lock-comment-face ((t (:foreground "#af5f00"))))
 '(font-lock-constant-face ((t (:foreground "#0F0"))))
 '(font-lock-keyword-face ((t (:foreground "#00afff" :weight bold))))
 '(font-lock-string-face ((t (:foreground "#090"))))
 '(font-lock-type-face ((t (:foreground "#ff5fff" :weight bold))))
 '(font-lock-warning-face ((t (:background "#ff0000" :foreground "#ffffff"))))
 '(isearch ((t (:background "#ffaf5f" :foreground "#000000"))))
 '(link ((t (:foreground "#00afff" :underline t))))
 '(link-visited ((t (:foreground "#ff5fff" :underline t))))
 '(button ((t (:underline t))))
 '(header-line ((t (:background "#262626" :foreground "#888888")))))
(provide-theme 'selwyn)
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(default ((t (:stipple nil :background "#050505" :foreground "#BBB" :inverse-video nil :box nil :strike-through nil :overline nil :underline nil :slant normal :weight normal :height 98 :width normal :foundry "unknown" :family "DejaVu Sans Mono"))))
 '(erc-prompt-face ((t (:background "lightBlue2" :foreground "green" :weight bold))))
 '(flymake-errline ((t (:background "red"))))
 '(font-lock-comment-delimiter-face ((t (:inherit font-lock-comment-face :foreground "#f90"))))
 '(font-lock-comment-face ((t (:foreground "#444"))))
 '(font-lock-function-name-face ((t (:foreground "#F90" :weight bold))))
 '(font-lock-string-face ((t (:foreground "#c00"))))
 '(font-lock-variable-name-face ((t (:foreground "#FF0" :weight bold))))
 '(highlight ((t (:background "#330"))))
 '(highline-face ((t (:background "#000"))))
 '(highline-vertical-face ((t (:background "#030303"))))
 '(isearch ((t (:background "#220022" :foreground "#FF00FF"))))
 '(linum ((t (:foreground "#444"))))
 '(magit-diff-add ((t (:foreground "#0F0"))))
 '(magit-diff-del ((t (:foreground "#F00"))))
 '(magit-item-highlight ((t (:background "#001"))))
 '(mode-line ((t (:background "#111" :foreground "#991"))))
 '(regex-tool-matched-face ((t (:background "#020" :foreground "Orange" :weight bold))))
 '(region ((t (:background "#110011"))))
 '(show-paren-match ((t (:background "#06F" :foreground "#000" :weight ultra-bold))))
 '(show-paren-mismatch ((t (:background "#F00" :foreground "white" :weight ultra-bold))))
 '(whitespace-hspace ((t (:foreground "#222"))))
 '(whitespace-indentation ((t (:inherit nil :foreground "#400"))))
 '(whitespace-line ((t (:inherit default))))
 '(whitespace-newline ((t (:foreground "#111"))))
 '(whitespace-space ((t (:foreground "#111"))))
 '(whitespace-tab ((t (:foreground "#222"))))
 '(whitespace-trailing ((t (:foreground "#F00" :weight bold)))))
