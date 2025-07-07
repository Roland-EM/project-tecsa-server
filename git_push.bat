@echo off
REM Add all changes
git add .

REM Commit cu un mesaj generic
git commit -m "Auto push force: update all files"

REM Force push pe branch-ul main
git push --force origin main

pause
