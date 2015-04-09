@echo off
git add --all
git commit -m "%*"
git push origin master
git push origin master:gh-pages
