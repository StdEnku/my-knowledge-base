@echo off
mysql -u root < "%~dp0DeleteEnv.sql"

if %errorlevel% equ 0 (
    echo [¬Œ÷] DBŠÂ‹«‚ª³í‚Éíœ‚³‚ê‚Ü‚µ‚½B
) else (
    echo [Ž¸”s] ƒqƒ“ƒg:‚à‚¤‚·‚Å‚ÉíœÏ‚Ý‚È‚Ì‚Å‚Í‚È‚¢‚Å‚µ‚å‚¤‚©H
    echo [Ž¸”s] ƒqƒ“ƒg:mysql‚Ü‚Å‚ÌƒpƒX‚Í³‚µ‚¢‚Å‚·‚©H
)
pause