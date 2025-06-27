@echo off
cd /d "C:\GHOST_CORE_REPO"
echo 🌀 GHOSS Auto Git Push Started...

:: Timestamp commit message
for /f %%a in ('wmic os get localdatetime ^| find "."') do set datetime=%%a
set msg=🧠 Auto Sync @ %datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2% %datetime:~8,2%:%datetime:~10,2%

git add .
git commit -m "%msg%"
git push origin main

echo ✅ GHOSS CORE Sync Complete!
pause
