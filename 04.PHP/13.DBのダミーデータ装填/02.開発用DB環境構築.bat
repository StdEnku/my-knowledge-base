@echo off
mysql -u root < "%~dp0SetUpDevEnv.sql"

if %errorlevel% equ 0 (
    echo [成功] ダミーデータを含む開発用DB環境が正常に構築されました。
) else (
    echo [失敗] ヒント1:03.DB環境削除.batを実行してみてください。
    echo [失敗] ヒント2:mysqlまでのパスは正しいですか？
)
pause