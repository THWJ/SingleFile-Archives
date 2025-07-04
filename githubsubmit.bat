@echo off
title Git Auto-Commit Script
color 0A

:: Step 1: git add .
echo [1/3] Running git add .
git add .
if %errorlevel% neq 0 (
    echo [ERROR] git add failed! Error code: %errorlevel%
    goto :error
) else (
    echo [OK] git add completed
)

:: Step 2: git commit
echo.
echo [2/3] Running git commit -m "new file"
git commit -m "new file"
if %errorlevel% neq 0 (
    echo [ERROR] git commit failed! Error code: %errorlevel%
    goto :error
) else (
    echo [OK] git commit completed
)

:: Step 3: git push
echo.
echo [3/3] Running git push
git push
if %errorlevel% neq 0 (
    echo [ERROR] git push failed! Error code: %errorlevel%
    goto :error
) else (
    echo [OK] git push completed
)

:: Success message
echo.
echo All operations completed successfully!
goto :end

:error
echo.
echo ERROR: Operation failed. Please check the above messages.

:end
pause